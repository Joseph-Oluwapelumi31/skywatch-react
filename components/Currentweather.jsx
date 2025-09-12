export default function CurrentWeather({weatherData, isLoading}) {

    
    if(!weatherData || !weatherData.current){
        return (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className='text-white flex flex-col p-6 sm:p-4  bg-[var(--neutral-600)] gap-4 sm:gap-2 rounded-xl'>
                    <p className='text-sm'>Feels Like</p>
                    <p className='text-xl'>-</p>
                </div>
                <div className='text-white  flex flex-col p-6 sm:p-4  bg-[var(--neutral-600)] gap-4 sm:gap-2 rounded-xl'>
                    <p className='text-sm'>Humidity</p>
                    <p className='text-xl'>-</p>
                </div>
                <div className='text-white  flex flex-col p-6 sm:p-4  bg-[var(--neutral-600)] gap-4 sm:gap-2 rounded-xl'>
                    <p className='text-sm'>Wind Speed</p>
                    <p className='text-xl'>-</p>
                </div>
                <div className='text-white  flex flex-col p-6 sm:p-4  bg-[var(--neutral-600)] gap-4 sm:gap-2 rounded-xl'>
                    <p className='text-sm'>Precipitation</p>
                    <p className='text-xl'>-</p>
                </div>

            </div>
        )
    }
    const temperature = isLoading ? "_" : weatherData.current.temperature;
    const humidity = isLoading ? "_" : weatherData.current.humidity;
    const wind = isLoading ? "_" : weatherData.current.wind;
    const precipitation = isLoading ? "_" : weatherData.current.precipitation;
    
    return (
        
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className='text-white flex flex-col p-6 sm:p-4  bg-[var(--neutral-600)] gap-4 sm:gap-2 rounded-xl'>
                    <p className='text-sm'>Feels Like</p>
                    <p className='text-xl'>{temperature}</p>
                </div>
                <div className='text-white  flex flex-col p-6 sm:p-4  bg-[var(--neutral-600)] gap-4 sm:gap-2 rounded-xl'>
                    <p className='text-sm'>Humidity</p>
                    <p className='text-xl'>{humidity} </p>
                </div>
                <div className='text-white  flex flex-col p-6 sm:p-4  bg-[var(--neutral-600)] gap-4 sm:gap-2 rounded-xl'>
                    <p className='text-sm'>Wind Speed</p>
                    <p className='text-xl'>{wind} </p>
                </div>
                <div className='text-white  flex flex-col p-6 sm:p-4  bg-[var(--neutral-600)] gap-4 sm:gap-2 rounded-xl'>
                    <p className='text-sm'>Precipitation</p>
                    <p className='text-xl'>{precipitation}</p>
                </div>

        </div>
    );
    
}