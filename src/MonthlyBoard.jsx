import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudSun, faTemperature0, faWind, faDroplet, faGlassWaterDroplet, faSun } from '@fortawesome/free-solid-svg-icons'

const Title = () => {
    return (
        <div className="p-2 font-semibold">
            Monthly
        </div>
    )
}

const MonthsList = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return (
        <div>
            <ul className="grid grid-cols-12 gap-1">
                {
                    months.map((month) => (
                        <li key={month} className="text-center">
                            <button className="btn btn-ghost w-full shadow-lg font-semibold">
                                <div className="hidden lg:block">
                                    {month}
                                </div>
                                <div className="block lg:hidden">
                                    {month.slice(0, 3).toUpperCase()}
                                </div>
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

const MonthTable = () => {

    return (
        <div>
        </div>
    )
}

const MonthCard = ({ sunnyDays, rainyDays, avgHigh, avgLow }) => {
    const currentDate = new Date();
    const current_month_name = currentDate.toLocaleString('default', { month: 'long' });

    return (
        <div className='text-center card card-bordered flex flex-col justify-center p-2 max-w-2xl my-4'>
            <h1 className='font-bold text-left'> Weather Overview </h1>
            <div className='grid grid-cols-2 items-center'>
                <div>
                    <h1 className='text-xl font-bold'>{current_month_name}</h1>
                </div>
                <div>
                    <ul className='grid grid-cols-2 gap-4'>
                        <li>
                            <div>
                                <p>Sunny/Cloudy days</p>
                                <h1>{sunnyDays}</h1>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>Rain/Snow days</p>
                                <h1>{rainyDays}</h1>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>⬆️ Average High</p>
                                <h1>{avgHigh}</h1>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p>⬇️ Average Low</p>
                                <h1>{avgLow}</h1>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}


const MonthlyBoard = ({country, city}) => {

    return (
        <div className="max-w-5xl">
            <Title/>
            <MonthsList />
            <MonthTable />
            <MonthCard sunnyDays={10} rainyDays={5} avgHigh={30} avgLow={20}/>
        </div>
    )
}

export default MonthlyBoard