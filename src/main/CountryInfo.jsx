import CountryTable from '../country/CountryTable'
import worldCities from '../loc_data/worldCities'

const CountryInfo = ({ country }) => {
  const cites = worldCities.filter((city) => city.country_name === country)
  return (
    <div>
      {/* <CountryMap country={country} /> */}
      <CountryTable cities={cites} />
    </div>
  )
}

export default CountryInfo
