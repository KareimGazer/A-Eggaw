import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudSun, faTemperature0, faWind, faDroplet, faGlassWaterDroplet, faSun} from '@fortawesome/free-solid-svg-icons'

const Focus = ({high, low, state}) => {

    return (
        <div className='text-center card card-bordered border-2 flex flex-col justify-center p-4 w-full'>
            <h1 className='font-bold text-left card-title'> Today </h1>
            <FontAwesomeIcon icon={faCloudSun} className='text-7xl h-full p-16' />
            <div>
                <h1 className='text-4xl'>{high}°C</h1>
                <h1 className='text-2xl'>{low}°C</h1>
                <p>{state}</p>
            </div>
        </div>
    )
}

const Details = () => {

    return (
        <div className='p-1 w-full'>
            <header className='pb-4'>
                <div className='card flex flex-col text-xl'>
                    <h1 className='text-left card-title'><span className='font-bold'>Monday,</span> <span className='font-normal'>2 Sep.</span></h1>
                    <h2 className='text-left'>12:27 AM</h2>
                    <p>Expect sunny skies. The high will be 37°.</p>
                </div>
            </header>
            <main>
                <div className='grid grid-cols-2 gap-1'>
                    <div className='text-center card card-bordered border-2 p-4 w-full max-w-xs'>
                        <FontAwesomeIcon icon={faTemperature0} className='text-md' />
                        <div>
                            <h1 className='text-3xl'>37°</h1>
                            <p>High</p>
                        </div>
                    </div>
                    <div className='text-center card card-bordered border-2 p-4 w-full max-w-xs'>
                        <FontAwesomeIcon icon={faWind} className='text-md' />
                        <div>
                            <h1 className='text-3xl'>5 km/h</h1>
                            <p>Wind</p>
                        </div>
                    </div>
                    <div className='text-center card card-bordered border-2 p-4 w-full max-w-xs'>
                        <FontAwesomeIcon icon={faDroplet} className='text-md' />
                        <div>
                            <h1 className='text-3xl'>80%</h1>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className='text-center card card-bordered border-2 p-4 w-full max-w-xs'>
                        <FontAwesomeIcon icon={faGlassWaterDroplet} className='text-md' />
                        <div>
                            <h1 className='text-3xl'>80%</h1>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className='text-center card card-bordered border-2 p-4 w-full max-w-xs'>
                        <FontAwesomeIcon icon={faGlassWaterDroplet} className='text-md' />
                        <div>
                            <h1 className='text-3xl'>80%</h1>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className='text-center card card-bordered border-2 p-4 w-full max-w-xs'>
                        <FontAwesomeIcon icon={faGlassWaterDroplet} className='text-md' />
                        <div>
                            <h1 className='text-3xl'>80%</h1>
                            <p>Humidity</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

const DailyBoard = () => {

    return (
        <div className='flex flex-row gap-2 m-8 justify-center w-full'>
            <Focus high={36} low={20} state={"sunny"} />
            <Details/>
        </div>
    )
}

export default DailyBoard