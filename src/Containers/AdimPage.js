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

class AdminSignUp extends Component {
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
        <SignUpComp/>
      )
    }
}


export default AdminSignUp
