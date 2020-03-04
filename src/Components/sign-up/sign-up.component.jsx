import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import { NavLink } from 'react-router-dom'

import './sign-up.styles.scss';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      firstName: '',
      lastName: '',
      idNumber: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  handleSubmit = async event => {
    event.preventDefault()

    const { displayName, firstName, lastName, idNumber, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("passwords don't match")
      return
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      )

      await createUserProfileDocument(user, { displayName,firstName,lastName, idNumber });

      this.setState({
        displayName: '',
        firstName: '',
        lastName: '',
        idNumber: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error(error);
    }
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { displayName, firstName, lastName, idNumber, email, password, confirmPassword } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
      <div className='container' >
        <h2 style={{alignSelf:'center'}}>Sign Up for Admin Access</h2>
        <div className='content' style={{overflowY:'scroll'}}>
        <div className='formSignUp'>
        <div>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            onChange={this.handleChange}
            label='Display Name'
            required
          />
          <FormInput
            type='text'
            name='firstName'
            value={firstName}
            onChange={this.handleChange}
            label='First Name'
            required
          />  
           <FormInput
            type='text'
            name='lastName'
            value={lastName}
            onChange={this.handleChange}
            label='Last Name'
            required
          />  
           <FormInput
            type='text'
            name='idNumber'
            value={idNumber}
            onChange={this.handleChange}
            label='ID Number'
            required
          /> 
          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={this.handleChange}
            label='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={this.handleChange}
            label='Confirm Password'
            required
          />
          </div>
        </div>

        <div className='formSignUp'>
        <div>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            onChange={this.handleChange}
            label='Display Name'
            required
          />
          <FormInput
            type='text'
            name='firstName'
            value={firstName}
            onChange={this.handleChange}
            label='First Name'
            required
          />  
           <FormInput
            type='text'
            name='lastName'
            value={lastName}
            onChange={this.handleChange}
            label='Last Name'
            required
          />  
           <FormInput
            type='text'
            name='idNumber'
            value={idNumber}
            onChange={this.handleChange}
            label='ID Number'
            required
          /> 
          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={this.handleChange}
            label='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={this.handleChange}
            label='Confirm Password'
            required
          />
          </div>
        </div>


        <div className='formSignUp'>
          <div>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            onChange={this.handleChange}
            label='Display Name'
            required
          />
          <FormInput
            type='text'
            name='firstName'
            value={firstName}
            onChange={this.handleChange}
            label='First Name'
            required
          />  
           <FormInput
            type='text'
            name='lastName'
            value={lastName}
            onChange={this.handleChange}
            label='Last Name'
            required
          />  
           <FormInput
            type='text'
            name='idNumber'
            value={idNumber}
            onChange={this.handleChange}
            label='ID Number'
            required
          /> 
          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={this.handleChange}
            label='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
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
    );
  }
}

export default SignUp;
