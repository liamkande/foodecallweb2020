import React from 'react'
import {NavLink} from 'react-router-dom'
import CustomButton from './custom-button/custom-button.component'

export default function AdminHome () {
    return (
        <div className="container">
            <div className="content__admin">
            <NavLink to="/categoryform" >
                <CustomButton style={{marginTop:'25%', width:300}}>Add New Category</CustomButton>
            </NavLink>
            <NavLink to="/restaurantform">
                <CustomButton style={{marginTop:'25%', width:300}}>Restaurant Form</CustomButton>
            </NavLink>

            </div>
        </div>
    )
}