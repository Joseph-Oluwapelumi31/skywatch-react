'use client'
import Image from 'next/image'
import  {useState, useEffect} from 'react';
import CurrentWeather from './Currentweather';
import Daily from './Daily';
import Hourly from './Hourly';
export default function Content({ location,weatherData, isLoading}) {
    if(!weatherData || !weatherData.current){
        return <h1>No data found</h1>
    }
    
    return(
        <div className=' gap-4 sm:gap-4 grid sm:grid-cols-3 '> 
            <div className='sm:col-span-2'>
            <div className='flex flex-col  gap-6 '>
            {!isLoading ? (
            <div className='flex justify-between  items-center p-6 bg-cover bg-no-repeat  h-50 bg-center rounded-xl '
            style={{ backgroundImage: "url('/assets/images/bg-today-large.svg')" }  }
            >

                <div>
                    <h2>{location}</h2>
                    <p>{isLoading ? "_" : weatherData.current.time}</p>
                </div> 
                <div>
                    {/* <Image src= 'assets/images/icon-sunny.webp' alt="sunny" width={50} height={50} /> */}
                    <p>{isLoading ? "_" : weatherData.current.temperature}°C</p>
                    
                </div>
                
            </div>
            ):(
                <div className='flex flex-col justify-center gap-2 items-center p-6 bg-[var(--neutral-600)]  h-50  rounded-xl '>
                    <img src="assets/images/icon-loading.svg" alt="loaging image" />
                    <p>Loading...</p>

                
                </div>
            )}

            <CurrentWeather weatherData={weatherData} isLoading={isLoading} />
            <Daily weatherData={weatherData} isLoading={isLoading} />

            </div>
            </div>
            <Hourly weatherData={weatherData} isLoading={isLoading} />

        </div>
        
    )
}