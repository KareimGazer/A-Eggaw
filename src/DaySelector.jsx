
const DaySelector = ({ selectedDay, setSelectedDay }) => {
    const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    return (
        <div className="flex justify-center gap-4">
            {days.map((day) => (
                <button
                    key={day}
                    className={`btn btn-primary btn-outline ${selectedDay === day ? "btn-active" : ""}`}
                    onClick={() => setSelectedDay(day)}
                >
                    {day}
                </button>
            ))}
        </div>
    )
}

export default DaySelector;