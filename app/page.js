import MainContent from "@/components/MainContent";
import "./globals.css";

export default function Home() {
  
  return(
    <div className="w-full flex justify-center ">
      <main className=" w-full  max-w-300 text-[var(--neutral-100)] font-[var(--font-dm-sans)] p-5   ">
        <MainContent/>
      </main> 
    </div>

  )
}
