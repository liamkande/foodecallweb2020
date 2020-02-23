import React from 'react'
import Nav from '../Components/Nav'
import NYEContent from '../Components/NYEContent'
import Footer from '../Components/Footer'


export default function NYEPage (props) {

    return (
      <div className="container" style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
        <Nav />
        <NYEContent url={props.video} bgVideo={props.bgVideo} />
        <Footer />
      </div>
    )

}
