import React, {Component} from 'react'
import { auth, createUserProfile} from '../firebase/firebase.utils'
import RestaurantForm from '../Components/restaurantForm/restaurant-form.component'


const currentCode = '1111/84-4150894'

class AdminSignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      renderSignIn: false,
      renderSignUp: false,
      currentUser: null,
      accessCode:'',
      accessGranted: false,
    }
  }

  unsubscribeFromAuth = null 


  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfile(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          });

          //console.log(this.state)
        });
      }

      this.setState({ currentUser: userAuth })
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  handleChange = event => {
    const { name, value } = event.target

    this.setState({ [name]: value })
  };
  
  handleSubmit = event => {
    event.preventDefault()
  
    this.state.accessCode === currentCode ? 
      this.setState({ accessGranted: true }) :
        alert("Wrong Code!")

  }

    render() {
      return (
        <RestaurantForm />
      )
    }
}


export default AdminSignUp
