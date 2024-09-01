import CountrySelector from "./CountrySelector";
import CitySelector from "./CitySelector";

const SearchBar = ({ selectedCountry, setSelectedCountry, selectedCity, setSelectedCity}) => {

    return (
        <form action="">
            <fieldset className="flex justify-center gap-1">
                <CitySelector selectedCity={selectedCity} setSelectedCity={setSelectedCity} selectedCountry={selectedCountry} />
                <CountrySelector selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
                <input type="submit" value={"Forecast"} className="btn btn-primary"/>
            </fieldset>
        </form>
    )
} 


export default SearchBar;