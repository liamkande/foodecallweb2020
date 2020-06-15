import React, { useState, useEffect, Component } from 'react'
import yelp  from '../api/yelp'
import FormInput from './form-input/form-input.component'
import CustomButton from './custom-button/custom-button.component'
import { createRestaurantProfileDocument, storage } from '../firebase/firebase.utils'
import Resizer from 'react-image-file-resizer'
import uuid from 'uuid'
import { set } from 'date-fns'



export default function ResultsDetail ({result, id, onSubmit}) {
    const [newResult, setResult] = useState(null)

    const [name, setName] = useState('')
    const [yelpLink, setYelpLink] = useState('')
    const [phone, setPhone] = useState('')
    const [price, setPrice] = useState('')
    const [yelpRating, setYelpRating] = useState(null)
    const [yelpReviewCount, setYelpReviewCount] = useState(null)
    const [displayPhone, setDisplayPhone] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [address3, setAddress3] = useState('')
    const [city, setCity] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [crossStreets, setCrossStreets] = useState('')
    const [displayAddress, setDisplayAddress] = useState(null)
    const [alias, setAlias] = useState('')
    const [email, setEmail] = useState('')
    const [website, setWebsite] = useState('')



    //Merge state from restaurantForm
    const [photos, setPhotos] = useState([])
    const [selectedIMG, setSelectedIMG] = useState(null)
    const [image, setImage] = useState(null)
    const [imgChanged, setImgChanged] = useState(null)
    const [resizedIMG, setResizedIMG] = useState(null)
    const [url, setUrl] = useState('')

    const [mainPhotoURL,setMainPhotoURL] = useState(null)


    const getResult = async (id) => {
        const response = await yelp.get(`/${id}`)
        setResult(!response.data ? null : response.data)
        const mainData = response.data
        console.log(`Selected Restaurant ID: ${id}`)
        console.log(mainData)
        


        setName(mainData.name)
        setYelpLink(mainData.url)
        setPhone(mainData.phone)
        setPrice(mainData.price)
        setYelpRating(mainData.rating)
        setYelpReviewCount(mainData.review_count)
        setDisplayPhone(mainData.display_phone)
        setAlias(mainData.alias)
        

        setAddress1(mainData.location.address1)
        setAddress2(mainData.location.address2)
        setAddress3(mainData.location.address3)
        setCity(mainData.location.city)
        setZipCode(mainData.location.zip_code) 
        setState(mainData.location.state)
        setCountry(mainData.location.country)
        setCrossStreets(mainData.location.cross_streets)
        setDisplayAddress(`${mainData.location.address1} ${mainData.location.address2} ${mainData.location.address3} ${mainData.location.city}, ${mainData.location.state} ${mainData.location.zip_code} `)


       
      }

    //   useEffect(() => {
    //     getResult(id)
    //   }, [])
    
   
//    if (!newResult) {
//    return null
//     } 


const handleMainIMGChange = e => {
    if(e.target.files[0]) {
        const imageFile = e.target.files[0]
       
        setImage(imageFile)
        setImgChanged(true)
        console.log(imageFile)

        Resizer.imageFileResizer(
          e.target.files[0],
          600,
          600,
          'JPEG',
          200,
          0,
          uri => {
              setResizedIMG(uri)
          },
          'base64'
      );
    }

  }


    
 const  handlePhotoUpload = async () => {
    
    
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
        
        setUrl(downloadURL)
        setImgChanged(null)
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

const handleSubmit = async event => {
    event.preventDefault()

   if(mainPhotoURL && displayAddress) {
  

    try {
    
        await createRestaurantProfileDocument(photos, 
            {name, 
             yelpLink, 
             phone, 
             mainPhotoURL, 
             yelpRating,
             price,
             yelpReviewCount,
             displayPhone,
             address1,
             address2,
             address3,
             city,
             zipCode,
             state, 
             country,
             crossStreets, 
             displayAddress, 
             alias, 
             email, 
             website

             });
        
    
      } catch (error) {
        console.error(error)
      }

   } else if(!mainPhotoURL) {
    alert('Please Assigned A main Photo, and try again!')
   }
   else if(!displayAddress) {
    alert('Please Update Display Address, and try again!')
   }
   
  }


  const handleChange = event => {
    const { name, value } = event.target

    this.setState({ [name]: value })
  }

 const  handleDelete = () => {
        
        if(selectedIMG.photoURL === mainPhotoURL) {
          setMainPhotoURL(null)
          console.log('mainPhotoURL has been reset!')
          
        } 
        photos.splice(photos.indexOf(selectedIMG), 1)
        storage.ref(`restaurantPhotos`).child(selectedIMG.photoName).delete()
        setSelectedIMG(null)
        alert('Successfully deleted photo!')
        console.log(photos)
  }

  const selectMainPhoto = () => {
  
      setMainPhotoURL(selectedIMG.photoURL)
  
    
    console.log('mainPhotoURL has been successfully updated!')
    
  }

  const handleDisplayAddress = () => {
      setDisplayAddress(`${address1} ${address2} ${address3} ${city}, ${state} ${zipCode} `)

  }
 
    return (

        <div>
            
           
            <div onClick={() => getResult(id)}>
    
            <h3 style={{color:'blue', cursor:'pointer'}}>{result.name}</h3>
          
           
          
        </div>


        <div>
            <h4>Please Upload Restaurant Photos below:</h4>
            <input type='file' onChange={handleMainIMGChange}/>
           
             <button onClick={handlePhotoUpload}>Upload</button>
            
            {photos.map((photo, index) => (
                
               <div key={index} onClick={() => setSelectedIMG(!selectedIMG ? photo : null)} >

               <div> 
                 <img key={index} src={photo.photoURL} style={{width:50, margin:2}} alt='Main Restaurant'/> 
                 </div>
                
                
                { index === photos.indexOf(selectedIMG) &&
                <div>
                
               
                <button onClick={handleDelete}>Delete</button>
                {photo.photoURL !== mainPhotoURL &&
                    <button onClick={selectMainPhoto}>Make Main Photo</button>
                }
               
                          
                </div>
                }

               </div>
                           
          
            ))
     
          }
          </div>
     

        {newResult &&
        
        <form onSubmit={handleSubmit}>
          
        <div className='content' style={{overflowY:'scroll'}}>
         <div className='formSignUp' style={{width:'25vw'}}>
             <div>
            <FormInput
                type='text'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                label='Restaurant Name'
                required
           />   

           <FormInput
            type='text'
            name='phone'
            value={phone}
            onChange={(e) => setPhone(e.target.value.trim())}
            label='Restaurant Phone'
            required
            /> 

            <FormInput
            type='text'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            label='Restaurant Email'
            required
            /> 

            <FormInput
            type='text'
            name='website'
            value={website}
            onChange={(e) => setWebsite(e.target.value.trim())}
            label='Restaurant Website'
            required
            /> 

           <FormInput
            type='text'
            name='displayPhone'
            value={displayPhone}
            onChange={(e) => setDisplayPhone(e.target.value)}
            label='Display Phone'
            required
            />

            <FormInput
            type='text'
            name='country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            label='Restaurant Country'
            required
            />

            <FormInput
            type='text'
            name='state'
            value={state}
            onChange={(e) => setState(e.target.value)}
            label='Restaurant State'
            required
            />
            



        </div>
</div>


        <div className='formSignUp' style={{width:'25vw'}}>
        <div>
        <FormInput
        type='text'
        name='address1'
        value={address1}
        onChange={(e) => (setAddress1(e.target.value), setDisplayAddress(null))}
        label='Restaurant Address1'
        required
        />

        <FormInput
        type='text'
        name='address2'
        value={address2}
        onChange={(e) => (setAddress2(e.target.value), setDisplayAddress(null))}
        label='Restaurant Address2'
        />

        <FormInput
        type='text'
        name='address3'
        value={address3}
        onChange={(e) => (setAddress3(e.target.value), setDisplayAddress(null))}
        label='Restaurant Address3'
        />


        <FormInput
        type='text'
        name='crossStreets'
        value={crossStreets}
        onChange={(e) => setCrossStreets(e.target.value)}
        label='Restaurant Cross Streets'
        />

        <FormInput
        type='text'
        name='city'
        value={city}
        onChange={(e) => (setCity(e.target.value), setDisplayAddress(null))}
        label='Restaurant City'
        required
        />

        <FormInput
        type='text'
        name='zipCode'
        value={zipCode}
        onChange={(e) => (setZipCode(e.target.value.trim()), setDisplayAddress(null)) }
        label='Restaurant ZipCode'
        required
        />

        <div style={{color: !displayAddress ? 'red' : 'green', cursor:'pointer'}} onClick={handleDisplayAddress}>Update Display Address</div>
        {displayAddress && 
        <p>Display Address: {displayAddress.trim()}</p>
        }

        
        


        </div>
    </div>


    <div className='formSignUp' style={{width:'25vw'}}>
        <div>
            <div>
                Transactions: {newResult.transactions.map((option, index) => {
                return (
                    <p key={index} style={{color:'gray'}}>{option}</p>
                )
            })}
     </div>
        <div>
            Categories: {newResult.categories.map((category, index) => {
                return (              
                    <p key={index} style={{color:'gray'}}>{category.alias}</p>
                                     
                )
            })}
    </div>
    <div>
                HOURS: {newResult.hours.map((hour, index) => {
                return (
                    <div key={index}>
                        <p>Hour Type: {hour.hours_type}</p>
                        <p>isOpenNow: {`${hour.is_open_now}`}</p>
                        <div style={{color:'gray'}}>{hour.open.map((item, index) => {
                            return (
                                <div key={index}>
                                    <p>day: {item.day} start: {item.start} end: {item.end}</p>
                                    <p>isOvernight: {`${item.is_overnight}`}</p>

                                </div>
                            )
                        })}</div>
                    </div>
                )
            })}
     </div>
   
    <CustomButton type='submit'>DONE</CustomButton>
        </div>
    </div>


</div>

</form>
        }
          

            {/* <div>
                {result.categories.map((category, index) => {
                    return (
                        <div key={index} style={{color:'gray'}}>{category.alias}</div>
                    )
                })}
            </div> */}

        </div>
    )
}