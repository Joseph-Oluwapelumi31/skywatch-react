'use client'
import Image from "next/image"
export default function InputField ({location,handleSubmit, setLocation , error}){
    return(
        <div className= 'flex flex-col mt-4 mb-4 sm:justify-center items-center  '>
                <div className="sm:w-2/3 max-w-2xl flex flex-col gap-2  ">
                    <h1 className="text-4xl sm:text-3xl font-bold text-center my-4 md:my-8 ">How's the sky looking today?</h1>

                    <form action="" className= 'grid sm:grid-cols-4 gap-2 sm:max-w-xl sm:m-auto'>
                        <div className="relative w-full sm:col-span-3">
                            <Image  src="/assets/images/icon-search.svg" alt="Search Icon" width={15} height={15} className="absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none ml-2" />
                            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Search for a place..." className={`w-full  bg-[var(--neutral-600)] px-12 py-3.5 sm:py-2 rounded-lg outline-none ${error=== 'Cannot be empty' ? 'border-1 border-red-500 focus:border-red-600' : 'border-none'}`} />
                        </div>
                        <button type="submit" onClick= {(e) => handleSubmit(e) } className="bg-[var(--blue-500)] cursor-pointer active:bg-[var(--blue-700)] hover:bg-[var(--blue-700)] transition-colors duration-300 text-white rounded-lg py-3.5 sm:py-2 px-4  w-full ">Search</button>
                    </form>
                </div>

        </div>
    )
}
