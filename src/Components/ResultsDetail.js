import React from 'react'

export default function ResultsDetail ({result}) {
    return (
        <div>
            <div>
    
                <h3>{result.name}</h3>
                <p>{result.phone}</p>
              
            </div>
            {/* <div>
                {result.categories.map((category, index) => {
                    return (
                        <div key={index} style={{color:'gray'}}>{category.alias}</div>
                    )
                })}
            </div> */}

        </div>
    )
}