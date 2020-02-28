import React, {Component} from 'react'

import FormInput from '../Components/form-input/form-input.component'
import CustomButton from '../Components/custom-button/custom-button.component'
import Header from '../Components/header/header.component'
import { auth, createUserProfileDocument, signInWithGoogle } from '../firebase/firebase.utils'
import { NavLink } from 'react-router-dom'
import SignUpComp from '../Components/sign-up/sign-up.component'
import SignInComp from '../Components/sign-in/sign-in.component'

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderSignIn: false,
      renderSignUp: false,
      currentUser: null
    };
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


  

    render() {
      const { currentUser, renderSignIn, renderSignUp } = this.state
      return (
        <div className='container'>
          <Header currentUser={currentUser} />
          {!currentUser &&
          <div style={{alignSelf:'center',}}>
              <div className='buttons'>
                <CustomButton onClick={() => this.setState({ renderSignIn: !renderSignIn, renderSignUp:false })}>Sign in</CustomButton>
                <span style={{margin:10}} />
                <CustomButton onClick={() => this.setState({ renderSignUp: !renderSignUp, renderSignIn:false })}>Sign Up</CustomButton>
              </div>
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
      );
    }

   

}


export default SignUp
