import { useParams } from 'react-router-dom'

import DailyBoard from './DailyBoard';
import WeeklyBoard from './WeeklyBoard';
import MonthlyBoard from './MonthlyBoard';

const Dashboard = () => {

    const { country, city } = useParams()
  return (
    <>
    <DailyBoard />
    <WeeklyBoard />
    <MonthlyBoard />
    </>
    )
}

export default Dashboard
