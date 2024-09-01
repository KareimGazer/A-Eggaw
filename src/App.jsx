import { useState } from "react"
import Navbar from "./Navbar"
import Header from "./Header"
import SearchBar from "./Searchbar"
import CountryMap from "./CountryMap"


function App() {
  const [country, setCountry] = useState("Egypt")
  const [city, setCity] = useState('')

  return (
    <>
      <Navbar headline={"A-Eggaw"} />
      <main className="flex flex-col justify-center">
        <Header headline={"Choose Your Location"} />
        <SearchBar selectedCountry={country} selectedCity={city} setSelectedCity={setCity} setSelectedCountry={setCountry} />
        <CountryMap selectedCountry={country} />
      </main>
    </>
  )
}

export default App
