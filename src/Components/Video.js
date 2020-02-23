import React from 'react'

const wmax = '100%'
const hmax = '100%'

export default function Video (props) {
  return (
    <iframe
    title='Food-E-Call Introduction Video'
    width={wmax} //750  //650 //600
    height={hmax} //420 //370 //345
    src={props.url}
    frameBorder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    >
    </iframe>

  )
}
