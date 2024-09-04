import CountryMap from "./CountryMap";
import CountryTable from "./CountryTable";
import worldCities from "./worldCities"

const CountryInfo = ({ country }) => {
    const cites = worldCities.filter((city) => city.country_name === country)
    return (
        <div className="flex flex-col items-center">
            <CountryMap cites={cites} />
            <CountryTable cities={cites} />
        </div>
    );
};

export default CountryInfo