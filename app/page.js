import Image from "next/image";
import Header from "@/components/Header";
import InputField from "@/components/InputField";
import "./globals.css";

export default function Home() {
  
  return(
    <div className="sm:h-screen w-full flex  justify-center items-center">
      <main className="  text-[var(--neutral-100)] font-[var(--font-dm-sans)] p-5 max-w-800 ">
        <Header />
        <InputField/>
      </main> 
    </div>

  )
}
