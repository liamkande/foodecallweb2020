import React from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { createRestaurantProfileDocument } from '../../firebase/firebase.utils'
import 'date-fns'
import './sign-up.styles.scss'

class SignUp extends React.Component {

   state = {
      restaurantName:'',
      restaurantLink:'',
      restaurantAddress:'',
      restaurantPhone:'',
      restaurantMainPhotoLink:'',
      restaurantPhotos:[],
      //restaurantMenuCategories:[all menu categories list plus picked for you and most popular ],
      //restaurantCategories:[ restaurant genre],
      //restaurantFoodItems:[calories:'', description:'', options:[], choices:[], name:'', price:'', instructions:'', category:'', keywords:'', menuCategory:[], ],
      restaurantEmail:'',
      restaurantPriceRange: '',
      restaurantRatings:'',
      restaurantFavorited:'',
      restaurantVotes:'',
      //restaurantPromos:{},
      //restaurantSpecials:{breakfast:{},lunch:{},dinner:{},happyHour:{},sesonal:{}, promo:{}},
      //restaurantFeedback:[],
      //restaurantDeliveryOptions:[],
      //restaurantETA:'',
      //restaurantOrderMinimum:'', will depent min fee + user radius to restaurant,
      //restaurantDeliveryOptions:{onlineOder:[], takeOut:[], delivery:[], droneDelivery:[]},
      //restaurantDistanceFromUser:'',
      //restaurantHours:{},
      //restaurantMenuCategories:['', '', '',],

    }
 

  handleSubmit = async event => {
    event.preventDefault()
    const {restaurantName, restaurantLink, restaurantAddress, restaurantPhone, restaurantMainPhotoLink, restaurantEmail, restaurantPriceRange } = this.state

    try {
    
      await createRestaurantProfileDocument({ restaurantName, restaurantLink,restaurantAddress, restaurantPhone, restaurantMainPhotoLink, restaurantEmail, restaurantPriceRange });

      this.setState({

        restaurantName:'',
        restaurantLink:'',
        restaurantAddress:'',
        restaurantPhone:'',
        restaurantMainPhotoLink:'',
        restaurantEmail:'',
        restaurantPriceRange:'',
        
    
      })
    } catch (error) {
      console.error(error)
    }
   console.log('Restaurant Form was submited successfully')
   
  }

  handleChange = event => {
    const { name, value } = event.target

    this.setState({ [name]: value })
  }


  
  render() {
    const { restaurantName, restaurantLink, restaurantAddress, restaurantPhone, restaurantMainPhotoLink, restaurantEmail, restaurantPriceRange } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
      <div className='container' >
        <h2 style={{alignSelf:'center'}}>Restaurant Form</h2>
        <div className='content' style={{overflowY:'scroll'}}>

        <div className='formSignUp' style={{width:'25vw'}}>
        <div>

          <FormInput
            type='text'
            name='restaurantName'
            value={restaurantName.trim()}
            onChange={this.handleChange}
            label='Restaurant Name'
            required
          />  
 
           <FormInput
            type='text'
            name='restaurantLink'
            value={restaurantLink.trim()}
            onChange={this.handleChange}
            label='Restaurant Link'
            required
          />  
          <FormInput
            type='text'
            name='restaurantAddress'
            value={restaurantAddress.trim()}
            onChange={this.handleChange}
            label='Restaurant Address'
            required
           />            

          <FormInput
            type='text'
            name='restaurantEmail'
            value={restaurantEmail.trim()}
            onChange={this.handleChange}
            label='Restaurant Email'
            required
          />
          <FormInput
            type='text'
            name='restaurantPhone'
            value={restaurantPhone.trim()}
            onChange={this.handleChange}
            label='Restaurant Phone'
            required
          />
          <FormInput
            type='text'
            name='restaurantMainPhotoLink'
            value={restaurantMainPhotoLink.trim()}
            onChange={this.handleChange}
            label='Restaurant Main Photo Link'
            required
          /> 
  
          <FormInput
            type='text'
            name='restaurantPriceRange'
            value={restaurantPriceRange.trim()}
            onChange={this.handleChange}
            label='Restaurant Price Range'
            required
          />  

          </div>
        </div>   


 
        {/* <div className='formSignUp' style={{width:'25vw'}}>
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
          <FormInput
            type='number'
            name='ssn'
            value={ssn.trim()}
            onChange={this.handleChange}
            label='SSN'
            required
           />            

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
           <FormInput
              type='password'
              name='oAuthCode'
              value={oAuthCode.trim()}
              onChange={this.handleChange}
              label='Permission Code'
              required
          />           
          


          </div>
        </div> 




        <div className='formSignUp' style={{width:'25vw'}}>
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
          <FormInput
            type='number'
            name='ssn'
            value={ssn.trim()}
            onChange={this.handleChange}
            label='SSN'
            required
           />            

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
           <FormInput
              type='password'
              name='oAuthCode'
              value={oAuthCode.trim()}
              onChange={this.handleChange}
              label='Permission Code'
              required
          />           
          


          </div>
        </div>  */}


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
