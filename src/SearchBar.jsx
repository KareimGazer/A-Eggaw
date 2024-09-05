import { useState, useEffect } from 'react';
import { useNavigate, useParams, Route, Link, Routes, useLocation} from 'react-router-dom'

import CountrySelector from "./CountrySelector";
import CitySelector from "./CitySelector";
import worldCities from './worldCities';

const calcDistance = (lat1, lon1, lat2, lon2) => {
    return Math.sqrt((lat1 - lat2) ** 2 + (lon1 - lon2) ** 2)
}

const Loading = () => (<span className="loading loading-dots loading-lg p-0"></span>)

const SearchBar = ({ selectedCountry, setSelectedCountry, selectedCity, setSelectedCity }) => {
    const { hash, pathname, search } = useLocation()
    console.log(hash, pathname, search)
    const [userMessage, setUserMessage] = useState("Chooce Your Location")
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()
    const onSubmit = (event) => {
    event.preventDefault()
        navigate('/dashboard/' + selectedCountry + '/' + selectedCity)
    }

    useEffect(() => {
        if ("geolocation" in navigator && !pathname.includes('dashboard')) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const [lat, lon] = [pos.coords.latitude, pos.coords.longitude].map(x => x.toFixed(3))
                    const current_city = worldCities.reduce((prev, curr) => (calcDistance(lat, lon, curr.latitude, curr.longitude) < calcDistance(lat, lon, prev.latitude, prev.longitude)) ? curr : prev);
                    setSelectedCity(current_city.name)
                    setSelectedCountry(current_city.country_name)
                    setUserMessage("Based On Your Location: " + current_city.name + ", " + current_city.country_name)
                    setLoading(false)
                },
                (err) => console.log(err)
            )
        }
        else {
            console.log("geolocation not available")
        }

    }, [])

    return (
        <div className="flex flex-col items-center p-8">
            <h1 className="text-4xl font-bold py-8">{userMessage} {loading ? Loading() : ""}</h1>
            <form onSubmit={onSubmit}>
                <fieldset className="join">
                    <CitySelector selectedCity={selectedCity} setSelectedCity={setSelectedCity} selectedCountry={selectedCountry} setUserMessage={setUserMessage} setLoading={setLoading}/>
                    <CountrySelector selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} setSelectedCity={setSelectedCity} setUserMessage={setUserMessage} setLoading={setLoading}/>
                    <input disabled={!selectedCountry || !selectedCity} className="btn btn-primary join-item rounded-full" type="submit" value={"Forecast"}/>
                </fieldset>
            </form>
        </div>
    )
} 


export default SearchBar;