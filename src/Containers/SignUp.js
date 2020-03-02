import React, {Component} from 'react'
import Nav from '../Components/Nav'
import Footer from '../Components/Footer'

import FormInput from '../Components/form-input/form-input.component'
import CustomButton from '../Components/custom-button/custom-button.component'
import { auth, createUserProfileDocument, signInWithGoogle } from '../firebase/firebase.utils'
import { NavLink } from 'react-router-dom'
import SignUpComp from '../Components/sign-up/sign-up.component'
import SignInComp from '../Components/sign-in/sign-in.component'

const currentCode = '1111/84-4150894'

class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      renderSignIn: false,
      renderSignUp: false,
      currentUser: null,
      accessCode:'',
      accessGranted: false,
    }
  }

  unsubscribeFromAuth = null


  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });

          console.log(this.state);
        });
      }

      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };
  
  handleSubmit = event => {
    event.preventDefault()
  
    this.state.accessCode === currentCode ? 
      this.setState({ accessGranted: true }) :
        alert("Wrong Code!")

  }

    render() {
      const { currentUser, renderSignIn, renderSignUp, accessCode, accessGranted } = this.state
      return (
        <div className="container" >
           <Nav adminNav={currentUser ? 'SIGN OUT' : 'ADMIN'} currentUser={currentUser} />
        <div className='content'>
          {!currentUser &&
          <div className='content__center'>
            { !accessGranted && 
            <div>
              <div>Please Enter Access Code to Continue:</div>
              <form className='sign-up-form' onSubmit={this.handleSubmit}>
              <FormInput
                type='text'
                name='accessCode'
                value={accessCode}
                onChange={this.handleChange}
                label='Access Code'
                required
              />
              <CustomButton type='submit'>Done</CustomButton>
              </form>
              </div>
            }
            
            { accessGranted &&
              <div className='buttons'>
              <CustomButton onClick={() => this.setState({ renderSignIn: !renderSignIn, renderSignUp:false })}>Sign in</CustomButton>
              <span style={{margin:10}} />
              <CustomButton onClick={() => this.setState({ renderSignUp: !renderSignUp, renderSignIn:false })}>Sign Up</CustomButton>
            </div>
            }
              
              {renderSignIn &&
                <SignInComp/>
              }
               {renderSignUp && 
                <SignUpComp/>
              }
          </div>
          }
         
        

          { this.state.currentUser &&
          <div>
            <div>Welcome {this.state.currentUser.displayName}</div>

              {this.state.currentUser.id === 'RQ2n1nBSiHbkjO73dsN5LI0ID1I3' || this.state.currentUser.id === 'm1MeZ0RLGTQRsvhD2x6yczOkKmf1' ?
                <div>
                  <div style={{color:'green'}}>Please Select witch form you'll like to create below:</div>
                  <div className='main-nav'>
                    <NavLink to="/about">Restaurant</NavLink>
                  </div>
                </div>
                : 
                <div>
                  <div style={{color:'red'}}>Please Ask Management for Accees. Thanks!</div>
                </div>
              }
             
          </div>
          }
          
        </div>
          <Footer />
        </div>
      );
    }

   

}


export default SignUp
