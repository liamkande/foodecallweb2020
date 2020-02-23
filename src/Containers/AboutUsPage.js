import React from 'react'
import Nav from '../Components/Nav'
import AboutUsContent from '../Components/AboutUsContent'
import Footer from '../Components/Footer'


export default function AboutUsPage (props) {
    return (
      <div className="container" style={{backgroundImage: "url("+props.bgImg+")"}} >
        <Nav />
        <AboutUsContent />
        <Footer />
      </div>
    )

}
