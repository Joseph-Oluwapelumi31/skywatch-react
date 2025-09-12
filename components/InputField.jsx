'use client'
import Image from 'next/image'
import { useState , useEffect} from 'react';
import Content from './Content';
export default function InputField() {
    const [longitude, setLongitude] = useState('Nigeria');
    const [latitude, setLatitude] = useState('');
    const [location, setLocation] = useState('');
    const [weather, setWeather] = useState({
        current: null,
        hourly: null,
        daily: null
    });

    const [unit, setUnit] = useState("metric"); // or "imperial"

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    async function getCoords(location) {
        try {
            setLoading(true)   
            const geoName = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=10&language=en&format=json`);
            const geoNameData = await geoName.json();
            if (geoNameData.length === 0) {
                setError('Location not found');
            }
            setLatitude(geoNameData.results[0].latitude);
            setLongitude(geoNameData.results[0].longitude);
            const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${geoNameData.results[0].latitude}&longitude=${geoNameData.results[0].longitude}&daily=temperature_2m_min,temperature_2m_max&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation_probability&current=temperature_2m,wind_speed_10m,relative_humidity_2m,precipitation&timezone=auto`);
            const data = await response.json(); 
            setWeather({
            current: {
              time: data.current.time ,
              temperature: data.current.temperature_2m,
              wind: data.current.wind_speed_10m,
              humidity: data.current.relative_humidity_2m,
              precipitation: data.current.precipitation
            },
            
            hourly: {
              time: data.hourly.time,
              temperature: data.hourly.temperature_2m,
               
            },

            daily: {
              time: data.daily.time,
              minTemp: data.daily.temperature_2m_min,
              maxTemp: data.daily.temperature_2m_max
            }
      })
    } catch (error) {
            setError('Error fetching weather data');
        }
        finally{
        setLoading(false)
    }
    }

    
    const handleSubmit = (e) => {
        e.preventDefault();
        getCoords(location);
    }
    
    console.log(location);
    console.log(longitude);
    console.log(latitude);
    // if(!weather){
    //     return <h1>No</h1>;
    // }

    return(
        <>
        <div className= 'flex flex-col mt-4 mb-4 sm:justify-center items-center  '>
            <div className="sm:w-2/3 max-w-2xl flex flex-col gap-2  ">
                <h1 className="text-5xl sm:text-2xl font-bold text-center ">How's the sky looking today?</h1>
               
                <form action="" className= 'grid sm:grid-cols-4 gap-2'>
                    <div className="relative w-full sm:col-span-3">
                        <Image src="/assets/images/icon-search.svg" alt="Search Icon" width={15} height={15} className="absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none ml-2" />
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Search for a place..." className="w-full  bg-[var(--neutral-600)] px-12 py-3.5 sm:py-2 rounded-lg " />
                    </div>
                    <button type="submit" onClick= {(e) => handleSubmit(e) } className="bg-blue-500 text-white rounded-lg py-3.5 sm:py-2 px-4  w-full ">Search</button>
                </form>
            </div>
            
        </div>
        { weather &&<Content location={location} weatherData={weather} isLoading={loading} />}
        </>
    )
}