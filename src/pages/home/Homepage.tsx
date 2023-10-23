import { Link } from "react-router-dom";

import Header from "../../ui/Header";

function Homepage() {
  return (
    <div>
      <Header />
      <main className="hero-img flex h-[calc(100vh-80px)] flex-col items-center justify-center text-stone-100">
        <h1 className="px-6 text-center text-2xl leading-snug md:text-[36px] md:font-medium md:leading-tight lg:text-[44px] xl:text-[52px]">
          You travel the world.
          <span className="block">Tramo keeps track of your adventures.</span>
        </h1>
        <p className="mt-6 px-8 text-center text-sm text-stone-300 md:mt-10 md:text-base lg:text-xl">
          Keep track of every city you've been to. Never forget your wonderful
          experiences.
        </p>
        <Link
          className="mt-8 rounded-md bg-orange-600 px-4 py-2 font-semibold text-white transition-colors duration-300 hover:bg-orange-700 focus:outline-none focus:ring focus:ring-orange-600 focus:ring-offset-2 md:mt-12 lg:px-6 lg:py-3 lg:text-xl"
          to="/app"
        >
          Let's go &rarr;
        </Link>
      </main>
    </div>
  );
}

export default Homepage;
