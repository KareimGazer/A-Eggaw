import { monthsOfTheYear, getYearsNumbers, getMonthBoundries } from "../utils/history"

const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();

const TimeSelector = ({selectedMonth, setSelectedMonth, selectedYear, setSelectedYear}) => {
    const last10Years = getYearsNumbers(10)
    return (
        <div className="join flex items-start p-2 w-full max-w-xs">
            <select
                className="select select-bordered select-xs w-full text-sm join-item rounded-lg"
                value={selectedMonth}
                onChange={(e) => {
                    setSelectedMonth(e.target.value)
                }}
            >
            {monthsOfTheYear.map((month, i) => (
                <option key={i+1} value={i+1} disabled={i+1 >= currentMonth && selectedYear === currentYear}>
                    {month.slice(0, 3).toUpperCase()} 
                </option>
            ))}
            </select>

            <select
                className="select select-bordered select-xs w-full text-sm join-item rounded-lg"
                value={selectedYear}
                onChange={(e) => {
                    setSelectedYear(e.target.value)
                }}
            >
            {last10Years.map((year) => (
                <option key={year} value={year}>
                    {year} 
                </option>
            ))}
            </select>
        </div>
    )
}

export default TimeSelector