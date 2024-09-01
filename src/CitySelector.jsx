import worldCities from "./worldCities"

const CitySelector = ({ selectedCity, setSelectedCity, selectedCountry }) => {
    const citesList = worldCities.filter((city) => city["country_name"] === selectedCountry)
    return (
        <select
            className="select select-bordered w-full max-w-xs"
            value={selectedCity === "" ? "Select a city" : selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
        >
            <option value="">Select a city</option>
            {citesList.map((city) => (
                <option key={city.id} value={city.name}>
                    {city.name}
                </option>
            ))}
        </select>
    )
}

export default CitySelector