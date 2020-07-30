import React, {useState} from 'react'
import restaurantsHooks from '../hooks/restaurantsFormHooks'
import FormInput from './form-input/form-input.component'
import CustomButton from './custom-button/custom-button.component'
import {createCategory, storage} from '../firebase/firebase.utils'
import Resizer from 'react-image-file-resizer'
import uuid from 'uuid'
import AdminSignOut from './adminSignOut'



export default function AddNewCategory () {
 
    const [name, setName] = useState('')
    const [categoryPhotos, setCategoryPhotos] = useState([])
    const [imgName, setImgName] = useState(null)
    const [show, setShow] = useState(false)

    const [doneBttn, setDoneBttn] = useState(null)

    const [ url, setUrl, resizedIMG, setResizedIMG,
            imgChanged, setImgChanged, image, setImage,
            selectedIMG, setSelectedIMG
          ] = restaurantsHooks()


    const handleCategoryPhotoUpload = async () => {

    if(categoryPhotos.length < 1 && imgChanged) {
        try {

        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.onload = () => resolve(xhr.response)
            xhr.responseType = 'blob'
            xhr.open('GET', resizedIMG, true)
            xhr.send(null)
        });
    
        const uploadTask = await storage.ref(`categoriesPhotos`).child(uuid.v4()).put(blob)
        const downloadURL = await uploadTask.ref.getDownloadURL() 
        const photoName = await uploadTask.ref.name
        const photoData = {photoName, photoURL:downloadURL }
        categoryPhotos.push(photoData)
        
        setDoneBttn(true)
        setUrl(downloadURL)
        setImgName(photoName)
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

    const handleDeleteCategoryImg = () => {  
    // if(selectedIMG.photoURL === mainPhotoURL) {
    //   //setMainPhotoURL(null)
    //   //console.log('mainPhotoURL has been reset!')
    // } 
    categoryPhotos.splice(categoryPhotos.indexOf(selectedIMG), 1)
    storage.ref(`categoriesPhotos`).child(selectedIMG.photoName).delete()
    setSelectedIMG(null)
    alert('Successfully deleted photo!')
    //console.log(categoryPhotos)
    }


    const handleMainIMGChange = e => {
        if(e.target.files[0]) {
            const imageFile = e.target.files[0]

            setImage(imageFile)
            setImgChanged(true)
            //console.log(imageFile)

            Resizer.imageFileResizer(
            e.target.files[0],
            1200,
            1200,
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

    const handleSubmit = async event => {
        event.preventDefault()
        
        try {
            await createCategory( 
                {name,
                url,
                imgName,
                show
                 })
    
          } catch (error) {
            console.error(error)
          }
          setName('')
          setCategoryPhotos([])
          alert('Category successfully Added!')  
      }


    return (
        <div>     
            <div style={{textAlign:"right", margin:10}} >
            <AdminSignOut />
            </div>        
            <div className='content' style={{overflowY:'scroll'}}>
                <div className='formSignUp'>
                    <div style={{width:'25vw'}}>
                    <FormInput
                            type='text'
                            name='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label='Category Name'
                            style={{fontSize:30}}
                            required
                        />  
                    </div>
                </div>
                <div className='formSignUp'>
                {name &&
                    <div style={{width:'25vw',}}>     
                        <h4>Please Upload Category Photo below:</h4>
                        <input style={{fontSize:18, cursor:'pointer'}} type='file' onChange={handleMainIMGChange}/>
                        <div style={{marginTop:10, fontSize:18, cursor:'pointer', backgroundColor:'gray', width:'25%', textAlign:'center'}} onClick={handleCategoryPhotoUpload}>Upload</div>
                    </div>
                        }
                </div>
                <div className='formSignUp'>
                    <div style={{width:'25vw'}}>
                    {categoryPhotos.map((photo, index) => (   
                        <div key={index} onClick={() => setSelectedIMG(!selectedIMG ? photo : null)} >
                        <div> 
                            <img key={index} src={photo.photoURL} style={{width:300, height:300, margin:2}} alt='Main Restaurant'/> 
                        </div>
                        {index === categoryPhotos.indexOf(selectedIMG) &&
                            <div>
                                <button style={{marginBottom:50}} onClick={handleDeleteCategoryImg}>Delete</button>
                            </div>
                        }
                    </div>
                ))}

                    {doneBttn &&
                        <CustomButton onClick={handleSubmit}>DONE</CustomButton>    
                    }
            
                    </div>
                </div>
            </div>       
        </div>
    )
}
