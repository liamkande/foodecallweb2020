import React, {Component } from 'react'
import { storage } from '../firebase/firebase.utils'


export default class ImageUpload extends Component {
  state = {
    image: null,
    url:''
  }


  handleChange = e => {
    if(e.target.files[0]) {
        const imageFile = e.target.files[0]
        this.setState({image:imageFile})
        console.log(imageFile)
    }
  }

  handleUpload = () => {
      const {image} = this.state
      const uploadTask = storage.ref(`image/${image.name}`).put(image)
      uploadTask.on('state_changed', 
      (snapshot) => {

      }, 
      (error) => {
        console.log(error)
        
      }, 
      () => {
        storage.ref('images').child(image.name).getDownloadURL().then(url => {
            console.log(url)
            
        })
      } )
  }

  render() {
      return (
          <div>
            <input type='file' onChange={this.handleChange}/>
            <button onClick={this.handleUpload}>Upload</button>
          </div>
      )
  }
}