import logo from "../assets/logo.png";

export default function NavBar() {
  return (
    <div className="w-full h-full absolute bg-sky-200">
      <header className="flex justify-between items-center text-black h-12 bg-stone-100 md:px-32 drop-shadow-md ">
        <a href="#">
          <img src={logo} alt="" className="w-28 h-18 self-center" />
        </a>
        <ul className="hidden xl:flex items-center gap-12 font-semibold text-base">
          <li className="p-3 hover:bg-sky-300 px-2 py-1.5 hover:text-white rounded-md transition-all cursor-pointer">Home</li>
          <li className="p-3 hover:bg-sky-300 px-2 py-1.5 hover:text-white rounded-md transition-all cursor-pointer">About Us</li>
          <li className="p-3 hover:bg-sky-300 px-2 py-1.5 hover:text-white rounded-md transition-all cursor-pointer">Contact</li>
        </ul>

        <div className="relative hidden md:flex items-center justify-center gap-3"></div>
      </header>
    </div>
  );
}
