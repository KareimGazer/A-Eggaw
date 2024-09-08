import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import worldCities from '../data/worldCities';
import { getWeekWeather } from '../utils/weatherService';
import WeatherIcon from '../utils/WeatherIcon';


const MoreDetails = ({ desc, humidity }) => {
    return (
        <div className='text-xs'>
            <div>{desc}</div>
            <div>{humidity}%</div>
        </div>
    )
}
const Card = ({ selectedDay, setSelectedDay, dayDate, dayName, dayNumber, high, low, desc, humidity }) => {

    return (
        <div className="flex-shrink-0 rounded-lg text-center card card-bordered p-2" onClick={() => setSelectedDay(dayDate)}>
            <div className='flex flex-col justify-center'>
                <div>
                    <div className='flex flex-row items-center gap-2'>
                        <div className='text-xs'>{dayName}, </div>
                        <div className='text-xs'>{dayNumber}</div>
                    </div>
                </div>
                <div className='flex flex-row items-center gap-2'>
                    <WeatherIcon cond={desc} size='text-left text-lg'/>
                    <div className='text-md pl-8 pr-2'>
                        <div>{high}°</div>
                        <div>{low}°</div>
                    </div>
                    {selectedDay === dayDate && <MoreDetails desc={desc} humidity={humidity} />}
                </div>
            </div>
        </div>
    );
};


const datesArray = Array.from({ length: 10 }, (_, i) => {
    const today = new Date();
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);
    return { date: nextDate.toISOString().split('T')[0]};
});

const WeekCards = ({ selectedDay, setSelectedDay, city }) => {
    const [index, setIndex] = useState(0);
    const [visibleCards, setVisibleCards] = useState(7);
    const [daysWeather, setDaysWeather] = useState(datesArray); 

    const city_data = worldCities.filter((c) => c.name === city)[0]
    useEffect(() => {
        getWeekWeather(city_data.latitude, city_data.longitude).then(data => setDaysWeather(data.weather))
    }, [city])

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
        setIndex((prevIndex) => (prevIndex === 0 ? daysWeather.length - visibleCards : prevIndex - 1));
    };

    const nextSlide = () => {
        setIndex((prevIndex) => (prevIndex === daysWeather.length - visibleCards ? 0 : prevIndex + 1));
    };

    return (
        <div className="relative w-full max-w-full overflow-hidden">
        <div className="flex flex-row justify-center items-center">
            <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-0 rounded-md"
            onClick={prevSlide}
            disabled={index === 0}
            >
            <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div className="flex transition-transform duration-1000 ease-in-out overflow-x-hidden gap-2">
                    {daysWeather.slice(index, index + visibleCards).map((dayWeather) => {
                        const dayDate = new Date(dayWeather.date);
                        const dayName = dayDate.toLocaleDateString('en-US', { weekday: 'long' });
                        const dayNumber = dayDate.getDate();
                        const high = dayWeather.maxtempC;
                        const low = dayWeather.mintempC;
                        const desc = dayWeather.hourly?.[0]?.weatherDesc?.[0]?.value;
                        const humidity = dayWeather.hourly?.[0]?.humidity;
                        return (
                            <Card key={dayWeather.date}
                            selectedDay={selectedDay}
                            setSelectedDay={setSelectedDay}
                            dayDate={dayWeather.date}
                            dayName={dayName}
                            dayNumber={dayNumber}
                            high={high}
                            low={low}
                            desc={desc}
                            humidity={humidity}
                            />
                        );
                } )}
            </div>
            <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-0 rounded-md"
            onClick={nextSlide}
            disabled={index + visibleCards >= daysWeather.length}
            >
            <FontAwesomeIcon icon={faArrowRight} />
            </button>
        </div>
        </div>
    );
};

export default WeekCards