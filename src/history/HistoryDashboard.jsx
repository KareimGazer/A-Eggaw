import { useState, useEffect } from "react"

import GraphSelector from "./GraphSelector"
import Graph from "./Graph"
import TimeSelector from "./TimeSelector"
import worldCities from "../data/worldCities"
import { getMonthBoundries } from "../utils/history"
import { getMonthArchive } from "../weatherService";

const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();

const HistoryDashboard = ({selectedCity}) => {
    const [selectedGraph, setSelectedGraph] = useState("temp")
    const [selectedMonth, setSelectedMonth] = useState(currentMonth - 1) // default to the prev month as data not avail for the current
    const [selectedYear, setSelectedYear] = useState(currentYear)
    const [weatherData, setWeatherData] = useState([])
    const city_data = worldCities.filter((c) => c.name === selectedCity)[0]
    const {firstDay, lastDay} = getMonthBoundries(selectedMonth, selectedYear)
    useEffect(() => {
        getMonthArchive(city_data.latitude, city_data.longitude, firstDay, lastDay).then((data) => {
            const cleanData = data.weather?.map((d) => ({
                date: d.date.slice(-2),
                maxTemp: d.maxtempC,
                minTemp: d.mintempC,
                uvIndex: d.uvIndex,
                humidity: d.hourly?.[0].humidity
            }))
            setWeatherData(cleanData)
        })
    }, [selectedMonth, selectedYear, selectedCity])
    

    return (
        <div className="flex flex-col card card-bordered p-2 w-full max-w-4xl">
            <GraphSelector selectedGraph={selectedGraph} setSelectedGraph={setSelectedGraph}/>
            <Graph data={weatherData} selectedGraph={selectedGraph}/>
            <TimeSelector selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} selectedYear={selectedYear} setSelectedYear={setSelectedYear}/>
        </div>
    )
}

export default HistoryDashboard