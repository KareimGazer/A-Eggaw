import worldCountries from "./worldCountries";

const CountrySelector = ({ selectedCountry, setSelectedCountry }) => {
    const handleCountrySelect = (event) => {
        setSelectedCountry(event.target.value);
    };

    return (
        <select value={selectedCountry} onChange={handleCountrySelect} className="select select-bordered w-full max-w-xs">
            {worldCountries.map((country) => (
                <option key={country.code} value={country.code}>
                    {country.name} - {country.code}
                </option>
            ))}
        </select>
    );
};

export default CountrySelector;