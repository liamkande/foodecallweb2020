import React from 'react'
import { NavLink } from 'react-router-dom'
import HeartIcon from '@material-ui/icons/Favorite'
import ClearIcon from '@material-ui/icons/Clear'

export default function ThankYou (props) {

  return (
    <div style={{backgroundImage: "url("+props.dialogBgImg+")", minHeight:'100%', color:'white'}}>
      <div className='btnClose'>
          <NavLink to="/" className='dialog__close' onClick={props.handleClose}>
          <ClearIcon style={{color:'white', fontSize:'30px'}} />
          </NavLink>
      </div>
      <h1 style={{marginTop:'0px'}}>Thank You!</h1>
        <p className='thxP'>
          We are currently perfecting our app. Sit back and relax! We'll notify you directly as soon as we launch!<HeartIcon style={{color:'#F42683', fontSize:'15px'}} />
        </p>
      </div>
  )
}
