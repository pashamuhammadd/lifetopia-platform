import Image from "next/image";
import { gameplayIcons } from "@/data/homepage";

export function GameplaySection() {
  return (
    <section id="features" className="relative z-20 mx-auto -mt-20 max-w-6xl px-4">
      <div className="lt-card grid grid-cols-2 gap-3 p-4 md:grid-cols-5 md:p-5">
        {gameplayIcons.slice(0, 5).map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-center rounded-3xl p-3 text-center md:flex-row md:text-left"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={72}
              height={72}
              className="h-16 w-16 object-contain"
            />
            <div className="mt-2 md:ml-3 md:mt-0">
              <h3 className="font-black">{item.title}</h3>
              <p className="hidden text-xs leading-5 text-[#6b5b4a] md:block">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}