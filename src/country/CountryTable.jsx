import { useState, useEffect } from 'react'
import { getTodayDetails } from '../utils/weatherService'

const CityEntry = ({ city }) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    getTodayDetails(city.latitude, city.longitude).then((data) => {
      setWeather({
        temp: data.current_condition?.[0].temp_C,
        desc: data.current_condition?.[0].weatherDesc?.[0].value,
        humidity: data.current_condition?.[0].humidity,
        visibility: data.current_condition?.[0].visibility,
        feels_like: data.current_condition?.[0].FeelsLikeC,
        uv_index: data.current_condition?.[0].UVIndex,
        sunrise: data.weather?.[0].astronomy?.[0].sunrise,
        sunset: data.weather?.[0].astronomy?.[0].sunset,
        max_temp: data.weather?.[0].maxtempC,
        min_temp: data.weather?.[0].mintempC
      })
    })
  }, [])

  const { temp, desc, humidity, visibility, feels_like, uv_index, sunrise, sunset, max_temp, min_temp } = weather
  return (
    <tr>
      <td className="py-4 px-2 text-left text-base sm:text-xs md:text-xs">
        <div className="font-semibold">{city.name}</div>
      </td>
      <td className="py-4 px-1 text-center">
        <div>
          <div className="font-bold text-xl">{max_temp}°</div>
          <div className="opacity-50 text-lg">{min_temp}°</div>
        </div>
      </td>
      <td className="text-center">
        <span className="badge badge-md badge-secondary">{desc}</span>
      </td>
      <td className="py-4 px-1 text-center">{feels_like}°</td>
      <td className="py-4 pr-2 text-center">{sunrise}</td>
      <td className="py-4 px-1 text-center">{sunset}</td>
    </tr>
  )
}

const CountryTable = ({ cities }) => {
  return (
    <div className="overflow-x-auto mt-8 w-full">
      <table>
        <thead>
          <tr className="w-full text-sm">
            <th className="py-4 px-2 text-left text-base sm:text-sm md:text-xs">City</th>
            <th className="py-4 px-2 text-left">High & Low</th>
            <th className="py-4 px-2 text-center">Overall</th>
            <th className="py-4 px-2 text-left">Feels Like</th>
            <th className="py-4 px-2 text-left">Sunrise</th>
            <th className="py-4 px-2 text-left">Sunset</th>
          </tr>
        </thead>
        <tbody className="w-full text-md">
          {cities.map((city) => (
            <CityEntry key={city.id} city={city} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CountryTable
