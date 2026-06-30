import Image from "next/image";

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden rounded-b-[36px]">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/LT-011-hero-village.png"
          alt="Lifetopia World village"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/75 via-white/28 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#fff7e8] to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl flex-col justify-center px-6 pb-28 pt-32 md:min-h-[760px] md:px-12">
        <div className="max-w-2xl">
          <div className="lt-badge mb-5 px-5 py-2 text-sm">
            Welcome to Lifetopia World 🍃
          </div>

          <h1 className="lt-title text-5xl leading-[1.03] md:text-7xl">
            A Peaceful Life,
            <br />
            In <span className="text-[#5f8f2f]">Your Own World</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg font-medium leading-8 text-[#4c392b] md:text-xl">
            Farm, fish, craft, build, and make friends. Live your dream in a
            world full of kindness and endless possibilities.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="lt-button-primary px-8 py-4 text-lg">
              Play Game 🍃
            </button>
            <button className="lt-button-secondary px-8 py-4 text-lg">
              Watch Trailer ▶
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}