import React from 'react'



export default function SearchBar ({term, onTermChange, onTermSubmit}) {
    return (
        <div>
            
          <input
            type='text'
        
            value={term}
            onChange={onTermChange}
            onSubmit={onTermSubmit}
            placeholder='search Yelp'
            label='search'
          />                 
            
  

        </div>
    )
}