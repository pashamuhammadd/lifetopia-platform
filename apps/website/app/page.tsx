import Image from "next/image";

const gameplayIcons = [
  {
    title: "Farm & Harvest",
    desc: "Grow crops and harvest with care",
    image: "/images/icons/gameplay/LT-001-farm-harvest.png",
  },
  {
    title: "Fish & Explore",
    desc: "Discover rivers, lakes, and the ocean",
    image: "/images/icons/gameplay/LT-002-fish-explore.png",
  },
  {
    title: "Craft & Create",
    desc: "Make items and tools with your hands",
    image: "/images/icons/gameplay/LT-003-craft-create.png",
  },
  {
    title: "Build & Decorate",
    desc: "Design your home and village",
    image: "/images/icons/gameplay/LT-004-build-decorate.png",
  },
  {
    title: "Play Together",
    desc: "Meet friends and create memories",
    image: "/images/icons/gameplay/LT-005-play-together.png",
  },
];

const locations = [
  {
    title: "Greenleaf Village",
    desc: "A cozy village full of kind people.",
    image: "/images/hero/hero-village.png",
  },
  {
    title: "Sunshine Farm",
    desc: "The heart of farming and daily life.",
    image: "/images/hero/hero-village.png",
  },
  {
    title: "Crystal Lake",
    desc: "Clear waters, fresh air, and peaceful moments.",
    image: "/images/hero/hero-village.png",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen pb-24">
      <section className="relative overflow-hidden rounded-b-[36px]">
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

        <nav className="relative z-10 flex items-center justify-between px-5 py-5 md:px-12">
          <Image
            src="/images/logo/logo-lifetopia-world.png"
            alt="Lifetopia World"
            width={170}
            height={80}
            className="h-auto w-32 md:w-44"
          />

          <div className="hidden rounded-full bg-white/70 px-5 py-3 shadow-lg backdrop-blur md:flex md:gap-8">
            {["Home", "World", "Game", "Community", "Marketplace", "News"].map(
              (item) => (
                <a key={item} href="#" className="text-sm font-bold">
                  {item}
                </a>
              ),
            )}
          </div>

          <button className="rounded-full bg-white/80 px-4 py-3 text-2xl font-bold shadow-lg md:hidden">
            ☰
          </button>

          <button className="lifetopia-button hidden rounded-full px-7 py-4 font-bold md:block">
            ▶ Play Now 🍃
          </button>
        </nav>

        <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl flex-col justify-center px-6 pb-28 pt-12 md:min-h-[760px] md:px-12">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex rounded-full bg-[#fff7e8]/85 px-5 py-2 text-sm font-bold text-[#5f8f2f] shadow">
              Welcome to Lifetopia World 🍃
            </div>

            <h1 className="text-5xl font-black leading-[1.03] tracking-tight text-[#3a2315] md:text-7xl">
              A Peaceful Life,
              <br />
              In <span className="text-[#5f8f2f]">Your Own World</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg font-medium leading-8 text-[#4c392b] md:text-xl">
              Farm, fish, craft, build, and make friends. Live your dream in a
              world full of kindness and endless possibilities.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="lifetopia-button rounded-full px-8 py-4 text-lg font-black">
                Play Game 🍃
              </button>
              <button className="rounded-full bg-white/90 px-8 py-4 text-lg font-black text-[#3a2315] shadow-lg">
                Watch Trailer ▶
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 mx-auto -mt-20 max-w-6xl px-4">
        <div className="lifetopia-card grid grid-cols-2 gap-3 rounded-[28px] p-4 md:grid-cols-5 md:p-5">
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

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-black">Explore Lifetopia 🍃</h2>
            <p className="mt-2 text-[#6b5b4a]">
              Every corner of Lifetopia has its own charm. Where will your
              journey take you?
            </p>
          </div>

          <button className="hidden rounded-full border border-[#d8c59f] bg-white/70 px-6 py-3 font-bold text-[#5f8f2f] md:block">
            View All
          </button>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-4">
          {locations.map((item) => (
            <article
              key={item.title}
              className="lifetopia-card min-w-[260px] overflow-hidden rounded-[24px]"
            >
              <div className="relative h-40">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="font-black">{item.title} 🍃</h3>
                <p className="mt-2 text-sm leading-6 text-[#6b5b4a]">
                  {item.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5">
        <div className="lifetopia-card rounded-[28px] p-6">
          <div className="flex items-center gap-4">
            <Image
              src="/images/logo/logo-lifetopia-world.png"
              alt="Lifetopia"
              width={90}
              height={90}
              className="rounded-full"
            />
            <div>
              <h2 className="text-2xl font-black">Good Day, Lifetopian! 🍃</h2>
              <p className="mt-1 font-bold">Level 24</p>
            </div>
          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#e7d8b8]">
            <div className="h-full w-[68%] rounded-full bg-[#5f8f2f]" />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {["My Account", "Inventory", "Quests", "Map"].map((item) => (
              <button
                key={item}
                className="rounded-2xl border border-[#e7d8b8] bg-white/70 px-4 py-5 font-black shadow-sm"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="lifetopia-card overflow-hidden rounded-[28px] p-6 md:flex md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-black">A Community Like Home 🌳</h2>
            <p className="mt-3 max-w-xl text-[#6b5b4a]">
              Join thousands of Lifetopians around the world. Share moments,
              help each other, and grow together.
            </p>
          </div>
          <button className="lifetopia-button mt-6 rounded-full px-8 py-4 font-black md:mt-0">
            Join Community 🍃
          </button>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 p-4 md:hidden">
        <button className="lifetopia-button w-full rounded-full py-4 text-lg font-black">
          ▶ Play Now 🍃
        </button>
      </div>
    </main>
  );
}