import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.scss'
import NYEPage from './Containers/NYEPage'
import SignUpPage from './Containers/SignUpPage'
import AboutUsPage from './Containers/AboutUsPage'
import SignUp from './Containers/SignUp'
import SignUpComp from './Components/sign-up/sign-up.component'
import AdminPage from './Containers/AdimPage'
import AdminAccess from './Components/AdminAccess'
import PrivateRoute from './Components/PrivateRoute'
import { auth, createUserProfileDocument} from './firebase/firebase.utils'
import Demo from './demo'




const video = 'https://www.youtube.com/embed/unbvLdXf-nM'
const bgVideo = 'https://s3.us-east-2.amazonaws.com/liamkande.com/preview/Food-E-Call+_+Firework-Background.mp4'
const bgImg = 'https://s3.us-east-2.amazonaws.com/liamkande.com/preview/Food-E-Call_BG-web.jpg'


export default class App extends Component {
  state= {
  video: '',
  bgVideo: '',
  bgImg: '',
  allow:true,
  currentUser: null,
  adminUser:null,
 
}

componentDidMount () {
  
  this.setState({video: video, bgVideo: bgVideo, bgImg: bgImg})
  this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    if (userAuth) {
      const userRef = await createUserProfileDocument(userAuth);

      userRef.onSnapshot(snapShot => {
        this.setState({
          currentUser: {
            id: snapShot.id,
            ...snapShot.data()
          },
         
        });
        this.setState({ adminUser: this.state.currentUser.admin ? true : null })
        console.log(this.state.currentUser);
      });
      
    }
    
    this.setState({ currentUser: userAuth })
  });
}
componentWillUnmount() {
  this.unsubscribeFromAuth()
 
 
 
}

  render() {
    const {video, bgVideo, bgImg, currentUser, adminUser } = this.state
    return (
      <BrowserRouter>
          <Switch>
          <Route exact path="/" render={() => <NYEPage video={video} bgVideo={bgVideo}/>}/>
          <Route exact path="/about" render={() => <AboutUsPage bgImg={bgImg}/>}/>
          <Route exact path="/sign-up" render={() => <SignUpPage dialogBgImg={bgImg}/>}/>
          

          <PrivateRoute exact path="/admin" admin={adminUser} signIn={!adminUser} adminCode='1111/84-4150894'>
            <AdminPage />
          </PrivateRoute>

          <PrivateRoute exact path="/admin-signup" signUp={!adminUser} adminCode='0000/84-4150894'>
            <AdminPage />
          </PrivateRoute> 


          <PrivateRoute exact path="/admin-restaurant-form" admin={adminUser} adminCode='1111/84-4150894'>
            <AdminPage />
          </PrivateRoute> 
           
        

  
         
          
       
          
          </Switch>
    
      </BrowserRouter>
    )
  }
}
