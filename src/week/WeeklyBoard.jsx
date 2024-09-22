import { useState, useEffect } from 'react'
import { getDayWeather } from '../utils/weatherService'
import worldCities from '../loc_data/worldCities'
import WeekCards from './WeekCards'
import WeatherTemperatureChart from './WeekGraph'

const WeeklyBoard = ({ country, city }) => {
  const today = new Date()
  const todayDate = today.toISOString().split('T')[0]
  const [selectedDay, setSelectedDay] = useState(todayDate) // the defualt selection is today
  const [selectedWeather, setSelectedWeather] = useState([])

  const city_data = worldCities.filter((c) => c.name === city)[0]

  useEffect(() => {
    getDayWeather(city_data.latitude, city_data.longitude, selectedDay).then((weatherData) => {
      const data = weatherData.weather?.[0].hourly.map((d) => ({ time: d.time, temp: d.tempC }))
      setSelectedWeather(data)
    })
  }, [selectedDay, city])

  return (
    <div className="flex flex-col gap-4 w-full">
      <WeekCards selectedDay={selectedDay} setSelectedDay={setSelectedDay} city={city} />
      <WeatherTemperatureChart data={selectedWeather} />
    </div>
  )
}

export default WeeklyBoard
