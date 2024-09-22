import { useState, useEffect } from 'react'
import { getMontlyAverages } from '../utils/weatherService'
import worldCities from '../data/worldCities'

const Title = () => {
  return <div className="p-2 font-semibold">Monthly Trends</div>
}

const MonthsList = ({ months, selectedMonth, setSelectedMonth }) => {
  return (
    <div>
      <ul className="grid grid-cols-12 gap-1">
        {months.map((month) => (
          <li key={month.index} className="text-center" onClick={() => setSelectedMonth(month.index)}>
            <button className="btn btn-ghost w-full shadow-lg font-semibold">
              <div className="hidden lg:block">{month.name}</div>
              <div className="block lg:hidden">{month.name.slice(0, 3).toUpperCase()}</div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

const MonthTable = () => {
  return <div></div>
}

const MonthOverView = ({ selectedMonth, city_location }) => {
  const [monthsData, setMonthsData] = useState([])
  useEffect(() => {
    getMontlyAverages(city_location.latitude, city_location.longitude).then((data) => {
      const monthList = data.ClimateAverages?.[0].month
      setMonthsData(monthList)
    })
  }, [city_location])

  const selectedMonthData = monthsData.filter((m) => Number(m.index) === selectedMonth)?.[0]

  return (
    <div className="text-center card card-bordered flex flex-col justify-center p-2 max-w-2xl my-4 glass">
      <h1 className="font-bold text-left"> Weather Overview </h1>
      <div className="grid grid-cols-2 items-center">
        <div>
          <h1 className="text-xl font-bold">{selectedMonthData?.name}</h1>
        </div>
        <div>
          <ul className="grid grid-cols-2 gap-4">
            <li>
              <div>
                <p>⬆️ Max High</p>
                <h1 className="font-bold">{selectedMonthData?.absMaxTemp} °C</h1>
              </div>
            </li>
            <li>
              <div>
                <p>⬇️ Average Low</p>
                <h1 className="font-bold">{selectedMonthData?.avgMinTemp}</h1>
              </div>
            </li>
            <li>
              <div>
                <p>Average Daily RainFall</p>
                <h1 className="font-bold">{selectedMonthData?.avgDailyRainfall}</h1>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

const MonthlyBoard = ({ country, city }) => {
  const today = new Date()
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1)
  const [monthArchiveData, setMonthArchiveData] = useState([])
  const city_data = worldCities.filter((c) => c.name === city)[0]
  const city_location = {
    latitude: city_data.latitude,
    longitude: city_data.longitude
  }
  return (
    <div className="max-w-5xl">
      <MonthOverView selectedMonth={selectedMonth} city_location={city_location} />
    </div>
  )
}

export default MonthlyBoard
