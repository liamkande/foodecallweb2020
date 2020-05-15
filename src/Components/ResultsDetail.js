import React, { useState, useEffect } from 'react'
import yelp  from '../api/yelp'
import FormInput from './form-input/form-input.component'


export default function ResultsDetail ({result, id}) {
    const [newResult, setResult] = useState(null)
    const [formName, setFormName] = useState('')


    const getResult = async (id) => {
        const response = await yelp.get(`/${id}`)
        setResult(response.data)
        console.log(`Selected Restaurant ID: ${id}`)
       
      }

    //   useEffect(() => {
    //     getResult(id)
    //   }, [])
    
   
    //   if (!newResult) {
    //     return null
    //   }
    

    return (
        <div>
            
           
            <div onClick={() => getResult(id)}>
    
            <h3>{result.name}</h3>
          
           
          
        </div>
     

        {newResult &&
        <div>
            <FormInput
                type='text'
                name='restaurantName'
                value={newResult.name}
                onChange={(e) => setFormName(e.target.value) }
                label='Restaurant Name'
                required
           />   
           <FormInput
            type='text'
            name='restaurantYelpLink'
            value={newResult.url}
            onChange={(e) => setFormName(e.target.value) }
            label='Restaurant Yelp Link'
            required
            />      
           <FormInput
            type='text'
            name='restaurantAddress1'
            value={newResult.location.address1}
            onChange={(e) => setFormName(e.target.value) }
            label='Restaurant Address1'
            required
            />
           {/* <FormInput
            type='text'
            name='restaurantAddress2'
            value={newResult.location.address2}
            onChange={(e) => setFormName(e.target.value) }
            label='Restaurant Address2'
            required
            />
           <FormInput
            type='text'
            name='restaurantAddress3'
            value={newResult.location.address3}
            onChange={(e) => setFormName(e.target.value) }
            label='Restaurant Address3'
            required
            /> */}
           <FormInput
            type='text'
            name='restaurantCity'
            value={newResult.location.city}
            onChange={(e) => setFormName(e.target.value) }
            label='Restaurant City'
            required
            />
           <FormInput
            type='text'
            name='restaurantZipCode'
            value={newResult.location.zip_code}
            onChange={(e) => setFormName(e.target.value) }
            label='Restaurant ZipCode'
            required
            />
           <FormInput
            type='text'
            name='restaurantPhone'
            value={newResult.phone}
            onChange={(e) => setFormName(e.target.value) }
            label='Restaurant Phone'
            required
            /> 
           <FormInput
            type='text'
            name='restaurantPrice'
            value={newResult.price}
            onChange={(e) => setFormName(e.target.value) }
            label='Restaurant Price'
            required
            /> 
           {/* <FormInput
            type='text'
            name='restaurantYelpRating'
            value={`${newResult.rating}`}
            onChange={(e) => setFormName(e.target.value) }
            label='Yelp Rating'
            required
            />   
           <FormInput
            type='number'
            name='restaurantYelpReviewCount'
            value={`${newResult.review_count}`}
            onChange={(e) => setFormName(e.target.value) }
            label='Yelp Review Count'
            required
            />   
           <FormInput
            type='text'
            name='restaurantDisplayPhone'
            value={newResult.display_phone}
            onChange={(e) => setFormName(e.target.value) }
            label='Display Phone'
            required
            /> */}




{/* <div>
 
           
 <div>
 Transactions: {newResult.transactions.map((option, index) => {
         return (
             <p key={index} style={{color:'gray'}}>{option}</p>
         )
     })}
 </div>

 <div>
 Categories: {newResult.categories.map((category, index) => {
     return (
         <p key={index} style={{color:'gray'}}>{category.alias}</p>
     )
 })}
</div>


 
</div>             */}




        </div>
        }
          

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