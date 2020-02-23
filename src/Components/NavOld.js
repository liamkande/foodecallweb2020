import React from 'react'
import logo from '../logo.svg'
import { NavLink } from 'react-router-dom'


export default function Nav (props) {
    return (
      <nav className='nav' style={{paddingTop:'3%', paddingLeft:'2%', paddingRight:'5%'}}>
      <NavLink exact to="/" className='nav__logo' >
        <img src={logo} alt='logo' className='logoImg' />
       </NavLink>
        <div className='nav__tabs' style={{marginTop:'-4%'}}>
        <ul className='main-nav'>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/sign-up">Sign Up</NavLink>
          </ul>
        </div>
      </nav>
    )
}
