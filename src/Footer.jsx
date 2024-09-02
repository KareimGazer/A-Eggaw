const Footer = () => {
    return (
        <footer className="flex flex-col justify-center p-4 bg-base-300 text-base-content bg-gradient-to-b from-cyan-600">
            <div className="grid grid-flow-col gap-4">
                <div className="flex flex-col font-dancing text-4xl text-cyan-300">
                    <h2>Kareim Tarek</h2>
                    <p>AI Artist</p>
                </div>
            </div>
            <div className="text-cyan-700 text-center mt-8">
                <p>Copyright © 2024 - All right reserved by <span className="font-bold font-dancing text-lg"> Kareim </span></p>
                <p>Powered by <a href="https://www.worldweatheronline.com/weather-api/" target="_blank" rel="noopener noreferrer">World Weather API</a></p>
            </div>
        </footer>
    )
}

export default Footer