import React, {Component} from 'react'
import Video from './Video'
import Button from '@material-ui/core/Button'


let styles = {
  button: {
    color: 'white',
    width: '160px',
    height: '55px',
    marginRight:'25px',

    "&:hover": {
      backgroundColor: 'grey'
    },

  },

}

class HomeContent extends Component {
  render() {
    return (
      <main className='content'>
        <div className='content__left' >
        <div style={{marginBottom:'10px'}}>
          <h2 style={{margin:'0',
                      marginTop:'-3px',
                      fontWeight:'300',
        	            fontSize:'50px'}}
                      >
                      Food</h2>
          <h1 style={{margin:'10px', marginLeft:'0', marginTop:'5px'}} className='content__left__h1'>On Demand</h1>
          <p style={{marginLeft:'0', marginTop:'20px', lineHeight:'2'}} >
            Food-E-Call allows you to get food delivered to you from any restaurant. Just select, order and soon your food will be delivered right to your door.
          </p>
          </div>
          <div style={{marginTop:'20px'}}>
            <Button className='content__left__btn' style={{marginRight:'25px', color:'#03A9F4', backgroundColor:'white'}} variant="contained" href="#outlined-buttons" size='large' >
              Sign Up
            </Button>
            <Button  className='content__left__btn' style={{borderColor: "white", color:"white", border:"2px solid white"}} variant="outlined" href="#outlined-buttons" size='large'>
              Download
            </Button>
          </div>
        </div>
        <div className='content__right'>
        <Video />
        </div>
      </main>
    )
  }
}

export default HomeContent
