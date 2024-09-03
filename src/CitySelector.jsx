import worldCities from "./worldCities"

const CitySelector = ({ selectedCity, setSelectedCity, selectedCountry, setUserMessage, setLoading }) => {
    const citesList = worldCities.filter((city) => city["country_name"] === selectedCountry)
    return (
        <select
            className="select select-bordered w-full join-item rounded-full"
            value={selectedCity === "" ? "Select a city" : selectedCity}
            onChange={(e) => {
                setSelectedCity(e.target.value)
                setUserMessage(`Based On Your Choice: ${e.target.value}, ${selectedCountry}`)
                setLoading(false)
            }}
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