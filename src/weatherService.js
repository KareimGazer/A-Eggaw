import axios from "axios";


const base_url = 'https://api.worldweatheronline.com/premium/v1/weather.ashx'
const old_url =  'https://api.worldweatheronline.com/premium/v1/past-weather.ashx'
const api_key = import.meta.env.VITE_APP_API_KEY


const getTodayWeather = (lat, lon) => {
    return axios.get(`${base_url}?key=${api_key}&q=${lat},${lon}&num_of_days=1&date=today&format=json&tp=24&cc=yes&mca=no&fx=no`).then(res => res.data.data)
}

const getWeekWeather = (lat, lon) => {
    return axios.get(`${base_url}?key=${api_key}&q=${lat},${lon}&num_of_days=10&format=json&fx=yes&tp=24&cc=no&mca=no`).then(res => res.data.data)
}

const getDayWeather = (lat, lon, date) => {
    return axios.get(`${base_url}?key=${api_key}&q=${lat},${lon}&num_of_days=1&date=${date}&format=json&fx=yes&tp=1&cc=no`).then(res => res.data.data)
}

const getTodayDetails = (lat, lon) => {
    return axios.get(`${base_url}?key=${api_key}&q=${lat},${lon}&num_of_days=1&date=today&format=json&fx=yes&tp=24&cc=yes&mca=no`).then(res => res.data.data)
}

const getMontlyAverages = (lat, lon) => {
    return axios.get(`${base_url}?key=${api_key}&q=${lat},${lon}&num_of_days=1&tp=24&mca=yes&date=today&format=json&fx=no&cc=no`).then(res => res.data.data)
}

const getMonthArchive = (lat, lon, startDate, endDate) => {
    return axios.get(`${old_url}?key=${api_key}&q=${lat},${lon}&date=${startDate}&enddate=${endDate}&tp=24&format=json`).then(res => res.data.data)
}

export { getTodayWeather, getWeekWeather, getDayWeather, getTodayDetails, getMontlyAverages, getMonthArchive}