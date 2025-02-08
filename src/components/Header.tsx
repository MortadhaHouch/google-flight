import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import { FiSun } from "react-icons/fi";
import { IoMoon } from "react-icons/io5";
import Logo from "../icons/Logo";
import { NavLink, useLocation } from "react-router-dom";

export default function Header() {
    const { isDark, setIsDark } = useContext(ThemeContext);
    const path = useLocation();
    return (
        <header
            className={`w-screen flex flex-row justify-between items-center px-1 py-2 ${isDark||JSON.parse(localStorage.getItem("theme") as string || 'false') ? "bg-slate-900 text-white" : "bg-white text-gray-900"} backdrop-blur-md shadow-lg transition-all duration-500 ease-in-out`}>
            <div className="flex items-center">
                <Logo/>
                <h1 className="text-3xl font-extra bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    TravelPedia
                </h1>
            </div>
            <nav className="flex justify-center items-center gap-2">
                <ul className="flex flex-row justify-center items-center gap-2">
                    <li><NavLink className={`text-lg opacity-70 hover:opacity-100 transition-all ${path.pathname == '/flights' && 'opacity-100'}`} to="/flights">flights</NavLink></li>
                    <li><NavLink className={`text-lg opacity-70 hover:opacity-100 transition-all ${path.pathname == '/airports' && 'opacity-100'}`} to="/airports">airports</NavLink></li>
                </ul>
                <button
                    onClick={() => {
                        setIsDark((val)=>!val);
                        localStorage.setItem("theme", JSON.stringify(isDark));
                    }}
                    className="ml-4 p-3 rounded-full  hover:shadow-lg transition-all duration-300"
                >
                    {isDark ? (
                        <IoMoon className="text-gray-500 text-xl" />
                    ) : (
                        <FiSun className="text-gray-500 text-xl" />
                    )}
                </button>
            </nav>
        </header>
    );
}