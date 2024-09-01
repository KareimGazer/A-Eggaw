import worldCities from "./worldCities"

const CityEntry = ({ city }) => {
    return (
        <tr>
            <td>
                <div className="font-semibold">
                    <h1>{city.name}</h1>
                </div>
            </td>
        <td>
            <div>
              <div className="font-bold text-2xl text-left">40</div>
              <div className="opacity-50 text-xl">20</div>
            </div>
        </td>
        <td>
            <span className="badge badge-md badge-ghost">Partly cloudy</span>
        </td>
        <th>
          <p className="font-normal">Expect sunny skies. The high will be 36°.</p>
        </th>
        <td className="text-xl">32</td>
      </tr>
    )
}
    

const CountryMap = ({ selectedCountry }) => {

    const citesList = worldCities.filter((city) => city["country_name"] === selectedCountry)

    return (
        <div className="overflow-x-auto m-20">
            <table className="table text-center">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Temp.</th>
                        <th>Overall</th>
                        <th>Description</th>
                        <th>Feels Like</th>
                    </tr>
                </thead>
    
                <tbody>
                    {citesList.map((city) => (
                        <CityEntry key={city.id} city={city} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CountryMap;
