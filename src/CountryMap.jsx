const CountryMap = ({ selectedCountry }) => {

    return (
        <div className="flex justify-center m-4 p-4">
            <img src={`../public/${selectedCountry}.png`} alt={`map of ${selectedCountry}`} />
        </div>
    )
}

export default CountryMap;
