import { useState } from 'react'
import { createRestaurantProfileDocument, storage} from '../firebase/firebase.utils'
import uuid from 'uuid'

export default () => {

  //States
  const [name, setName] = useState('')
  const [yelpLink, setYelpLink] = useState('')
  const [newResult, setResult] = useState(null)
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
  const [hours, setHours] = useState([])
  const [orderMinimun, setOrderMinimum] = useState('')
  const [favoridedCount, setFavoridedCount] = useState(null)
  const [thumpsUpcount, setThumpsUpCount] = useState(null)
  const [rating, setRating] = useState(null)
  const [reviewCount, setReviewCount] = useState(null)
  const [menuCategories, setMenuCategories] = useState([])
  const [categories, setCategories] = useState([])
  const [categoriesList, setCategoriesList] = useState([])
  const [deliveries, setDeliveries] = useState([])
  const [deliveryLink, setDeliveryLink] = useState('')
  const [deliveryPhone, setDeliveryPhone] = useState('')
  const [deliveryType, setDeliveryType] = useState('')
  const [googleAddress, setGoogleAddress] = useState('')
  const [coordinates, setCoordinates] = useState({
      lat: null,
      lng: null
    })
  const [placeId, setPlaceId] = useState('')
  const [photos, setPhotos] = useState([])
  const [selectedIMG, setSelectedIMG] = useState(null)
  const [image, setImage] = useState(null)
  const [imgChanged, setImgChanged] = useState(null)
  const [resizedIMG, setResizedIMG] = useState(null)
  const [url, setUrl] = useState('')
  const [mainPhotoURL,setMainPhotoURL] = useState(null)
  const [categoriesListNames, setCategoriesListNames] = useState([])
  
 
  //Diplay Control
  const [stepOne, setStepOne] = useState(null)
  const [stepTwo, setStepTwo] = useState(null)
  const [stepThree, setStepThree] = useState(null)
  const [stepFour, setStepFour] = useState(null)
  const [stepFive, setStepFive] = useState(null)
  
  
  
 //Functions
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
       //console.log(downloadURL)
        alert("You've succesfully added an image")
        //console.log(photos.length)
        //console.log(name)
        //console.log('Successfully uploaded photo!')
                          
      } catch(e) {
        console.error(e)
      }
    } else {
      alert(!imgChanged ? "Sorry... This image already exist!" : "Sorry... You've reached the maximum uploads allowed")
    }

  }








  const  handleDelete = () => {  
    if(selectedIMG.photoURL === mainPhotoURL) {
      setMainPhotoURL(null)
      //console.log('mainPhotoURL has been reset!')
    } 
    photos.splice(photos.indexOf(selectedIMG), 1)
    storage.ref(`restaurantPhotos`).child(selectedIMG.photoName).delete()
    setSelectedIMG(null)
    alert('Successfully deleted photo!')
    //console.log(photos)
}



const handleCategories = (item) => {
  categoriesList.map((i) => {  
      if(item === i.name) {
          let newId = i.id
          categories.push({name:item, id:newId}) 
          let newCategoryList = categoriesList.filter((list) => list !== i)
          setCategories(categories)
          setCategoriesList(newCategoryList)
      } 
      return null
  })
  //console.log(categories)
}

const handleDeleteCategory = (item) => {
  categoriesList.push(item)
  let newCategory = categories.filter((list) => list !== item)
  setCategories(newCategory)
  //console.log(newCategory)
}

const handleDeliveryOption = (option) => {
  if(option === 'update') {
     deliveries.push({option:deliveryType, link:deliveryLink, phone:deliveryPhone })
     setDeliveryType('')
     setDeliveryLink('')
     setDeliveryPhone('')
    } else if(option === 'cancel') {
      setDeliveryType('')
      setDeliveryLink('')
      setDeliveryPhone('')
    } 
}

const handleDeleteDelivery = (item) => {
  let newDeliveries = deliveries.filter((list) => list !== item)
  setDeliveries(newDeliveries)
}

const selectMainPhoto = () => {
  setMainPhotoURL(selectedIMG.photoURL)
  //console.log('mainPhotoURL has been successfully updated!')
}

  const handleStepOne = () => {
    if(coordinates.lat && orderMinimun) {
      setDisplayAddress(`${address1} ${address2} ${address3} ${city}, ${state} ${zipCode} `)
      setStepOne(null)
      setStepTwo(true)
    } else {
        !coordinates.lat ?
        alert('Please search google address to assign restaurant coordinates and try again.')
        :
        alert('Please assign order minimum and try again.')
    }
}

const handleStepTwo = () => {
  if(categories.length > 0) {
      setStepTwo(null)
      setStepThree(true)
  } else {
      alert('Please select restaurant categories and try again.')
  }
}

const handleStepThree = () => {
  if(deliveries.length > 0) {
      setStepThree(null)
      setStepFour(true)
  } else {
      alert('Please select restaurant delivery options and try again.')
  }
}


  return [  name, setName, yelpLink, setYelpLink, newResult, setResult,
            phone, setPhone, price, setPrice, yelpRating, setYelpRating,
            yelpReviewCount, setYelpReviewCount, displayPhone, setDisplayPhone,
            address1, setAddress1, address2, setAddress2, address3, setAddress3,
            city, setCity, zipCode, setZipCode, state, setState, country, setCountry,
            crossStreets, setCrossStreets, displayAddress, setDisplayAddress,
            alias, setAlias, email, setEmail, website, setWebsite, hours, setHours,
            orderMinimun, setOrderMinimum, favoridedCount, setFavoridedCount,
            thumpsUpcount, setThumpsUpCount, rating, setRating,
            reviewCount, setReviewCount, menuCategories, setMenuCategories, 
            categories, setCategories, categoriesList, setCategoriesList,
            deliveries, setDeliveries, deliveryLink, setDeliveryLink, 
            deliveryPhone, setDeliveryPhone, deliveryType, setDeliveryType,
            googleAddress, setGoogleAddress, coordinates, setCoordinates,
            placeId, setPlaceId, photos, setPhotos, selectedIMG, setSelectedIMG,
            image, setImage, imgChanged, setImgChanged, resizedIMG, setResizedIMG,
            url, setUrl, mainPhotoURL,setMainPhotoURL, categoriesListNames, setCategoriesListNames,
            stepOne, setStepOne, stepTwo, setStepTwo, stepThree, setStepThree,
            stepFour, setStepFour, stepFive, setStepFive,

            handlePhotoUpload, handleStepOne, handleStepTwo,
            handleStepThree, handleDelete, handleCategories, handleDeleteCategory,
            handleDeliveryOption, handleDeleteDelivery, selectMainPhoto,
           

            
         ]
  
  }
  