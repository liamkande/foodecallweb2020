import React from 'react'
import restaurantsHooks from '../hooks/restaurantsFormHooks'
import yelp  from '../api/yelp'
import FormInput from './form-input/form-input.component'
import CustomButton from './custom-button/custom-button.component'
import { firestore } from '../firebase/firebase.utils'
import Resizer from 'react-image-file-resizer'

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
  } from 'react-places-autocomplete'



export default function ResultsDetail ({result, id}) {
    
    const [ newResult, setResult, name, setName, yelpLink, setYelpLink,
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

            handlePhotoUpload, handleSubmit, handleStepOne, handleStepTwo,
            handleStepThree, handleDelete, handleCategories, handleDeleteCategory,
            handleDeliveryOption, handleDeleteDelivery, selectMainPhoto

          ] = restaurantsHooks()
   
    
    
    const getResult = async (id) => {
        const response = await yelp.get(`/${id}`)
        setResult(!response.data ? null : response.data)
        const mainData = response.data
        //console.log(`Selected Restaurant ID: ${id}`)
        //console.log(mainData)
        const addCategories = await firestore.collection('categories').get()

        if (categoriesList.length === 0) {
            addCategories.forEach((item)=> {
                categoriesListNames.push(item.data().name)     
                categoriesList.push({name:item.data().name, id:item.data().id})      
            })
        }
        
        setName(mainData.name)
        setYelpLink(mainData.url)
        setPhone(mainData.phone)
        setPrice(mainData.price)
        setYelpRating(mainData.rating)
        setYelpReviewCount(mainData.review_count)
        setDisplayPhone(mainData.display_phone)
        setAlias(mainData.alias)
        setAddress1(mainData.location.address1)
        setAddress2(mainData.location.address2 ? mainData.location.address2 : '' )
        setAddress3(mainData.location.address3 ? mainData.location.address3 : '' )
        setCity(mainData.location.city)
        setZipCode(mainData.location.zip_code) 
        setState(mainData.location.state)
        setCountry(mainData.location.country)
        setCrossStreets(mainData.location.cross_streets)
        setHours(mainData.hours)
        setFavoridedCount(0)
        setThumpsUpCount(0)
        setRating(0)
        setReviewCount(0)
        setStepOne(true)
        setStepTwo(null) 
        setStepThree(null)
        setStepFour(null)
        setStepFive(null)
        setDisplayAddress(null)   
      }


    const handleMainIMGChange = e => {
        if(e.target.files[0]) {
            const imageFile = e.target.files[0]

            setImage(imageFile)
            setImgChanged(true)
            //console.log(imageFile)

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
        )
        }
    }

    const handleGoogleSelect = async value => {
        const results = await geocodeByAddress(value)
        const latLng = await getLatLng(results[0])
        setGoogleAddress(value)
        setCoordinates(latLng)
        setPlaceId(results[0].place_id)
        //console.log(results[0])
    }


    return (
        <div>     
            {!stepFive &&      
            <div onClick={() => getResult(id)} style={{color:'blue', cursor:'pointer', fontSize:28, marginTop:25}}>
                {result.name}
            </div>
        } 
        {newResult &&    
            <form onSubmit={handleSubmit}>
                {stepOne && 
                    <div className='content' style={{overflowY:'scroll'}}>
                        <div className='formSignUp'>
                            <div style={{width:'25vw', overflowY:'scroll'}}>
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
                                    name='displayPhone'
                                    value={displayPhone}
                                    onChange={(e) => setDisplayPhone(e.target.value)}
                                    label='Display Phone'
                                    required
                                />
                                <FormInput
                                    type='email'
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value.trim())}
                                    label='Restaurant Email'
                                    
                                /> 
                                <FormInput
                                    type='text'
                                    name='website'
                                    value={website}
                                    onChange={(e) => setWebsite(e.target.value.trim())}
                                    label='Restaurant Website'
                                /> 
                                <FormInput
                                    type='number'
                                    name='orderMinimum'
                                    value={orderMinimun}
                                    onChange={(e) => setOrderMinimum(e.target.value)}
                                    label='Order Minimum'
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
                            </div>
                        </div>
                        <div className='formSignUp' >
                            <div style={{width:'25vw'}}>
                                <FormInput
                                    type='text'
                                    name='state'
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    label='Restaurant State'
                                    required
                                />
                                <FormInput
                                    type='text'
                                    name='address1'
                                    value={address1}
                                    onChange={(e) => {setAddress1(e.target.value); setDisplayAddress(null)}}
                                    label='Restaurant Address1'
                                    required
                                />

                                <FormInput
                                    type='text'
                                    name='address2'
                                    value={address2}
                                    onChange={(e) => {setAddress2(e.target.value); setDisplayAddress(null)}}
                                    label='Restaurant Address2'
                                />

                                <FormInput
                                    type='text'
                                    name='address3'
                                    value={address3}
                                    onChange={(e) => {setAddress3(e.target.value); setDisplayAddress(null)}}
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
                                onChange={(e) => {setCity(e.target.value); setDisplayAddress(null)}}
                                label='Restaurant City'
                                required
                                />

                                <FormInput
                                type='text'
                                name='zipCode'
                                value={zipCode}
                                onChange={(e) => {setZipCode(e.target.value.trim()); setDisplayAddress(null)}}
                                label='Restaurant ZipCode'
                                required
                                />
                            </div>
                        </div>
                        <div className='formSignUp'>
                            <div style={{width:'25vw'}}>
                                <PlacesAutocomplete 
                                    value={googleAddress}
                                    onChange={setGoogleAddress} 
                                    onSelect={handleGoogleSelect}
                                    >
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                                        <div>
                                             <p style={{color:'gray'}}>Ex: restaurant name, city, address...</p>
                                            <input style={{height:40, width:'100%'}} {...getInputProps({ placeholder: "Search Google Address"})} />
                                            <div>
                                                {loading ? <div>...loading</div> : null}

                                                {suggestions.map(suggestion => {
                                                    const style = {
                                                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff" 
                                                    }
                                                    return (
                                                    <div {...getSuggestionItemProps(suggestion, {style})}>
                                                        {suggestion.description} 
                                                    </div>
                                                    )
                                                })}
                                            </div>
                                            <p>Latitude: {coordinates.lat}</p>
                                        <p>Longitude: {coordinates.lng}</p>
                                        </div>
                                        )}
                                </PlacesAutocomplete>
                                <div style={{color:'green', cursor:'pointer',textAlign:'center', fontSize:30}} onClick={handleStepOne}>NEXT</div>
                            </div>
                        </div>
                    </div>
                }

                {stepTwo && 
                    <div className='content' style={{overflowY:'scroll'}}>
                        <div className='formSignUp'>
                            <div style={{width:'25vw', overflowY:'scroll', height:300, backgroundColor:'white'}}>
                                {categoriesListNames.sort().map((item, index) => {
                                    return (
                                        <div style={{cursor:'pointer', fontSize:24, marginTop:8, fontWeight:'bold'}} key={index} onClick={() => handleCategories(item)}>{item}</div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className='formSignUp'>
                            <div style={{width:'25vw', overflowY:'scroll', height:300}}>
                                <h2 style={{color:'green'}}>Selected category List:</h2>
                                {categories.map((item, index) => {
                                        return (
                                            <div style={{color:'gray', cursor:'pointer', fontSize:24, marginTop:8,}} key={index} onClick={() => handleDeleteCategory(item)}>{item.name}</div>
                                            )
                                        })}
                            </div>
                        </div>
                        <div className='formSignUp'>
                            <div style={{width:'25vw'}}>
                                <div style={{color:'green', cursor:'pointer',textAlign:'center', fontSize:30}} onClick={handleStepTwo}>NEXT</div>
                            </div>
                        </div>
                    </div>
                }

                {stepThree && 
                    <div className='content' style={{overflowY:'scroll'}}>
                        <div className='formSignUp'>
                            <div style={{width:'25vw', overflowY:'scroll', height:300, backgroundColor:'white'}}>
                            {!deliveryType &&
                                <div>
                                    <div style={{cursor:'pointer', fontSize:24, marginTop:8, fontWeight:'bold'}} onClick={() => setDeliveryType('Online')}>Online Order</div>
                                    <div style={{cursor:'pointer', fontSize:24, marginTop:8, fontWeight:'bold'}} onClick={() => setDeliveryType('TakeOut')}>TakeOut</div>
                                    <div style={{cursor:'pointer', fontSize:24, marginTop:8, fontWeight:'bold'}} onClick={() => setDeliveryType('Delivery')}>Delivery</div>
                                    <div style={{cursor:'pointer', fontSize:24, marginTop:8, fontWeight:'bold'}} onClick={() => setDeliveryType('Drone')}>Drone</div>
                                    <div style={{cursor:'pointer', fontSize:24, marginTop:8, fontWeight:'bold'}} onClick={() => setDeliveryType('Robot')}>Robot</div>
                                </div>
                            }
                            {deliveryType &&
                                <div>
                                    <FormInput
                                        type='text'
                                        name='deliveryLink'
                                        value={deliveryLink}
                                        onChange={(e) => (setDeliveryLink(e.target.value))}
                                        label={`${deliveryType} Link`}
                                    />
                                    <FormInput
                                        type='text'
                                        name='deliveryPhone'
                                        value={deliveryPhone}
                                        onChange={(e) => (setDeliveryPhone(e.target.value))}
                                        label={`${deliveryType} Phone`}
                                    />               
                                    <div style={{cursor:'pointer', fontSize:24, color:'red'}} onClick={() => handleDeliveryOption('cancel')}>Cancel</div>            
                                    <div style={{cursor:'pointer', marginTop:10, fontSize:24, color:'blue'}} onClick={() => handleDeliveryOption('update')}>Update delivery options</div>
                                    </div>

                            }
                            </div>
                        </div>
                        <div className='formSignUp'>
                            <div style={{width:'25vw', overflowY:'scroll', height:300}}>
                            <h2 style={{color:'green'}}>Selected delivery options:</h2>
                            {deliveries.map((item, index) => {
                                        return (
                                            <div style={{color:'gray', cursor:'pointer', fontSize:24, marginTop:8,}} key={index} onClick={() => handleDeleteDelivery(item)}>{item.option}</div>
                                            )
                                        })}
                            </div>
                        </div>
                        <div className='formSignUp'>
                            <div style={{width:'25vw'}}>
                                <div style={{color:'green', cursor:'pointer',textAlign:'center', fontSize:30}} onClick={handleStepThree}>NEXT</div>
                            </div>
                        </div>
                    </div>
                }

                {stepFour && 
                    <div className='content' style={{overflowY:'scroll'}}>
                        <div className='formSignUp'>
                            <div style={{width:'25vw', height:300, backgroundColor:'white'}}>
                                <h4>Please Upload Restaurant Photos below:</h4>
                                    <input style={{fontSize:18, cursor:'pointer'}} type='file' onChange={handleMainIMGChange}/>
                                    <div style={{marginTop:10, fontSize:18, cursor:'pointer', backgroundColor:'gray', width:'25%', textAlign:'center'}} onClick={handlePhotoUpload}>Upload</div>
                            </div>
                        </div>
                        <div className='formSignUp'>
                            <div style={{width:'25vw', overflowY:'scroll', height:300}}>
                            <h2 style={{color:'green'}}>Uploaded Photos:</h2>
                            {photos.map((photo, index) => (   
                                <div key={index} onClick={() => setSelectedIMG(!selectedIMG ? photo : null)} >
                                <div> 
                                    <img key={index} src={photo.photoURL} style={{width:100, margin:2}} alt='Main Restaurant'/> 
                                </div>
                                {index === photos.indexOf(selectedIMG) &&
                                    <div>
                                        <button onClick={handleDelete}>Delete</button>
                                            {photo.photoURL !== mainPhotoURL &&
                                                <button onClick={selectMainPhoto}>Make Main Photo</button>
                                            }
                                    </div>
                                }
                            </div>
                        ))}
                            </div>
                        </div>
                        <div className='formSignUp'>
                            <div style={{width:'25vw'}}>
                                <CustomButton type='submit'>DONE</CustomButton> 
                            </div>
                        </div>
                    </div>
                }

            {stepFive &&
                <div className='content' style={{color:'red', fontSize:40 }}>Please start new search...</div>
            }
            </form>
        }
        </div>
    )
}
