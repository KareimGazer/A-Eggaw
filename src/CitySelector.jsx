import worldCities from "./worldCities"

const CitySelector = ({ selectedCity, setSelectedCity, selectedCountry }) => {
    const citesList = worldCities.filter((city) => city["country_name"] === selectedCountry)
    return (
        <select
            className="select select-bordered w-full join-item rounded-full"
            value={selectedCity === "" ? "Select a city" : selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
        >
            {citesList.map((city) => (
                <option key={city.id} value={city.name}>
                    {city.name} - {city.state_code}
                </option>
            ))}
        </select>
    )
}

export default CitySelector