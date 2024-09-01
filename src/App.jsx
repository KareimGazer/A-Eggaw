import { useState } from "react"
import {Routes, Route} from 'react-router-dom'

import Navbar from "./Navbar"
import SearchBar from "./Searchbar"
import CountryTable from "./CountryTable"
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
        <Route path="/" element={<CountryTable selectedCountry={country} selectedCity={city} />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
