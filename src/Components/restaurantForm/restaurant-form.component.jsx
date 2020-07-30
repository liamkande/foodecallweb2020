import React, {useState} from 'react'
import useResults from '../../hooks/useResults'
import ResultsDetail from '../ResultsDetail'
import AdminSignOut from '../adminSignOut'


export default function RestaurantForm () {

  const [term, setTerm] = useState('')
  const [searchApi, results, errorMessage] = useResults()


    return (
      <div className='container' style={{overflowY:'scroll'}}>
        <div className='content__center'  >

          <AdminSignOut />
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

