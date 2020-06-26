import React from 'react'
import HeartIcon from '@material-ui/icons/Favorite'


export default function AboutUsContent (props) {
    return (
      <div className='content'>
        <div className='content__center' style={{justifyContent:'center', height:'80vh'}}>
          <div  className='content__center__aboutUs' style={{backgroundColor: "rgba(255,255,255, 0.1"}}>
          <h2 className='aboutTitle'>
              <strong>Food-E-Call</strong> is a unique food delivery service designed with you in mind<HeartIcon style={{color:'#F42683', fontSize:'15px'}} />
            </h2>
            <p className='aboutP'>
            We are thrilled to finally offer you an exclusive mobile app experience, with unlimited restaurant options to choose from.
            <strong> Food-E-Call</strong> let’s you order all of your favorite dishes, from anywhere, at anytime!
            We’ve developed a business model that focuses on serving you! Every time you place an order with us, you're not only contributing in creating jobs,
            you're also helping feed children around the world. With that in mind, please remember, Don’t Stall, Use <strong>Food-E-Call</strong>.
            </p>
            </div>
        </div>
      </div>
    )
}
