import React from 'react'
import ResultsDetail from './ResultsDetail'


export default function ResultsList ({results}) {
    return (
        <div>
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