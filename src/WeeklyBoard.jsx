import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudSun, faTemperature0, faWind, faDroplet, faGlassWaterDroplet, faSun } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const daysOfWeek = [
  'Monday 0',
  'Tuesday 1',
  'Wednesday 2',
  'Thursday 3',
  'Friday 4',
  'Saturday 5',
  'Sunday 6',
  'Monday 7',
  'Tuesday 8',
  'Wednesday 9',
];
const Card = ({ day }) => {
  return (
    <div className="btn btn-ghost m-1 flex-shrink-0 rounded-lg shadow-lg text-center">
      <h3 className="text-xl font-semibold">{day}</h3>
    </div>
  );
};

const WeekCards = () => {
  const [index, setIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(7);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 768) {
        setVisibleCards(3);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(5);
      } else {
        setVisibleCards(7);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial value

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? daysOfWeek.length - visibleCards : prevIndex - 1));
  };

  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex === daysOfWeek.length - visibleCards ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full max-w-full overflow-hidden">
      <div className="flex">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-primary p-2 rounded-md"
          onClick={prevSlide}
          disabled={index === 0}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div className="flex transition-transform duration-1000 ease-in-out overflow-x-hidden">
          {daysOfWeek.slice(index, index + visibleCards).map((day, i) => (
            <Card key={i} day={day} />
          ))}
        </div>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-primary p-2 rounded-md"
          onClick={nextSlide}
          disabled={index + visibleCards >= daysOfWeek.length}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};





const WeeklyBoard = ({country, city}) => {
    const [dayIndex, setDayIndex] = useState(1)

    return (
        <div className="flex items-center">
            <WeekCards />
        </div>
    )
}

export default WeeklyBoard