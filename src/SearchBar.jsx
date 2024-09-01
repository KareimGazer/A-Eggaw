import { Link, useNavigate } from 'react-router-dom'

import CountrySelector from "./CountrySelector";
import CitySelector from "./CitySelector";

const SearchBar = ({ selectedCountry, setSelectedCountry, selectedCity, setSelectedCity }) => {
    const navigate = useNavigate()
    const onSubmit = (event) => {
    event.preventDefault()
    navigate('/dashboard/' + selectedCountry + '/' + selectedCity)
  }

    return (
        <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-center m-14">Choose Your Location</h1>
            <form onSubmit={onSubmit}>
                <fieldset className="flex justify-center join">
                    <CitySelector selectedCity={selectedCity} setSelectedCity={setSelectedCity} selectedCountry={selectedCountry} />
                    <CountrySelector selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
                    <input disabled={!selectedCountry || !selectedCity} className="btn btn-primary join-item rounded-full" type="submit" value={"Forecast"}/>
            </fieldset>
        </form>
        </div>
    )
} 


export default SearchBar;