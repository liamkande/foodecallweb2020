import { useState, useEffect } from 'react'
import yelp from '../api/yelp'



export default () => {
    const [results, setResults] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
  
    const searchApi = async searchTerm => {
  
      try {
        const response = await yelp.get('/search', {
          params: {
            limit:4,
            term: searchTerm,
            location: 'logan'
          }
        })
        setResults(response.data.businesses)
      } catch(err) {
        setErrorMessage('Something went wrong')
  
    }
  }
  
  useEffect(() => {
    searchApi('popular restaurants')
  }, [])
  
  return [searchApi, results, errorMessage]
  
  }
  