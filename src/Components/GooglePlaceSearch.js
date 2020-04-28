import React from 'react'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
  } from 'react-places-autocomplete'


export default function GooglePlaceSearch () {
    const [address, setAddress] = React.useState("")
    const handleSelect = async value => {}
    return (
      <div>
          <PlacesAutocomplete 
            value={address}
            onChange={setAddress} 
            onSelect={handleSelect}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                <div>
                    <input  {...getInputProps({ placeholder: "Search Restaurant"})} />

                    <div>
                        {loading ? <div>...loading</div> : null}

                        {suggestions.map(suggestion => {
                            const style = {
                              bacgroundColor: suggestion.active ? "red" : "blue"  
                            }
                            return (
                            <div {...getSuggestionItemProps(suggestion, {style})}>
                                {suggestion.description}
                            </div>
                            )
                        })}


                    </div>

                </div>

                )}


          </PlacesAutocomplete>
      </div>
    )
}
