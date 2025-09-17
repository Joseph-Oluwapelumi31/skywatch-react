'use client'
import Image from 'next/image'
import { useState , useEffect} from 'react';
import Content from './Content';
import Header from './Header';
import InputField from './InputField';
export default function MainContent() {
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [location, setLocation] = useState('Nigeria');
    const [weather, setWeather] = useState({
        current: null,
        current_units: null,
        daily_units: null,
        hourly_units: null,
        hourly: null,
        daily: null
    });

    const [unit, setUnit] = useState("metric"); // or "imperial"
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    async function getCoords(location) {
        try {
            setLoading(true)
            setError('')   
            const geoName = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=10&language=en&format=json`);
            if (!geoName.ok) {
                throw new Error(`Geocoding API error: ${geoRes.status}`);
            }
            const geoNameData = await geoName.json();
            if (!geoNameData.results || geoNameData.results.length === 0) {
                throw new Error("Location not found");
            }


            setLatitude(geoNameData.results[0].latitude);
            setLongitude(geoNameData.results[0].longitude);
            let response;
            if(unit === 'metric'){
                response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${geoNameData.results[0].latitude}&longitude=${geoNameData.results[0].longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,precipitation&timezone=auto`);
            }
            else if(unit === 'imperial'){
                response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${geoNameData.results[0].latitude}&longitude=${geoNameData.results[0].longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code&hourly=temperature_2m,weather_code&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,precipitation&timezone=auto&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`)
            }
             if (!response.ok) {
                throw new Error(`Weather API failed (${response.status})`);
            }
            const data = await response.json(); 
            setWeather({
            current: {
              time: data.current.time ,
              temperature: data.current.temperature_2m,
              wind: data.current.wind_speed_10m,
              humidity: data.current.relative_humidity_2m,
              precipitation: data.current.precipitation,
              weatherCode: data.current.weather_code
            },
            current_units:{
                temperature: data.current_units.temperature_2m,
                humidity: data.current_units.relative_humidity_2m,
                wind: data.current_units.wind_speed_10m,
                precipitation: data.current_units.precipitation
            },
            hourly_units:{
                temperature: data.hourly_units.temperature_2m,
                humidity: data.hourly_units.relative_humidity_2m,
                
            },
            daily_units:{
                maxTemp: data.daily_units.temperature_2m_max,
                minTemp: data.daily_units.temperature_2m_min
            },
            hourly: {
              time: data.hourly.time,
              temperature: data.hourly.temperature_2m,
              weatherCode: data.hourly.weather_code
            },

            daily: {
              time: data.daily.time,
              minTemp: data.daily.temperature_2m_min,
              maxTemp: data.daily.temperature_2m_max,
              weatherCode: data.daily.weather_code
            }
      })
    } catch (error) {
            setError(error.message);
        }
        finally{
        setLoading('')
    }
    }

    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!location){
            setError('Cannot be empty')
        }else{
        getCoords(location);

        }
    }
    useEffect(()=>{
        getCoords(location)
    },[unit])
    console.log(location);
    console.log(longitude);
    console.log(latitude);
    // if(!weather){
    //     return <h1>No</h1>;
    // }

    return(
        <>
            <Header  weatherData={weather} unit={unit} setUnit={setUnit}/>
            <InputField location={location} error={error} setLocation={setLocation} handleSubmit={handleSubmit}/>
            {error ? (
            <p className='text-center'>{error}</p>
            ) : weather ? (
                <Content location={location}  weatherData={weather} isLoading={loading} />
            ): null
            }
            
        
        
        </>
    )
}