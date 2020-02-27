import React, {Component} from 'react'

import FormInput from '../Components/form-input/form-input.component'
import CustomButton from '../Components/custom-button/custom-button.component'
import { signInWithGoogle } from '../firebase/firebase.utils'
import Header from '../Components/header/header.component'
import { auth, createUserProfileDocument } from '../firebase/firebase.utils'
import { NavLink } from 'react-router-dom'

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
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


  handleSubmit = event => {
    event.preventDefault();

    this.setState({ email: '', password: '' });
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };


    render() {
      return (
        <div>
          <Header currentUser={this.state.currentUser} />

          {!this.state.currentUser &&
          <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
  
            <form onSubmit={this.handleSubmit}>
              <FormInput
                name='email'
                type='email'
                handleChange={this.handleChange}
                value={this.state.email}
                label='email'
                required
              />
              <FormInput
                name='password'
                type='password'
                value={this.state.password}
                handleChange={this.handleChange}
                label='password'
                required
              />
              <div className='buttons'>
                <CustomButton type='submit'> Sign in </CustomButton>
                <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
                  Sign in with Google
                </CustomButton>
              </div>
            </form>
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
