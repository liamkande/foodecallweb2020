import React, { useState, useEffect, Component } from 'react'
import yelp  from '../api/yelp'
import FormInput from './form-input/form-input.component'


export default function ResultsDetail ({result, id}) {
    const [newResult, setResult] = useState(null)

    const [formName, setFormName] = useState('')

    const [restaurantName, setRestaurantName] = useState('')
    const [restaurantYelpLink, setRestaurantYelpLink] = useState('')
    const [restaurantPhone, setRestaurantPhone] = useState('')
    const [restaurantPrice, setRestaurantPrice] = useState('')
    const [restaurantYelpRating, setRestaurantYelpRating] = useState('')
    const [restaurantYelpReviewCount, setRestaurantYelpReviewCount] = useState('')
    const [restaurantDisplayPhone, setRestaurantDisplayPhone] = useState('')
    const [restaurantAddress1, setRestaurantAddress1] = useState('')
    const [restaurantAddress2, setRestaurantAddress2] = useState('')
    const [restaurantAddress3, setRestaurantAddress3] = useState('')
    const [restaurantCity, setRestaurantCity] = useState('')
    const [restaurantZipCode, setRestaurantZipCode] = useState('')


    const getResult = async (id) => {
        const response = await yelp.get(`/${id}`)
        setResult(!response.data ? null : response.data)
        const mainData = response.data
        console.log(`Selected Restaurant ID: ${id}`)




        setRestaurantName(mainData.name)
        setRestaurantYelpLink(mainData.url)
        setRestaurantPhone(mainData.phone)
        setRestaurantPrice(mainData.price)
        setRestaurantYelpRating(`${mainData.rating}`)
        setRestaurantYelpReviewCount(`${mainData.review_count}`)
        setRestaurantDisplayPhone(mainData.display_phone)

        setRestaurantAddress1(mainData.location.address1)
        setRestaurantAddress2(mainData.location.address2)
        setRestaurantAddress3(mainData.location.address3)
        setRestaurantCity(mainData.location.city)
        setRestaurantZipCode(mainData.location.zip_code) 


       
      }

    //   useEffect(() => {
    //     getResult(id)
    //   }, [])
    
   
//    if (!newResult) {
//    return null
//     } 
 
    return (

        <div>
            
           
            <div onClick={() => getResult(id)}>
    
            <h3>{result.name}</h3>
          
           
          
        </div>
     

        {newResult &&
        
        
        
        <div className='content' style={{overflowY:'scroll'}}>
         <div className='formSignUp' style={{width:'25vw'}}>
             <div>
            <FormInput
                type='text'
                name='restaurantName'
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                label='Restaurant Name'
                required
           />   
           <FormInput
            type='text'
            name='restaurantYelpLink'
            value={restaurantYelpLink}
            onChange={(e) => setRestaurantYelpLink(e.target.value.trim())}
            label='Restaurant Yelp Link'
            required
            />      

           <FormInput
            type='text'
            name='restaurantPhone'
            value={restaurantPhone}
            onChange={(e) => setRestaurantPhone(e.target.value.trim())}
            label='Restaurant Phone'
            required
            /> 
           <FormInput
            type='text'
            name='restaurantPrice'
            value={restaurantPrice}
            onChange={(e) => setRestaurantPrice(e.target.value.trim())}
            label='Restaurant Price'
            required
            /> 
           <FormInput
            type='text'
            name='restaurantYelpRating'
            value={restaurantYelpRating}
            onChange={(e) => setRestaurantYelpRating(e.target.value.trim())}
            label='Yelp Rating'
            required
            />   
           <FormInput
            type='text'
            name='restaurantYelpReviewCount'
            value={restaurantYelpReviewCount}
            onChange={(e) => setRestaurantYelpReviewCount(e.target.value.trim())}
            label='Yelp Review Count'
            required
            />   
           <FormInput
            type='text'
            name='restaurantDisplayPhone'
            value={restaurantDisplayPhone}
            onChange={(e) => setRestaurantDisplayPhone(e.target.value)}
            label='Display Phone'
            required
            />


        </div>
</div>


        <div className='formSignUp' style={{width:'25vw'}}>
        <div>
        <FormInput
        type='text'
        name='restaurantAddress1'
        value={restaurantAddress1}
        onChange={(e) => setRestaurantAddress1(e.target.value)}
        label='Restaurant Address1'
        required
        />
        <FormInput
        type='text'
        name='restaurantAddress2'
        value={restaurantAddress2}
        onChange={(e) => setRestaurantAddress2(e.target.value)}
        label='Restaurant Address2'
        required
        />
        <FormInput
        type='text'
        name='restaurantAddress3'
        value={restaurantAddress3}
        onChange={(e) => setRestaurantAddress3(e.target.value)}
        label='Restaurant Address3'
        required
        />
        <FormInput
        type='text'
        name='restaurantCity'
        value={restaurantCity}
        onChange={(e) => setRestaurantCity(e.target.value)}
        label='Restaurant City'
        required
        />
        <FormInput
        type='text'
        name='restaurantZipCode'
        value={restaurantZipCode}
        onChange={(e) => setRestaurantZipCode(e.target.value.trim()) }
        label='Restaurant ZipCode'
        required
        />

        </div>
    </div>


    <div className='formSignUp' style={{width:'25vw'}}>
        <div>
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
        </div>
    </div>


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