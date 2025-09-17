'use client'
import Image from 'next/image'
import  {useState, useEffect} from 'react';
import CurrentWeather from './Currentweather';
import Daily from './Daily';
import Hourly from './Hourly';
import weatherIcons from '@/lib/weatherIcons';

export default function Content({ location,weatherData, isLoading}) {
    if(!weatherData || !weatherData.current){
        return <h1 className='text-center'>Search for a Location</h1>
    }
    const code = weatherData.current.weatherCode
    const specificIcon =weatherIcons[code]
    const timestamp =  weatherData.current.time
    const currentDate = new Date(timestamp)
    const formatted = currentDate.toISOString().split('T')[0]
    const options = {day: 'numeric', month: 'long', year:'numeric'};
    const otherdate = currentDate.toLocaleDateString('en-us', options)
    return(
        <div className=' gap-4 sm:gap-4 sm:text-xs grid sm:grid-cols-3 '> 
            <div className='sm:col-span-2'>
            <div className='flex flex-col  gap-6 '>
            {!isLoading ? (
            <div className='flex justify-between  items-center p-6 bg-cover bg-no-repeat  h-50 bg-center rounded-xl '
            style={{ backgroundImage: "url('/assets/images/bg-today-large.svg')" }  }
            >

                <div>
                    <h2 className='font-bold text-xl'>{location}</h2>
                    <p className=''>{otherdate}</p>
                </div> 
                <div className='sm:flex sm:gap-4 text-2xl font-bold sm:items-center'>
                    <img src={specificIcon} alt="sunny" width={50} height={50} />
                    <p>{isLoading ? "_" :  ` ${weatherData.current.temperature}${weatherData.current_units.temperature}` }</p>
                </div>
                
            </div>
            ):(
                <div className='flex flex-col justify-center gap-2 items-center p-6 bg-[var(--neutral-600)]  h-50  rounded-xl '>
                    <div className='flex space-x-2 justify-center items-center'>
                        <span className='w-2 h-2 bg-white rounded-full animate-bounce'></span>
                        <span className='w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></span>
                        <span className='w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.6s]'></span>
                    </div>
                    <p className='animate-pulse'>Loading...</p>

                
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