'use client'
import Image from "next/image";
import { useState } from "react";
export default function Header( {unit, setUnit} ) {
  const [toggle, setToggle] = useState(false)
  const handleToggle = ()=>{
    setToggle(!toggle)
  }
  const changeUnit = ()=>{
    setUnit(unit === 'metric' ? 'imperial' : 'metric')
  }
  return (
    <header className="w-full relative  flex items-center justify-between">

        <Image
          src="/assets/images/logo.svg"
          alt="Skywatch Logo"
          width={124}
          height={50}
        />
        <button onClick={handleToggle} className= 'flex items-center  gap-2 bg-[var(--neutral-600)] hover:bg-[var(--neutral-700)] cursor-pointer text-[var(--neutral-100)]   px-4 py-2 rounded-lg '>
            <Image src="/assets/images/icon-units.svg" alt="Icon" width={24} height={24} />
            <span className="">Units</span>
            <Image className="" src="/assets/images/icon-dropdown.svg" alt="Icon" width={16} height={16} />
        </button>
        {toggle &&<div className="absolute sm:h-80 w-50 z-10 flex flex-col gap 2 p-3 top-15 right-4 bg-[var(--neutral-800)] rounded-2xl text-xs">
          <button onClick={changeUnit} className="bg-[var(--neutral-700)] text-sm p-2 rounded-2xl cursor-pointer" >Switch to {unit}</button>
            <div>
              <p>Temperature</p>
              <div className="flex justify-between  p-2 rounded-2xl"
              style={{
                backgroundColor: unit === "metric" ? "var(--neutral-700)" : "transparent"
              }}

              >
                <p>Celcius (oc)</p>
                {unit=== 'metric' &&<img src="assets/images/icon-checkmark.svg" alt="unit" />}
              </div>
              <div className= 'flex justify-between p-2 rounded-2xl '
              style={{
                backgroundColor: unit === "imperial" ? "var(--neutral-700)" : "transparent"
              }}

              >
                <p>Fahrenheit(oF)</p>
                {unit=== 'imperial' &&<img src="assets/images/icon-checkmark.svg" alt="unit" />}
              </div>
            </div>
            <hr className="my-2 border-[var(--neutral-300)]" />
            <div>
              <p>Wind</p>
              <div className="flex justify-between  p-2 rounded-2xl"
              style={{
                backgroundColor: unit === "metric" ? "var(--neutral-700)" : "transparent"
              }}
              >
                <p>km/h</p>
                {unit=== 'metric' &&<img src="assets/images/icon-checkmark.svg" alt="unit" />}
              </div>
              <div className= 'flex justify-between  p-2 rounded-2xl '
              style={{
                backgroundColor: unit === "imperial" ? "var(--neutral-700)" : "transparent"
              }}

              >
                <p>mph</p>
                {unit=== 'imperial' &&<img src="assets/images/icon-checkmark.svg" alt="unit" />}
              </div>
            </div> 
            <hr className="my-2 border-[var(--neutral-300)]" />
            <div>
              <p>Precipitation</p>
              <div className="flex justify-between bg-[var(--neutral-700)] p-2 rounded-2xl"
              style={{
                backgroundColor: unit === "metric" ? "var(--neutral-700)" : "transparent"
              }}
              >
                <p>Millimeters (mm)</p>
                {unit=== 'metric' &&<img src="assets/images/icon-checkmark.svg" alt="unit" />}
              </div>
              <div className= 'flex justify-between bg-[var(--neutral-700)] p-2 rounded-2xl '
              style={{
                backgroundColor: unit === "imperial" ? "var(--neutral-700)" : "transparent"
              }}

              >
                <p>Inches (in)</p>
                {unit=== 'imperial' &&<img src="assets/images/icon-checkmark.svg" alt="unit" />}
              </div>
            </div>               
        </div>}
      </header>
  );
}