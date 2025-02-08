import { useContext, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { GoSidebarCollapse,GoSidebarExpand } from "react-icons/go";
import { ThemeContext } from '../providers/ThemeProvider';
export default function Search() {
    const [isShown,setIsShown] = useState(false)
    const location = useLocation()
    const { isDark } = useContext(ThemeContext);
    const isDarkMode = isDark || JSON.parse(localStorage.getItem("theme") || "false");
    console.log(location.pathname);
  return (
    <main
      className={`w-screen flex flex-col items-center justify-center min-h-screen bg-gradient-to-br ${
        isDarkMode
          ? "from-slate-900 via-slate-800 to-slate-700 text-white"
          : "from-slate-100 via-slate-200 to-slate-300 text-slate-800"
      } transition-colors duration-500 ease-in-out`}
    >
        <aside className={`fixed top-0 left-0 h-screen bg-slate-500 text-light z-20 pt-26 w-[200px] ${isShown ? 'translate-x-0' : '-translate-x-[200px]'}`}>
            <button className='absolute bottom-16 left-full p-2 bg-slate-300 backdrop-blur-md rounded-md' onClick={() => setIsShown(val=>!val)}>
                {
                    isShown?(
                        <GoSidebarExpand className='text-slate-400 text-2xl'/>
                    ):(
                        <GoSidebarCollapse className='text-slate-400 text-2xl'/>
                    )
                }
            </button>
            <ul className='w-full flex flex-col gap-2 px-2'>
                <li className={`w-full p-1 rounded-md ${location.pathname == '/search/airports'?'bg-slate-400':'bg-slate-600'}`}><NavLink className={"w-full"} to="airports">search airports</NavLink></li>
                <li className={`w-full p-1 rounded-md ${location.pathname == '/search/flights'?'bg-slate-400':'bg-slate-600'}`}><NavLink className={"w-full"} to="flights">search flights</NavLink></li>
                <li className={`w-full p-1 rounded-md ${location.pathname == '/search/flights-filter'?'bg-slate-400':'bg-slate-600'}`}><NavLink className={"w-full"} to="flights-filter">flights filter</NavLink></li>
                <li className={`w-full p-1 rounded-md ${location.pathname == '/search/flights-details'?'bg-slate-400':'bg-slate-600'}`}><NavLink className={"w-full"} to="flights-details"> flight details</NavLink></li>
                <li className={`w-full p-1 rounded-md ${location.pathname == '/search/price-calendar'?'bg-slate-400':'bg-slate-600'}`}><NavLink className={"w-full"} to="price-calendar">price calendar</NavLink></li>
                <li className={`w-full p-1 rounded-md ${location.pathname == '/search/flights-multi-stop'?'bg-slate-400':'bg-slate-600'}`}><NavLink className={"w-full"} to="flights-multi-stop">flights multi stop</NavLink></li>
                <li className={`w-full p-1 rounded-md ${location.pathname == '/search/flights-everywhere'?'bg-slate-400':'bg-slate-600'}`}><NavLink className={"w-full"} to="flights-everywhere">flights everywhere</NavLink></li>
            </ul>
        </aside>
        <Outlet/>
    </main>
  )
}
