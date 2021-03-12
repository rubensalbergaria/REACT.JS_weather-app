import './App.css';
import React, { useState} from "react";
import Axios from "axios";


function App() {

  const [city, setCity] = useState("")
  const [weatherData, setWeatherData] = useState(
    {
      description:'', 
      temp: 0,
      tem_min: 0,
      temp_max: 0,
      humidity: 0,
      sunrise: 0,
      sunset: 0,
      country: ''
    })
  const [dataLoaded, setDataLoaded] = useState(false)

  const searchWeather = () => {
    Axios.get(
      'http://api.openweathermap.org/data/2.5/weather?q=florianopolis&appid=cbd2b0c499cdbbdb95ce9d6468bea021'
      ).then((response) =>  {
        console.log(response.data.weather);
        setWeatherData({
          description: response.data.weather[0].description, 
          temp: response.data.main.temp, 
          temp_min: response.data.main.temp_min, 
          temp_max: response.data.main.temp_max,
          humidity: response.data.main.humidity,
          sunrise: response.data.sys.sunrise,
          sunset: response.data.sys.sunset,
          country: response.data.sys.country
        })
        setDataLoaded(true)
      }
    )}

  return (
    <div className="App">
      <h1>Current weather</h1>

      <div className="inputs">
        <input type="text"
          onChange={ (e) =>{
          setCity(e.target.value)
          console.log(city)
        }          
        }/>
        <button onClick={searchWeather}>Search</button>
      </div> 

      <div className="displayDataContainer">
        {dataLoaded && (
          <div className="data">
            <h3>Description: {weatherData.description}</h3>
            <h3>Temperature: {weatherData.temp}</h3>
            <h3>Minimum Temperature: {weatherData.temp_min}</h3>
            <h3>Maximum Temperature: {weatherData.temp_max}</h3>
            <h3>Humidity: {weatherData.humidity}</h3>
            <h3>Sunrise: {weatherData.sunrise}</h3>
            <h3>Sunset: {weatherData.sunset}</h3>
            <h3>Country: {weatherData.country}</h3>
          </div>
        )}
      </div>    
    </div>
  );
}

export default App;
