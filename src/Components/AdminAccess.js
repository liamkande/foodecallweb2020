import React, {Component}  from 'react'
import FormInput from './form-input/form-input.component'
import CustomButton from './custom-button/custom-button.component'
import SignInComp from './sign-in/sign-in.component'
import SignUpComp from './sign-up/sign-up.component'
import { auth, createUserProfileDocument} from '../firebase/firebase.utils'
import SignUp from './sign-up/sign-up.component'

const currentCode = '1111/84-4150894'

class AdminAccess extends Component {
    state = {
        accessCode:'',
        accessGranted: false,
    }


    handleChange = event => {
            const { name, value } = event.target;
        
            this.setState({ [name]: value });
        }
      
        handleSubmit = event => {
            event.preventDefault()
        
            this.state.accessCode === this.props.adminCode ? 
            this.setState({ accessGranted: true, accessCode:''  }) :
                alert("Wrong Code!")
        
        }
    render() {
        const {accessCode, accessGranted} = this.state
        return (
            <div className="container">
                { !accessGranted && 
                    <div className="content__center">
                        <h2>Please Enter Access Code to Continue:</h2>
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
                        this.props.children
                 }
            

        </div>
        )

    }

}


export default AdminAccess