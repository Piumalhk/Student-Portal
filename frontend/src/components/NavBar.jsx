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

      <header className="w-full flex justify-between items-center text-black h-18 bg-stone-100 drop-shadow-md fixed inset-x-0 top-0 z-50">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="w-45 h-18 self-center ps-14" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden xl:flex items-center gap-12 font-semibold text-base">
          <li className="p-3 hover:bg-sky-300 px-2 py-1.5 hover:text-white rounded-md transition-all cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="p-3 hover:bg-sky-300 px-2 py-1.5 hover:text-white rounded-md transition-all cursor-pointer">
            <Link to="/about">About Us</Link>
          </li>
          <li className="p-3 hover:bg-sky-300 px-2 py-1.5 hover:text-white rounded-md transition-all cursor-pointer">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        {/* Right-side Buttons (Desktop) */}
        <div className="hidden xl:flex items-center justify-center gap-3 pe-15">
          {!isLoggedIn ? (
            <Link
              to="/admin"
              className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-all"
            >
              Admin Login
            </Link>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="xl:hidden block text-5xl cursor-pointer bg-transparent border-none p-0 mr-4"
        >
          <img src={menu} alt="menu" />
        </button>
      </header>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="xl:hidden absolute left-0 right-0 top-16 bg-white shadow-lg z-50 transition-all duration-300">
          <ul className="flex flex-col items-center gap-4 py-4 font-semibold text-base">
            <li className="hover:bg-sky-300 px-4 py-2 w-full text-center hover:text-white rounded-md transition-all cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:bg-sky-300 px-4 py-2 w-full text-center hover:text-white rounded-md transition-all cursor-pointer">
              <Link to="/about">About Us</Link>
            </li>
            <li className="hover:bg-sky-300 px-4 py-2 w-full text-center hover:text-white rounded-md transition-all cursor-pointer">
              <Link to="/contact">Contact</Link>
            </li>

            {/* Conditional Button for Mobile */}
            {!isLoggedIn ? (
              <li className="w-4/5">
                <Link
                  to="/admin"
                  className="bg-gray-700 text-white px-4 py-2 w-full block text-center rounded-md hover:bg-gray-800 transition-all"
                >
                  Admin Login
                </Link>
              </li>
            ) : (
              <li className="w-4/5">
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 w-full block text-center rounded-md hover:bg-red-600 transition-all"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
