import Image from "next/image";
import { mainNavigation } from "@/data/navigation";

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-[clamp(6px,2vw,32px)] py-[clamp(8px,1.2vw,16px)]">
      <div className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-[clamp(4px,1vw,16px)]">
        <a href="#home" className="relative z-50 shrink-0">
          <Image
            src="/images/logo/logo-lifetopia-world.png"
            alt="Lifetopia World"
            width={120}
            height={56}
            priority
            className="h-auto w-[clamp(46px,8vw,144px)]"
          />
        </a>

        <nav className="mx-auto flex items-center gap-[clamp(1px,0.25vw,4px)] rounded-full border border-white/70 bg-white/60 px-[clamp(3px,0.65vw,8px)] py-[clamp(3px,0.65vw,8px)] shadow-[0_16px_45px_rgba(88,60,28,0.16)] backdrop-blur-xl">
          {mainNavigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative overflow-hidden rounded-full px-[clamp(5px,1.15vw,20px)] py-[clamp(5px,0.75vw,12px)] text-[clamp(7px,0.9vw,14px)] font-black text-[#3a2a1d] transition-all duration-300 hover:-translate-y-0.5 hover:text-[#4f8124]"
            >
              <span className="absolute inset-0 scale-75 rounded-full bg-[#edf7df] opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
              <span className="absolute bottom-1 left-1/2 h-[clamp(2px,0.25vw,4px)] w-0 -translate-x-1/2 rounded-full bg-[#6fa83a] transition-all duration-300 group-hover:w-[clamp(10px,1.6vw,24px)]" />
              <span className="relative z-10">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-[clamp(4px,0.8vw,12px)]">
          <a
            href="/login"
            className="group relative overflow-hidden rounded-full border border-white/70 bg-white/75 px-[clamp(7px,1.15vw,20px)] py-[clamp(5px,0.75vw,12px)] text-[clamp(7px,0.9vw,14px)] font-black text-[#3a2a1d] shadow-[0_12px_30px_rgba(88,60,28,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-[#4f8124]"
          >
            <span className="absolute inset-0 translate-x-[-110%] bg-gradient-to-r from-transparent via-white/80 to-transparent transition-transform duration-700 group-hover:translate-x-[110%]" />
            <span className="relative z-10">Login</span>
          </a>

          <a
            href="/register"
            className="lt-button-primary px-[clamp(7px,1.15vw,20px)] py-[clamp(5px,0.75vw,12px)] text-[clamp(7px,0.9vw,14px)]"
          >
            Register
          </a>
        </div>
      </div>
    </header>
  );
}
