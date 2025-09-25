import logo from "../assets/logo.png";
import menu from "../assets/menu-wide.png";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const { isLoggedIn, logout, isLoading } = useAuth();
  return (
    <div>
      {isLoading && <Loading />}
      <header className="w-full flex justify-between items-center text-black h-18 bg-stone-100  drop-shadow-md  absolute inset-x-0 top-0 ">
        <a href="#">
          <img src={logo} alt="" className="w-45 h-18 self-center ps-14" />
        </a>
        <ul className="hidden xl:flex items-center gap-12 font-semibold text-base ">
          <li className="p-3 hover:bg-sky-300 px-2 py-1.5 hover:text-white rounded-md transition-all cursor-pointer">
            Home
          </li>
          <li className="p-3 hover:bg-sky-300 px-2 py-1.5 hover:text-white rounded-md transition-all cursor-pointer">
            About Us
          </li>
          <li className="p-3 hover:bg-sky-300 px-2 py-1.5 hover:text-white rounded-md transition-all cursor-pointer">
            Contact
          </li>{" "}
        </ul>{" "}
        {!isLoggedIn && (
          <div className="hidden xl:flex items-center justify-center gap-3 pe-15">
            <Link
              to="/admin"
              className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-all"
            >
              Admin Login
            </Link>
          </div>
        )}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="xl:hidden block text-5xl cursor-pointer bg-transparent border-none p-0"
        >
          <img src={menu} alt="menu" />
        </button>
        {isLoggedIn && (
          <button
            onClick={logout}
            className="text-sm bg-red-500 text-white px-3 py-1 mr-5 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </header>
      {open && (
        <div className="xl:hidden absolute left-0 right-0 top-12 bg-white shadow-lg z-50 transition-all duration-300">
          <ul className="flex flex-col items-center gap-4 py-4 font-semibold text-base">
            <li className="hover:bg-sky-300 px-4 py-2 w-full text-center hover:text-white rounded-md transition-all cursor-pointer">
              Home
            </li>
            <li className="hover:bg-sky-300 px-4 py-2 w-full text-center hover:text-white rounded-md transition-all cursor-pointer">
              About Us
            </li>{" "}
            <li className="hover:bg-sky-300 px-4 py-2 w-full text-center hover:text-white rounded-md transition-all cursor-pointer">
              Contact
            </li>
            {!isLoggedIn && (
              <li className="w-4/5">
                <Link
                  to="/admin"
                  className="bg-gray-700 text-white px-4 py-2 w-full block text-center rounded-md hover:bg-gray-800 transition-all"
                >
                  Admin Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
