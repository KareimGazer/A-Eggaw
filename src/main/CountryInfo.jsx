import CountryTable from "../country/CountryTable";
import worldCities from "../data/worldCities";

const CountryInfo = ({ country }) => {
    const cites = worldCities.filter((city) => city.country_name === country)
    return (
        <div>
            <CountryTable cities={cites} />
        </div>
    );
};

export default CountryInfo