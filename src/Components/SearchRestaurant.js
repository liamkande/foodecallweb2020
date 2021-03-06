import React, { useState, useEffect } from 'react'
import SearchBar from './SearBar'
import useResults from '../hooks/useResults'
import ResultsList from './ResultsList'
import FormInput from './form-input/form-input.component'


export default function SearchRestaurant () {

    const [term, setTerm] = useState('')
    const [searchApi, results, errorMessage] = useResults()

    return (
      <div>
        <input
            type='text'
            name={term}
            onChange={(e) => { searchApi(term); setTerm(e.target.value); console.log(`new Search: ${term} returned: ${results.length}Results at ${Date.now()}`) }}
            placeholder='search Yelp'
            label='search'
          />

        {errorMessage ? <div>{errorMessage}</div> : null}

        <ResultsList results={results}/>   
      </div>
    )
}