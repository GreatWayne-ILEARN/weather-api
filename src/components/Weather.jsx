import React, { useEffect, useRef, useState } from 'react'
import './Weather.css' 
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

const Weather = () => {

    const [WeatherData, setWeatherData] = useState(false);

    const inputRef = useRef();


    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon
    }

    const search = async (city) => {
        //IF SEARCH BAR IS EMPTY,notify user to enter city name  
        if(city === "") {
            alert("Enter City Name");
            return;
        }

        try {
            // Create a vairable containing the API
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_KEY}&units=metric`;
            
            const response = await fetch(url);
            const data = await response.json();
            if(!response.ok){
                alert(data.message);
                return;
            }
            // console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon 
            })

        } catch (error){
           setWeatherData(false)
           console.error("Error in Fetching Weather Data")
        }      
    }
    
    /*UseEffect seems to be giving error when i past it in suggestion is 
    i could fetch the data like that...
    */
    useEffect(() =>{
        // search();
        /* Was there any reason to use UseEffect? */
    },[])

  return (
    <>
        <div className='weather'>
            <div className='search-bar'>
                <input ref={inputRef} type="text" placeholder='Search' />
                <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
            </div>

            
            {/* Iternay operator to check if WeatherData is displayed */}
            {WeatherData?<>
                <img src={WeatherData.icon} alt="" className='weather-icon'/>
                <p className='temperature'>{WeatherData.temperature}°C</p>
                <p className='location'>{WeatherData.location}</p>

                {/* Weather data  */}
                <div className="weather-data">
                    <div className="col">
                        <img src={humidity_icon} alt="" />
                        <div>
                            <p>{WeatherData.humidity}</p>
                            <span>Humdity</span>
                        </div>
                    </div>
                    <div className="col">
                        <img src={wind_icon} alt="" />
                        <div>
                            <p>{WeatherData.windSpeed}</p>
                            <span>Wind Speed</span>
                        </div>
                    </div>
                </div>
            </>:<></>}
      
        </div>
    </>

  )
}

export default Weather
