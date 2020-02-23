import React from 'react'
import Video from './Video'


export default function NYEContent (props) {
    return (
      <main className='content'>
        <div className='content__video'  >
          <Video url={props.url} style={{marginTop:'20px'}}/>
          <video autoPlay loop id="video-background" muted playsInline >
          <source src={props.bgVideo} type="video/mp4" />
          </video>
          </div>

      </main>
    )
}


//style={{maxWidth:'900px', minWidth:'650px', maxHeight: '480px', minHeight: '420px', marginTop: '-5%'}}
