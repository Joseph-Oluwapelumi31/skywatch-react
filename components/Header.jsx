import Image from "next/image";
export default function Header() {
  return (
    <header className="w-full  flex items-center justify-between">

        <Image
          src="/assets/images/logo.svg"
          alt="Skywatch Logo"
          width={124}
          height={50}
        />
        <button className= 'flex items-center  gap-2 bg-[var(--neutral-600)] hover:bg-[var(--neutral-700)] text-[var(--neutral-100)]  text-sm  px-4 py-2 rounded-lg'>
            <Image src="/assets/images/icon-units.svg" alt="Icon" width={24} height={24} />
            <span className="">Units</span>
            <Image src="/assets/images/icon-dropdown.svg" alt="Icon" width={16} height={16} />
        </button>
      </header>
  );
}