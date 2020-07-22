import React from 'react'
import {NavLink} from 'react-router-dom'
import {auth} from '../firebase/firebase.utils'
import CustomButton from './custom-button/custom-button.component'


const AdminSignOut = () => (
    <NavLink to="/" onClick={() => auth.signOut()} style={{alignSelf:'flex-end', margin:15, color:'red', fontSize:24, cursor:'pointer'}}>
    <CustomButton style={{backgroundColor:'red'}}>Sign Out</CustomButton>
  </NavLink>
);

export default AdminSignOut