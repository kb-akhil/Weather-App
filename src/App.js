import React, { useState } from "react";
import { useEffect } from "react";
 
function App() {
  const [city, setCity] = useState("Delhi");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
 
  const currentDate = new Date();
 
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
 
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
 
  const formattedDate = `${month} ${day}, ${year}`;
 
  const API_KEY = "bcda10ba323e88e96cb486015a104d1d";
 
  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      console.log(data)
      
      setWeatherData(data);
      
    } catch (error) {
      console.error("Error fetching weather data:", error);
      
    }
  };
 
  useEffect(()=>{
 
     
   
 
  fetchWeatherData();
 
  },[])
 
  const handleInputChange = (event) => {
    setCity(event.target.value);
  };
 
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };
 
  const getWeatherIconUrl = (main) => {
    switch (main) {
      case "Clouds":
        return "/assests/cloud.png";
      case "Rain":
        return "/assests/rain_with_cloud.png"; 
      case "Mist":
        return "/assests/Tornado.png"; 
      case "Haze":
        return "/assests/sun.png";
      case "Clear":
        return "/assests/sun.png";
      default:
        return "/rain_with_cloud.png";
    }
  };
 
 
  return (
    <div className="App">
       
 
      <div className="container">
        {weatherData && (
          <>
            <h1 className="container_date">{formattedDate}</h1>
            <div className="weather_data">
              <h2 className="container_city">{weatherData.name}</h2>
              {/* <img className="container_img" src="/thunder.png" width="180px" alt="sss"/> */}
              <img className="container_img" src={getWeatherIconUrl(weatherData.weather[0].main)} width="180px" alt="Weather Icon" />
              <h2 className="container_degree">{weatherData.main.temp}</h2>
              <h2 className="country_per">{weatherData.weather[0].main}<span className="degree_icon"></span></h2>
              <form className="form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  class="input"
                  placeholder="Enter city name"
                  value={city}
                  onChange={handleInputChange}
                  required
                />
                <button type="submit">Get</button>
              </form>
            </div>
          </>
        )}
 
 
      </div>
    </div>
  );
}
 
export default App;