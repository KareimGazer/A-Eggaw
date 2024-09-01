import { useState } from "react"
import {Routes, Route} from 'react-router-dom'

import Navbar from "./Navbar"
import SearchBar from "./Searchbar"
import CountryMap from "./CountryMap"
import Footer from "./Footer"
import Dashboard from "./Dashboard"



function App() {
  const [country, setCountry] = useState("Egypt")
  const [city, setCity] = useState('')

  return (
    <>
      <Navbar headline={"A-Eggaw"} />
      <SearchBar selectedCountry={country} selectedCity={city} setSelectedCity={setCity} setSelectedCountry={setCountry} />
      <Routes>
        <Route path="/dashboard/:country/:city" element={<Dashboard />} />
        <Route path="/" element={<CountryMap selectedCountry={country} selectedCity={city} />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
