import { useState } from "react"
import Navbar from "./Navbar"
import Header from "./Header"
import CountrySelector from "./CountrySelector"


function App() {
  const [country, setCountry] = useState("EG")

  return (
    <>
      <Navbar headline={"A-Eggaw"}/>
      <Header headline={"Choose Your Location"} />
      <CountrySelector selectedCountry={country} setSelectedCountry={setCountry} />
    </>
  )
}

export default App
