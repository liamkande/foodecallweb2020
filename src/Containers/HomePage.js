import React, { Component } from 'react'
import Nav from '../Components/Nav'
import HomeContent from '../Components/HomeContent'
import Footer from '../Components/Footer'


export default class HomePage extends Component {
  render() {
    return (
      <div className="container">
        <Nav />
        <HomeContent />
        <Footer />
      </div>
    );
  }
}
