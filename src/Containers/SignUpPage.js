import React from 'react'
import Nav from '../Components/Nav'
import SignUpForm from '../Components/SignUpForm'
import Footer from '../Components/Footer'
import showResults from '../utils/showResults'

export default function SignUpPage (props)  {
    return (
      <div className="container" >
        <Nav />
        <SignUpForm onSubmit={showResults} dialogBgImg={props.dialogBgImg}/>
        <Footer />
      </div>
    )
}
