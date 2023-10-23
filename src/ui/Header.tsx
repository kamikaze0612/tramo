import { NavLink } from "react-router-dom";
import { IconContext } from "react-icons";
import { BiUser } from "react-icons/bi";

import logoImg from "../assets/logo.png";

function Header() {
  return (
    <header className="flex h-20 items-center justify-between bg-orange-500 px-6 md:px-8">
      <NavLink
        to="/contact"
        className="flex items-center px-4 font-semibold uppercase text-stone-50 transition-colors duration-300 hover:text-stone-700"
      >
        Contact
      </NavLink>
      <NavLink to="/">
        <img className="w-20 md:w-[120px]" src={logoImg} alt="" />
      </NavLink>
      <div className="flex h-full items-center justify-end">
        <NavLink
          className="px-4 font-semibold uppercase text-stone-50 transition-colors duration-300 hover:text-stone-700"
          to="/app"
        >
          App
        </NavLink>
        <NavLink to="/login" className="px-4">
          <IconContext.Provider
            value={{
              className:
                "w-6 h-6 transition-colors duration-300 hover:fill-stone-700",
              color: "white",
            }}
          >
            <BiUser style={{ width: "" }} />
          </IconContext.Provider>
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
