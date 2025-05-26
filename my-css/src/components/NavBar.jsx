import logo from "../assets/logo.png";
import search from "../assets/search-big.png";
import menu from "../assets/menu-wide.png";
import { useState } from "react";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full h-full absolute bg-sky-200">
      <header className="flex justify-between items-center text-black h-12 bg-stone-100 md:px-32 drop-shadow-md ">
        <a href="#">
          <img src={logo} alt="" className="w-28 h-18 self-center" />
        </a>
        <ul className="hidden xl:flex items-center gap-12 font-semibold text-base pl-125">
          <li className="p-3 hover:bg-sky-300 px-2 py-1.5 hover:text-white rounded-md transition-all cursor-pointer">
            Home
          </li>
          <li className="p-3 hover:bg-sky-300 px-2 py-1.5 hover:text-white rounded-md transition-all cursor-pointer">
            About Us
          </li>
          <li className="p-3 hover:bg-sky-300 px-2 py-1.5 hover:text-white rounded-md transition-all cursor-pointer">
            Contact
          </li>
        </ul>

        <div className="relative hidden xl:flex items-center justify-center gap-3 ">
          <img
            src={search}
            alt="search"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search..."
            className="py-2 pl-10 rounded-xl border-2 border-blue-300 focus:bg-slate-100 focus:outline-sky-500 h-9  "
          ></input>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="xl:hidden block text-5xl cursor-pointer bg-transparent border-none p-0"
        >
          <img src={menu} alt="menu" />
        </button>
      </header>
      {open && (
        <div className="xl:hidden absolute left-0 right-0 top-12 bg-white shadow-lg z-50 transition-all duration-300" >
    
          <ul className="flex flex-col items-center gap-4 py-4 font-semibold text-base">
            <li className="hover:bg-sky-300 px-4 py-2 w-full text-center hover:text-white rounded-md transition-all cursor-pointer">
              Home
            </li>
            <li className="hover:bg-sky-300 px-4 py-2 w-full text-center hover:text-white rounded-md transition-all cursor-pointer">
              About Us
            </li>
            <li className="hover:bg-sky-300 px-4 py-2 w-full text-center hover:text-white rounded-md transition-all cursor-pointer">
              Contact
            </li>
            <div className="relative w-4/5">
              <img
                src={search}
                alt="search"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search..."
                className="py-2 pl-10 rounded-xl border-2 border-blue-300 focus:bg-slate-100 focus:outline-sky-500 h-9 w-full"
              />
            </div>
          </ul>
        </div>
      )}
    </div>
  );
}
