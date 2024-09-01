import worldCities from "./worldCities"

const CitySelector = ({ selectedCity, setSelectedCity, selectedCountry }) => {
    const citesList = worldCities[selectedCountry]

    return (
        <select
            className="select select-bordered w-full max-w-xs"
            value={selectedCity === "" ? "Select a city" : selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
        >
            <option value="" disabled>Select a city</option>
            {citesList.map((city) => (
                <option key={city} value={city}>
                    {city}
                </option>
            ))}
        </select>
    )
}

export default CitySelector