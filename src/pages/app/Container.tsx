import { ReactNode } from "react";
import { NavLink, Link } from "react-router-dom";

import logoImg from "../../assets/logo.png";
import Footer from "../../ui/Footer";

type ContainerProps = {
  children: ReactNode;
};

function Container({ children }: ContainerProps) {
  return (
    <div className="relative flex h-[45%] flex-col justify-between overflow-auto bg-orange-300 md:grid md:h-screen md:basis-[40%] md:grid-rows-[1fr_min-content] md:justify-normal lg:basis-[35%]">
      <header className="fixed left-0 top-0 z-50 w-full bg-orange-500 px-4 py-3 md:w-[40%] lg:w-[35%]">
        <Link to="/">
          <img src={logoImg} alt="Logo of Tramo" className="w-[80px]" />
        </Link>
      </header>
      <div className="flex flex-col items-center pt-20 ">
        <div className="country flex h-max w-max gap-1 rounded-full bg-orange-100 px-2 py-1 text-sm md:mx-auto md:mt-6 lg:px-3 lg:py-2">
          <NavLink
            to="cities"
            className={`cursor-pointer rounded-full px-2 py-1 font-medium lg:px-3 lg:text-base`}
          >
            Cities
          </NavLink>
          <NavLink
            to="countries"
            className={`cursor-pointer rounded-full px-2 py-1 font-medium lg:px-3 lg:text-base`}
          >
            Countries
          </NavLink>
        </div>
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Container;
