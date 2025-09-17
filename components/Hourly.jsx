import weatherIcons from "@/lib/weatherIcons";
import { useState } from "react"
export default function CurrentWeather({weatherData, isLoading}) {
    const timestamp =  weatherData.current.time
    const currentDate = new Date(timestamp)
    const formatted = currentDate.toISOString().split('T')[0]
    
    const [toggle, setToggle] = useState(false);
    const [date, setDate] = useState(formatted) 
    const getHourly = (date) => {
  const now = new Date();
  const currentHour = now.getHours();

  const filtered = weatherData.hourly.time
    .map((t, i) => ({
      time: t,
      temp: weatherData.hourly.temperature[i],
      weatherCode: weatherData.hourly.weatherCode[i],
    }))
    .filter((entry) => {
      const entryDate = new Date(entry.time);
      const isSameDay = entryDate.toISOString().startsWith(date);
      const isFutureHour = entryDate.getHours() >= currentHour;
      return isSameDay && isFutureHour;
    });

  return filtered.slice(0, 7); // next 7 hours starting from "now"
};

    if(!weatherData || !weatherData.daily){
        return (<h1>nothing </h1>)
    } 
    
    const handleToggle = ()=>{
        setToggle(!toggle)
    }
    return(
            
            <div>
                
                <div className='relative bg-[var(--neutral-700)] p-4 text-sm rounded-xl gap-2 flex flex-col sm:h-full md:h-full '>
                    {/* {weatherData.daily.time.map((day, index) => (
                    <div key={index} className='bg-[var(--neutral-700)] p-6 rounded-xl  flex flex-col items-center gap-4  sm:gap-1 sm:p-3  '>
                        <p>{new Date(day).toLocaleDateString('en-US', { weekday: 'long' })}</p>)
                        <div className='bg-[var(--neutral-600)] flex  justify-between items-center p-2 rounded-xl'>
                         <div className='flex flex-row gap-2 items-center'>
                             <img src="assets/images/icon-partly-cloudy.webp" alt="partly cloudy" width={30} height={30} />
                             <p>2pm</p>
                         </div>
                         <p>34°</p>
                     </div>
                    </div>
                    ))} */}
                    {toggle && 
                    <div className="absolute right-4 top-15 flex flex-col gap-2 bg-[var(--neutral-800)]  w-[40%] sm:w-[80%] md:w-[50%] cursor-pointer p-4 rounded-2xl"> 
                        {Array.from({ length: 7 }).map((_, i) => {
                          const dates = new Date();
                          dates.setDate(dates.getDate() + i); 
                          const weekday = dates.toLocaleDateString('en-US', { weekday: 'long' });
                          const formattedDate = dates.toISOString().split('T')[0];
                          return <p className={` rounded-xl ${date===formattedDate ? 'bg-[var(--neutral-700)] p-2': 'bg-transparent '}`} onClick={()=>{setDate(formattedDate)}} key={i}>{weekday}</p>;
                        })}

                        
                    </div>

                    }

                    <div className='flex justify-between items-center '>
                         <p className='text-xs'>Hourly Forecast</p>
                         <button onClick={handleToggle} className='flex py-2 cursor-pointer  hover:scale-110 text-xs px-4 bg-[var(--neutral-600)] rounded-xl gap-2 items-center'>
                            <p>{ new Date(date).toLocaleDateString('en-US', { weekday: 'long' })}</p>
                            <img src= 'assets/images/icon-dropdown.svg' alt="arrow down" width={10} height={10} />

                         </button>
                     </div>
                     {isLoading ? ( 
                        <div className="flex flex-col gap-2">
                            <div  className='bg-[var(--neutral-600)] rounded-xl h-12 w-full animate-pulse'></div>
                            <div  className='bg-[var(--neutral-600)] rounded-xl h-12 w-full animate-pulse'></div>
                            <div  className='bg-[var(--neutral-600)] rounded-xl h-12 w-full animate-pulse'></div>
                            <div  className='bg-[var(--neutral-600)] rounded-xl h-12 w-full animate-pulse'></div>
                            <div  className='bg-[var(--neutral-600)] rounded-xl h-12 w-full animate-pulse'></div>
                            <div  className='bg-[var(--neutral-600)] rounded-xl h-12 w-full animate-pulse'></div>
                            <div  className='bg-[var(--neutral-600)] rounded-xl h-12 w-full animate-pulse'></div>
                        </div>
                        ): 
                        (
                          getHourly(date).map((hourly, index)=>{
                            const code = hourly.weatherCode
                            const icon = weatherIcons[code]
                            return(<div key={index} className='bg-[var(--neutral-600)] flex  justify-between items-center p-2 rounded-xl'>
                                 <div className='flex flex-row gap-2 items-center'>
                                     <img src={icon} alt="partly cloudy" width={30} height={30} />
                                     <p >{new Date(hourly.time).toLocaleTimeString([], { hour: 'numeric', hour12: true })}
                                    </p>
                                 </div>
                                 <p>{hourly.temp}</p>
                             </div>
                        )
                        })  
                        )}
                     
                     
                     
                </div>
            </div>
    )
}

