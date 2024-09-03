import axios from "axios";


const base_url = 'http://api.worldweatheronline.com/premium/v1/weather.ashx'
const api_key = import.meta.env.VITE_APP_API_KEY

const getTodayWeather = (lat, lon) => {
    return axios.get(`${base_url}?key=${api_key}&q=${lat},${lon}&num_of_days=1&date=today&format=json&tp=24&cc=yes&mca=no&fx=no`).then(res => res.data.data)
}


export default getTodayWeather