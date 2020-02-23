import React, {Component} from 'react'
import { reduxForm, Field } from 'redux-form'
import { createPost } from '../actions/index'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Modal from 'react-awesome-modal'
import ThankYou from './ThankYou'
import asyncValidate from './asyncValidate'
import validate from './validate'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
})

const required = value => (value ? undefined : true)

const radioOption = [
  {
    value: 'Driver',
    label: 'Driver',
  },
  {
    value: 'Customer',
    label: 'Customer',
  },

]

const renderTextField = (
  { input, label, type, meta: { touched, error }, ...custom },
) => (
  <TextField
    error={touched && error}
    required={touched}
    margin="normal"
    variant="outlined"
    label={label}
    type={type}
    {...input}
    {...custom}
  />
)

const renderSelectTextField = (
  { input, label, type, meta: { touched, error }, ...custom },
) => (
  <TextField
    select
    error={touched && error}
    required={touched}
    margin="normal"
    variant="outlined"
    label={label}
    type={type}
    {...input}
    {...custom}
  >
  {radioOption.map(option => (
              <MenuItem key={option.value} value={option.value}>
              {option.label}
               </MenuItem>
             ))}

    </TextField>
)

let formIsValide = false

class SignUpForm extends Component {

  onSubmit(props) {
    createPost(props)
    formIsValide  = true
    console.log('A new post was Added!')
}

  state = {
  openDialog: formIsValide,
}



 handleClose = () => this.state.openDialog

  handleSubmit = (e) => {
    e.preventDefault()

  }


	render() {
		const { dialogBgImg, handleSubmit } = this.props
		return (
      <MuiThemeProvider theme={theme}>
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <main className='content' style={{color: 'black'}}>
          <div className='content__center' style={{marginTop:'-5%'}}>
          <div className='content__center__input' style={{textAlign:'center'}}>
          <h2 style={{fontWeight:'bold'}}>SIGN UP</h2>
          <p style={{margin:'0', fontSize:'20px'}}>Sign Up now! and get <span style={{color:'#E23E81'}}>25%</span> off your first delivery. </p>

          <Field name="email" component={renderTextField} label="Email" type="email" autoComplete="email" validate={required} />

          <Field name="firstNm" component={renderTextField} label="First Name" type="text" autoComplete="given-name" validate={required} />

          <Field name="lastNm" component={renderTextField} label="Last Name" type="text" autoComplete="family-name" validate={required} />

          <Field name="choice" label="Select" component={renderSelectTextField} validate={required} />

          <Button  type="submit" variant="contained" color='primary'  size='large'  style={{height:'50px'}}>
                 SIGN UP
               </Button>

               <Modal visible={formIsValide} onClickAway={() => formIsValide} width='50%' height='30%'>
                <ThankYou dialogBgImg={dialogBgImg} handleClose={() => formIsValide }/>
                </Modal>
                </div>
           </div>
         </main>
     </form>
      </MuiThemeProvider>

		)
	}

}

export default reduxForm({
  form: 'SignUpForm',
  validate,
  asyncValidate,
  //This could be use if we want to reset the form value after valid entry see function above.
  //onSubmitSuccess: afterSubmit,
}, null, { createPost })(SignUpForm)
