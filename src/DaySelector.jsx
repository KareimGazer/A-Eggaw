// useState
import { useState } from "react"

const cards = [
    {
      name: 'Saturday',
      state: 'Sunny',
      temp: [40, 20],
    },
    {
      name: 'Sunday',
      state: 'Sunny',
      temp: [40, 20],
    },
    {
      name: 'Monday',
      state: 'Sunny',
      temp: [40, 20],
    },
    {
      name: 'Tuesday',
      state: 'Sunny',
      temp: [40, 20],
    },
    {
      name: 'Wednesday',
      state: 'Sunny',
      temp: [40, 20],
    },
    {
      name: 'Thursday',
      state: 'Sunny',
      temp: [40, 20],
    },
    {
      name: 'Friday',
      state: 'Sunny',
      temp: [40, 20],
    },
    {
      name: 'Saturday',
      state: 'Sunny',
      temp: [40, 20],
    },
    {
      name: 'Sunday',
      state: 'Sunny',
      temp: [40, 20],
    },
    {
      name: 'Monday',
      state: 'Sunny',
      temp: [40, 20],
    }
  ];


const DaySelector = ({ selectedDay, setSelectedDay }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
    };

    if(currentIndex>cards.length-7) {
        setCurrentIndex(0)
    }
    
    return (
    <div className="m-8 justify-center">
          <div className="flex flex-row gap-2">
            {cards.map((card, index) => (
              <div className="w-1/3 p-4 bg-white rounded-lg shadow-md hover:bg-gray-100" key={index}>
                    <h3 className="text-lg font-bold">{card.name}</h3>
                    <p>{card.temp[0]}°C - {card.temp[1]}°C</p>
                    <p>{card.state}</p>
              </div>
            ))}
          </div>
    </div>
  )
}

export default DaySelector;