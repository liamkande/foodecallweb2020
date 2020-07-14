import React, {useState} from 'react'
import useResults from '../../hooks/useResults'
import ResultsDetail from '../ResultsDetail'
import {NavLink} from 'react-router-dom'
import {auth} from '../../firebase/firebase.utils'



export default function RestaurantForm () {

  const [term, setTerm] = useState('')
  const [searchApi, results, errorMessage] = useResults()

    return (
      <div className='container'>
        <div className='content__center'>
        <NavLink to="/" onClick={() => auth.signOut()} style={{alignSelf:'flex-end', margin:15, color:'red', fontSize:24, cursor:'pointer'}}>
        <div>Sign Out</div>
          </NavLink>

          <h2>Restaurant Form</h2>
          <div className='content__center__input'>
            <input
              type='text'
              name={term}
              onChange={(e) => { searchApi(term); setTerm(e.target.value)}}
              placeholder='Search Yelp'
              label='search'
              style={{height:40, fontSize:29, marginTop:30, textAlign:'center'}}
            />
            {errorMessage ? <div style={{color:'red'}}>{errorMessage}</div> : null}
          </div>

        </div>
        {results.map((item, index) => {
                return (
                    <div key={index}>
                        <ResultsDetail result={item} id={item.id} />
                    </div>
                )
            })}
      </div>
    )
}

