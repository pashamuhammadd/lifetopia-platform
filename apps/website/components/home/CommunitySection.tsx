export function CommunitySection() {
  return (
    <section id="community" className="mx-auto max-w-6xl px-5 py-12">
      <div className="lt-card overflow-hidden p-6 md:flex md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-black">A Community Like Home 🌳</h2>
          <p className="mt-3 max-w-xl text-[#6b5b4a]">
            Join thousands of Lifetopians around the world. Share moments, help
            each other, and grow together.
          </p>
        </div>

        <button className="lt-button-primary mt-6 px-8 py-4 md:mt-0">
          Join Community 🍃
        </button>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 p-4 md:hidden">
        <button className="lt-button-primary w-full py-4 text-lg">
          ▶ Play Now 🍃
        </button>
      </div>
    </section>
  );
}