import React from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { createRestaurantProfileDocument } from '../../firebase/firebase.utils'
import 'date-fns'
import './sign-up.styles.scss'
import { storage } from '../../firebase/firebase.utils'
import uuid from 'uuid'
import Resizer from 'react-image-file-resizer'


import GooglePlacesSearch from '../GooglePlaceSearch'
import SearchRestaurant from '../SearchRestaurant'




class SignUp extends React.Component {

   state = {
      restaurantName:'',
      restaurantLink:'',
      restaurantAddress:'',
      restaurantPhone:'',
      photos:[],
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

     
      url:'',
      uploaded: null,
      imgChanged: null,
      resizedIMG: null,
      ready: null,
      testName: null,
      selectedIMG: null,
      mainPhotoURL: null,
      deletingPhotoURL: null,
      photosLenght:0,
    
    }
 

    handleMainIMGChange = e => {
      if(e.target.files[0]) {
          const imageFile = e.target.files[0]
          this.setState({image:imageFile, imgChanged: true})
          console.log(imageFile)

          Resizer.imageFileResizer(
            e.target.files[0],
            600,
            600,
            'JPEG',
            200,
            0,
            uri => {
                this.setState({resizedIMG:uri})
            },
            'base64'
        );
      }
 
    }
  
    handlePhotoUpload = async () => {
      const {uploaded, imgChanged, resizedIMG, photos} = this.state  
      
      if(photos.length < 6 && imgChanged ) {
        try {
  
          const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.onload = () => resolve(xhr.response)
            xhr.responseType = 'blob'
            xhr.open('GET', resizedIMG, true)
            xhr.send(null)
          });
    
          const uploadTask = await storage.ref(`restaurantPhotos`).child(uuid.v4()).put(blob)
          const downloadURL = await uploadTask.ref.getDownloadURL() 
          const name = await uploadTask.ref.name
          const photoData = {photoName:name, photoURL:downloadURL }
          photos.push(photoData)
          this.setState({url:downloadURL, ready: photos.length < 4 ? null : true, testName: name, uploaded: true, imgChanged: null})
          console.log(downloadURL)
    
          alert("You've succesfully added an image")
          
          console.log(photos.length)
          console.log(name)
          console.log('Successfully uploaded photo!')
                            
        } catch(e) {
          console.error(e)
        }
      } else {
        alert(!imgChanged ? "Sorry... This image already exist!" : "Sorry... You've reached the maximum uploads allowed")
      }

    }


  handleSubmit = async event => {
    event.preventDefault()
   
    const {restaurantName, restaurantLink, restaurantAddress, restaurantPhone, restaurantEmail, restaurantPriceRange, photos } = this.state
    
    try {
    
      await createRestaurantProfileDocument(photos, { restaurantName, restaurantLink,restaurantAddress, restaurantPhone, restaurantEmail, restaurantPriceRange});
      
      this.setState({

        restaurantName:'',
        restaurantLink:'',
        restaurantAddress:'',
        restaurantPhone:'',
        restaurantEmail:'',
        restaurantPriceRange:'',
    
      })
    } catch (error) {
      console.error(error)
    }
   
  }

  handleChange = event => {
    const { name, value } = event.target

    this.setState({ [name]: value })
  }

  handleDelete = () => {
        const {photos, selectedIMG, mainPhotoURL } = this.state
        if(selectedIMG.photoURL === mainPhotoURL) {
          this.setState({mainPhotoURL:null})
          console.log('mainPhotoURL has been reset!')
          
        } 
        photos.splice(photos.indexOf(selectedIMG), 1)
        storage.ref(`restaurantPhotos`).child(selectedIMG.photoName).delete()
        this.setState({selectedIMG: null })
        alert('Successfully deleted photo!')
        console.log(photos)
  }

  selectMainPhoto = () => {
    const {selectedIMG} = this.state
  
      this.setState({mainPhotoURL:selectedIMG.photoURL })
  
    
    console.log('mainPhotoURL has been successfully updated!')
    
  }
  

  render() {
    const { restaurantName, restaurantLink, restaurantAddress, restaurantPhone, restaurantEmail, restaurantPriceRange, ready, photos, mainPhotoURL, selectedIMG } = this.state;
    const mainPhoto = mainPhotoURL

    
    return (
      <form onSubmit={this.handleSubmit}>
      <div className='container' >
        <h2 style={{alignSelf:'center'}}>Restaurant Form</h2>
        <div className='content' style={{overflowY:'scroll'}}>

        <div className='formSignUp' style={{width:'25vw'}}>
        <div>

        <div>
            <h4>Please Upload Restaurant Photos in order below:</h4>
            <input type='file' onChange={this.handleMainIMGChange}/>
           
             <button onClick={this.handlePhotoUpload}>Upload</button>
            
            {photos.map((photo, index) => (
                
               <div key={index} onClick={() => this.setState({selectedIMG: !selectedIMG ? photo : null})}>
                <img key={index} src={photo.photoURL} style={{width:50}} alt='Main Restaurant' />
                
                
                { index === photos.indexOf(selectedIMG) &&
                <div>
                <button onClick={this.handleDelete}>Delete</button>
                {photo.photoURL !== mainPhotoURL &&
                <button onClick={this.selectMainPhoto}>Make main photo</button>
                }
                          
                </div>
                }

               </div>
                           
          
            ))
     
          }
          </div>
          

       <GooglePlacesSearch />
        <SearchRestaurant />


          {/* <FormInput
            type='text'
            name='restaurantName'
            value={restaurantName}
            onChange={this.handleChange}
            label='Restaurant Name'
            required
          />   */}
 
           {/* <FormInput
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
            name='restaurantPriceRange'
            value={restaurantPriceRange.trim()}
            onChange={this.handleChange}
            label='Restaurant Price Range'
            required
          />   */}

          {/* <FormInput
            type='text'
            name='mainPhoto'
            value={mainPhoto}
            onChange={this.handleChange}
            label='Restaurant Main Photo Link'
            disabled
            required
           
          />  */}
  

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
          {ready &&
            <CustomButton type='submit'>DONE</CustomButton>
          }
          
        </div>
     

      </div>
      
      </form>
    );
  }
}

export default SignUp;
