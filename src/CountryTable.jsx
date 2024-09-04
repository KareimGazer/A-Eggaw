import { useState, useEffect } from "react"
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
              <div className="font-bold text-2xl">40</div>
              <div className="opacity-50 text-xl">20</div>
            </div>
        </td>
        <td>
            <span className="badge badge-md badge-secondary">Partly cloudy</span>
        </td>
        <th>
          <p className="font-normal">Expect sunny skies. The high will be 36°.</p>
        </th>
        <td className="text-xl">32</td>
      </tr>
    )
}
    

const CountryTable = ({ cities }) => {

    return (
        <div className="m-20 w-full">
            <table className="table">
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
                    {cities.map((city) => (
                        <CityEntry key={city.id} city={city} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CountryTable;
