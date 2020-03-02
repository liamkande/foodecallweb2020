import React, {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.scss'
import NYEPage from './Containers/NYEPage'
import SignUpPage from './Containers/SignUpPage'
import AboutUsPage from './Containers/AboutUsPage'
import SignUp from './Containers/SignUp'
import AdminPage from './Containers/AdimPage'



const video = 'https://www.youtube.com/embed/unbvLdXf-nM'
const bgVideo = 'https://s3.us-east-2.amazonaws.com/liamkande.com/preview/Food-E-Call+_+Firework-Background.mp4'
const bgImg = 'https://s3.us-east-2.amazonaws.com/liamkande.com/preview/Food-E-Call_BG-web.jpg'


export default class App extends Component {
  state= {
  video: '',
  bgVideo: '',
  bgImg: ''
}

componentDidMount () {
  this.setState({video: video, bgVideo: bgVideo, bgImg: bgImg})
}

  render() {
    const {video, bgVideo, bgImg} = this.state
    return (
      <BrowserRouter>
        <div className='container'>
          <Switch>
          <Route exact path="/" render={() => <NYEPage video={video} bgVideo={bgVideo}/>}/>
          <Route exact path="/about" render={() => <AboutUsPage bgImg={bgImg}/>}/>
          <Route exact path="/sign-up" render={() => <SignUpPage dialogBgImg={bgImg}/>}/>
          <Route exact path="/admin" render={() => <SignUp />}/>
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
