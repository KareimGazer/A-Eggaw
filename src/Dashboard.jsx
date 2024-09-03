import { useParams } from 'react-router-dom'

import DailyBoard from './DailyBoard';
import WeeklyBoard from './WeeklyBoard';
import MonthlyBoard from './MonthlyBoard';

const Dashboard = () => {
  const { country, city } = useParams()
  return (
    <div className="flex flex-col items-center">
      <DailyBoard country={country} city={city}/>
      <WeeklyBoard country={country} city={city}/>
      <MonthlyBoard country={country} city={city}/>
    </div>
    )
}

export default Dashboard
