import React from "react";
import {

  Route,

  Redirect,

} from "react-router-dom";
import AdminPage from '../Containers/AdimPage'
import AdminAccess from './AdminAccess'
import SignInComp from "./sign-in/sign-in.component"
import SignUpComp from "./sign-up/sign-up.component"




export default function PrivateRoute ({ children, admin, signIn, signUp, adminCode, redirectAdmin, ...rest }) {
    return (
        <Route
          {...rest}
          render={({location}) =>
            !admin ? (
                <AdminAccess adminCode={adminCode}>
                     {signIn &&
                        <SignInComp />
                     }
                       {signUp &&
                        <SignUpComp />
                     }
            
                    
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
