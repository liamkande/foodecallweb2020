import React from 'react'
import ResultsDetail from './ResultsDetail'



export default function ResultsList ({title, results,}) {
    return (
        <div>

            <div>
                {results.map((item, index) => {
                    return (
                        <div key={index}>
                            <ResultsDetail result={item} />
                        </div>
                         
                    )
                })}
            </div>

        </div>
    )
}