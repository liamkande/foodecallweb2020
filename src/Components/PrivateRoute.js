import React from "react"
import {
  Route,
} from "react-router-dom"
import AdminAccess from './AdminAccess'
import { auth, createUserProfile} from '../firebase/firebase.utils'




class PrivateRoute extends React.Component {


  state= {
    currentUser: null,
    adminUser:null,
  }

  unsubscribeFromAuth = null

  componentDidMount () {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfile(userAuth)
  
        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            },
           
          })
          this.setState({ adminUser: this.state.currentUser.admin ? true : null })
          //console.log(this.state.currentUser)
        })
        
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



export default PrivateRoute



