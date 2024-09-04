import { useState, useEffect } from 'react';
import WeekCards from './WeekCards';

const WeeklyBoard = ({ country, city }) => {
  const today = new Date();
  const todayDate = today.toISOString().split('T')[0]
  const [selectedDay, setSelectedDay] = useState(todayDate) // the defualt selection is today

  return (
      <div className="flex items-center">
      <WeekCards selectedDay={selectedDay} setSelectedDay={setSelectedDay} city={city}/>
      </div>
  )
}

export default WeeklyBoard