import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import DailyBoard from '../day/DailyBoard'
import WeeklyBoard from '../week/WeeklyBoard'
import MonthlyBoard from '../month/MonthlyBoard'
import HistoryDashboard from '../history/HistoryDashboard'

const Dashboard = ({ setCity, setCountry }) => {
  const { country, city } = useParams()

  useEffect(() => {
    setCountry(country)
    setCity(city)
  }, [])

  return (
    <div className="flex flex-col items-center">
      <DailyBoard country={country} city={city} />
      <WeeklyBoard country={country} city={city} />
      <MonthlyBoard country={country} city={city} />
      <HistoryDashboard selectedCity={city} />
    </div>
  )
}

export default Dashboard
