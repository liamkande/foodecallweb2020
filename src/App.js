import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.scss'
import NYEPage from './Containers/NYEPage'
import SignUpPage from './Containers/SignUpPage'
import AboutUsPage from './Containers/AboutUsPage'
import SignUpComp from './Components/sign-up/sign-up.component'
import AdminHome from './Components/adminHome'
import AddNewCategory from './Components/addNewCategory'
import AdminPage from './Containers/AdimPage'
import PrivateRoute from './Components/PrivateRoute'
import { auth, createUserProfile} from './firebase/firebase.utils'

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

unsubscribeFromAuth = null

componentDidMount () {
  this.setState({video: video, bgVideo: bgVideo, bgImg: bgImg})
  this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    if (userAuth) {
      const userRef = await createUserProfile(userAuth)

      userRef.onSnapshot(snapShot => {
        this.setState({
          currentUser: {
            id: snapShot.id,
            ...snapShot.data()
          },
         
        });
        this.setState({ adminUser: this.state.currentUser.admin ? true : false})
        //console.log(this.state.currentUser)
      })
      
    }
    
    this.setState({ currentUser: userAuth })
  })
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
          <Route exact path="/adminsignup" render={() => <SignUpComp />  }/>
          <PrivateRoute exact path="/admin" admin={adminUser} signIn={!currentUser} adminCode='1111'>
            <AdminHome /> 
          </PrivateRoute>
          <PrivateRoute exact path="/restaurantform" admin={adminUser} signIn={!currentUser} adminCode='1111'>
            <AdminPage />
          </PrivateRoute>
          <PrivateRoute exact path="/categoryform" admin={adminUser} signIn={!currentUser} adminCode='1111'>
            <AddNewCategory />
          </PrivateRoute>
          </Switch>
    
      </BrowserRouter>
    )
  }
}
