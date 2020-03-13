import React from "react";
import {

  Route,

  Redirect,

} from "react-router-dom";
import AdminPage from '../Containers/AdimPage'
import AdminAccess from './AdminAccess'
import SignInComp from "./sign-in/sign-in.component"
import SignUpComp from "./sign-up/sign-up.component"
import { auth, createUserProfileDocument} from '../firebase/firebase.utils'





class PrivateRoute extends React.Component {


  state= {
    currentUser: null,
    adminUser:null,
   
  }

  unsubscribeFromAuth = null

  componentDidMount () {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
  
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            },
           
          });
          this.setState({ adminUser: this.state.currentUser.admin ? true : null })
          console.log(this.state.currentUser);
        });
        
      }
      
      this.setState({ currentUser: userAuth })
    });
  }
  componentWillUnmount() {
    this.unsubscribeFromAuth()
   
  }


  render() {
    const { children, admin, signIn, signUp, adminCode, redirectAdmin, ...rest } = this.props
    return (
      <Route
        {...rest}
        render={({location}) =>
          !this.state.adminUser ? (
              <AdminAccess adminCode={adminCode}>
    
              </AdminAccess>
          )
          :
          (
           children
          )
        }
      />
    );
  }
}



export default PrivateRoute;


