import weatherIcons from "@/lib/weatherIcons"

export default function CurrentWeather({weatherData, isLoading}) {
    if(!weatherData || !weatherData.daily){

        return <h1>hello</h1>
    }
    return (
        
        <div className='grid grid-cols-3 gap-4 sm:flex sm:gap-4 sm:overflow-x-auto scrollbar-hide'>
                {isLoading ? (
                    <>
                        <div className="animate-pulse h-30 min-w-[100px] rounded-xl bg-[var(--neutral-700)]"></div>
                        <div className="animate-pulse h-30 min-w-[100px] rounded-xl bg-[var(--neutral-700)]"></div>
                        <div className="animate-pulse h-30 min-w-[100px] rounded-xl bg-[var(--neutral-700)]"></div>
                        <div className="animate-pulse h-30 min-w-[100px] rounded-xl bg-[var(--neutral-700)]"></div>
                        <div className="animate-pulse h-30 min-w-[100px] rounded-xl bg-[var(--neutral-700)]"></div>
                        <div className="animate-pulse h-30 min-w-[100px] rounded-xl bg-[var(--neutral-700)]"></div>
                        <div className="animate-pulse h-30 min-w-[100px] rounded-xl bg-[var(--neutral-700)]"></div>
                    </>
                ):(
                    weatherData.daily.time.map((day, index) => {
                    const code = weatherData.daily.weatherCode[index]
                    const icon = weatherIcons[code]
                    return(<div key={index} className='bg-[var(--neutral-700)] min-w-[100px] p-6 rounded-xl  flex flex-col items-center gap-4  sm:gap-1 sm:p-3  '>
                        <p>{new Date(day).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                        <img src={icon} alt="partly cloudy" width={30} height={30} />
                        <div className='flex justify-between gap-2 '>
                            <p>{weatherData.daily.maxTemp[index]}°</p>  
                            <p>{weatherData.daily.minTemp[index]}°</p>
                        </div>
                    </div>)
                })
                )}
                
                
                
                



            </div>
    )
}