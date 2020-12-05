import React, {Component}  from 'react'
import FormInput from './form-input/form-input.component'
import CustomButton from './custom-button/custom-button.component'
import SignInComp from './sign-in/sign-in.component'
import { auth, createUserProfile} from '../firebase/firebase.utils'



class AdminAccess extends Component {
    state = {
        accessCode:'',
        accessGranted: false,
        currentUser: null
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
             
            });
   
          });
          
        }
        
        this.setState({ currentUser: userAuth })
      });
    }
    componentWillUnmount() {
      this.unsubscribeFromAuth()
     
    }


    handleChange = event => {
            const { name, value } = event.target;
        
            this.setState({ [name]: value });
        }
      
        handleSubmit = event => {
            event.preventDefault()
        
            this.state.accessCode === this.props.adminCode? 
            this.setState({ accessGranted: true, accessCode:''  }) :
                alert("Wrong Code!")
        
        }


        signOut = () => {
            auth.signOut()
            window.history.back()
        }


    render() {
        const {accessCode, accessGranted} = this.state
        return (
            <div className="container">
                { !accessGranted && 
                    <div className="content__center">
                        <h2>Please Enter Access Code to Continue:</h2>
                        <p>Enter Code 1111 to try!</p>
                        <form className='sign-up-form' onSubmit={this.handleSubmit}>
                            <FormInput
                            type='password'
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
                 <div className="container">

                     {!this.props.signIn && 
                      <SignInComp />
                     }
                     </div>      
                 }
            
        </div>
        )

    }

}


export default AdminAccess