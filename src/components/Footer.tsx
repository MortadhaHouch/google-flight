import { useContext } from "react"; 
import { NavLink } from "react-router-dom"; 
import { ThemeContext } from "../providers/ThemeProvider"; 
import { FaFacebook } from "react-icons/fa"; 
import { FaSquareXTwitter } from "react-icons/fa6"; 
import { FaInstagram } from "react-icons/fa"; 

export default function Footer() {
  const { isDark } = useContext(ThemeContext);
  const themeClass = isDark || JSON.parse(localStorage.getItem("theme") || "false") 
    ? "bg-slate-800 text-white" 
    : "bg-slate-300 text-slate-800";

  return (
    <footer className={`w-full ${themeClass} p-6 mt-8`}>
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <p className="text-sm">&copy; 2023 Google</p>
          <NavLink to="#" className="text-md hover:underline">
            Privacy & Terms
          </NavLink>
          <NavLink to="#" className="text-md hover:underline">
            Contact Us
          </NavLink>
        </div>
        <div className="flex flex-row items-center gap-4">
          <NavLink to="#" className="text-md hover:underline">
            <FaFacebook />
          </NavLink>
          <NavLink to="#" className="text-md hover:underline">
            <FaSquareXTwitter />
          </NavLink>
          <NavLink to="#" className="text-md hover:underline">
            <FaInstagram />
          </NavLink>
        </div>
      </div>
    </footer>
  );
}
