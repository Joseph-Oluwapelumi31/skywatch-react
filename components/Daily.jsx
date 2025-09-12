export default function CurrentWeather({weatherData}) {
    if(!weatherData || !weatherData.daily){

        return <h1>hello</h1>
    }
    return (
        
        <div className='grid grid-cols-3 gap-4 md:grid-cols-7 sm:grid-cols-6 sm:gap-2 md:gap-4'>
                {weatherData.daily.time.map((day, index) => (
                    <div key={index} className='bg-[var(--neutral-700)] p-6 rounded-xl  flex flex-col items-center gap-4  sm:gap-1 sm:p-3  '>
                        <p>{new Date(day).toLocaleDateString('en-US', { weekday: 'long' })}</p>
                        <img src= 'assets/images/icon-partly-cloudy.webp' alt="partly cloudy" width={30} height={30} />
                        <div className='flex justify-between sm:text-sm '>
                            <p>{weatherData.daily.maxTemp[index]}°</p>  
                            <p>{weatherData.daily.minTemp[index]}°</p>
                        </div>
                    </div>
                ))}
                



            </div>
    )
}