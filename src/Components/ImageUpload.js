import React, {Component } from 'react'
import { storage } from '../firebase/firebase.utils'
import uuid from 'uuid'


export default class ImageUpload extends Component {
  state = {
    image: null,
    url:'',
    uploaded: null,
    imgChanged: null
  }


  handleChange = e => {
    if(e.target.files[0]) {
        const imageFile = e.target.files[0]
        this.setState({image:imageFile, imgChanged: true})
        console.log(imageFile)
    }
  }

  handleUpload = async () => {
    const {image, uploaded, imgChanged} = this.state  
    try {

      // const blob = await new Promise((resolve, reject) => {
      //   const xhr = new XMLHttpRequest()
      //   xhr.onload = () => resolve(xhr.response)
      //   xhr.responseType = 'blob'
      //   xhr.open('GET', resize.url, true)
      //   xhr.send(null)
      // });

      const uploadTask = !uploaded && imgChanged ? await storage.ref(`restaurantPhotos`).child(uuid.v4()).put(image) : null
      const downloadURL = !uploaded ? await uploadTask.ref.getDownloadURL() : null
      this.setState({url:downloadURL, uploaded:true})
      console.log(downloadURL)

      alert(uploaded && imgChanged ? "You've already added an image, Please delete the existing image!" : "You've succesfully added an image")

      
    } catch(e) {
      console.error(e)
    }
  }

  render() {
      return (
          <div>
            {this.state.url && 
              <img src={this.state.url} style={{width:200}} alt='Main Restaurant' />           
            }
            <input type='file' onChange={this.handleChange}/>
            {/* <button onClick={this.handleUpload}>Upload</button> */}
          </div>
      )
  }
}