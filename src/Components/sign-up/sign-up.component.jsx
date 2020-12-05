import React from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { auth, createUserProfile } from '../../firebase/firebase.utils'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'


import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

import './sign-up.styles.scss'
import {NavLink} from 'react-router-dom'


const validationCode = '1111'

class SignUp extends React.Component {
  
   state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      dob: new Date().toDateString(),
      admin:true,
      accessCode:'',
      accessGranted:null,
      currentUser: null,
      existingUser:null,
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
            this.setState({ existingUser: this.state.currentUser })
          })
          
        }
        
        this.setState({ currentUser: userAuth })
      })
    }
    componentWillUnmount() {
      this.unsubscribeFromAuth()
     
    }



  handleSubmit = async event => {
    event.preventDefault()

    const {firstName, lastName, email, password, confirmPassword, dob, admin } = this.state
    const displayName = `${firstName} ${lastName}`

    if (password !== confirmPassword) {
      alert("passwords don't match")
      return
    }

    // if (ssn.length !== 9) {
    //   alert("Unvalide Social Security Number")
    //   return
    // }
    // if (ssn !== confirmSSN) {
    //   alert("Social Security Number don't match")
    //   return
    // }

 

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      )

      await createUserProfile(user, { firstName,lastName, dob, admin, displayName})

      this.setState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        dob:'',
        admin:true,
       
      })
    } catch (error) {
      console.error(error)
    }
    alert("You've successfully Created an account")
    
  }

  handleChange = event => {
    const { name, value } = event.target

    this.setState({ [name]: value })
  };

  handleDateChange = date => {
    this.setState({dob: date.toDateString()})
    console.log(this.state.dob)
  }

  handleAccessSubmit = event => {
    event.preventDefault()
    this.state.accessCode === validationCode ? 
    this.setState({ accessGranted: true, accessCode:''  }) :
        alert("Wrong Code!")
}
    
  render() {
    const {firstName, lastName, email, password, confirmPassword, dob, ssn, confirmSSN, accessGranted, accessCode, existingUser } = this.state
    return (
      <div className="container">
        {existingUser && 
        <div className="content__center">
          <h2>You're already Sign In! Please proceed to the admin Dashboard here:</h2>
          <NavLink to="/admin">
          <CustomButton>Admin</CustomButton>
          </NavLink>

        </div>
  }
  {!existingUser && 
        <div className="container">
        { !accessGranted && 
        <div className="content__center">
            <h2>Please Enter Access Code to Continue:</h2>
            <form className='sign-up-form' onSubmit={this.handleAccessSubmit }>
            <p style={{color:'red'}}>Enter Code 1111 to try!</p>
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
        <form onSubmit={this.handleSubmit}>
        <div className='container' >
          <h2 style={{alignSelf:'center'}}>Sign Up for Admin Access</h2>
          <div className='content' style={{overflowY:'scroll'}}>
  
          <div className='formSignUp' style={{width:'50vw'}}>
          <div>
  
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                      disableToolbar
                      openTo='date'
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="DOB"
                      value={dob}
                      onChange={date => this.handleDateChange(date)}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                
            </MuiPickersUtilsProvider>

            <FormInput
              type='text'
              name='firstName'
              value={firstName.trim()}
              onChange={this.handleChange}
              label='First Name'
              required
            />  
   
             <FormInput
              type='text'
              name='lastName'
              value={lastName.trim()}
              onChange={this.handleChange}
              label='Last Name'
              required
            />  
            {/* <FormInput
              type='password'
              name='ssn'
              value={ssn.trim()}
              onChange={this.handleChange}
              label='SSN'
              required
             />            
           <FormInput
              type='password'
              name='confirmSSN'
              value={confirmSSN.trim()}
              onChange={this.handleChange}
              label='Confirm SSN'
              required
             />   */}
            <FormInput
              type='email'
              name='email'
              value={email.trim()}
              onChange={this.handleChange}
              label='Email'
              required
            />
            <FormInput
              type='password'
              name='password'
              value={password.trim()}
              onChange={this.handleChange}
              label='Password'
              required
            />
            <FormInput
              type='password'
              name='confirmPassword'
              value={confirmPassword.trim()}
              onChange={this.handleChange}
              label='Confirm Password'
              required
            />
              
            
            </div>
          </div>      
          </div>
  
          <div style={{alignSelf:'center'}}>
            <CustomButton type='submit'>DONE</CustomButton>
          </div>
       
  
        </div>
        
        </form>
      }


      </div>
  }
      </div>


    );
  }


}

export default SignUp