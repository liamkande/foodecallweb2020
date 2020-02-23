import React from 'react'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    display: 'none',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },

  signUpBtn : {
    "&:hover": {
      backgroundColor: '#E23E81',
    },
  },

   typography: { useNextVariants: true },

   modal: {
     backgroundColor:'red',
   },


})

const Email = props => {
    return (
      <TextField
         error={false}
         required={false}
         id="outlined-email-input"
         label="Email"
         className={props.classes.textField}
         type="email"
         autoComplete="email"
         margin="normal"
         variant="outlined"

         
       />
    )
  }

export default withStyles(styles) (Email)
