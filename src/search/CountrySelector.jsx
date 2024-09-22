import worldCountries from '../data/worldCountries'

const CountrySelector = ({ selectedCountry, setSelectedCountry, setSelectedCity, setUserMessage, setLoading }) => {
  const handleCountrySelect = (event) => {
    setSelectedCountry(event.target.value)
    setSelectedCity('')
    setUserMessage(`Based On Your Choice: ${event.target.value}`)
    setLoading(false)
  }

  return (
    <select value={selectedCountry} onChange={handleCountrySelect} className="select select-bordered w-full join-item">
      {worldCountries.map((country) => (
        <option key={country.code} value={country.name}>
          {country.name} - {country.code}
        </option>
      ))}
    </select>
  )
}

export default CountrySelector
