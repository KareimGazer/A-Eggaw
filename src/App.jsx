import { useState } from "react"
import {Routes, Route} from 'react-router-dom'

import Navbar from "./Navbar"
import SearchBar from "./search/SearchBar"
import CountryInfo from "./CountryInfo"
import Footer from "./Footer"
import Dashboard from "./Dashboard"

function App() {
  const [country, setCountry] = useState('') // maybe better to defualt to any country
  const [city, setCity] = useState('')

  return (
    <>
      <Navbar headline={"A-Eggaw"} />
      <div className="flex flex-col items-center w-full bg-gradient-to-t from-cyan-500">
        <SearchBar
          selectedCountry={country}
          selectedCity={city}
          setSelectedCity={setCity}
          setSelectedCountry={setCountry}
        />
        <Routes>
          <Route path="/dashboard/:country/:city" element={<Dashboard setCity={setCity} setCountry={setCountry}/>}/>
          <Route path="/" element={<CountryInfo country={country} />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
