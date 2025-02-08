import { useContext, useState } from "react";
import fetchData from "../../utils/fetchData";
import { FlightQuoteData } from "../../utils/types";
import FlightQuoteUI from "../components/FlightQuoteUI";
import { ThemeContext } from "../providers/ThemeProvider";

export default function FlightEveryWhereDetails() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<FlightQuoteData | null>(null);
    const { isDark } = useContext(ThemeContext);
    const isDarkMode = isDark || JSON.parse(localStorage.getItem("theme") || "false");
    async function handleDataFetch() {
        try {
            const url = 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlightEverywhereDetails?oneWay=false&currency=USD';
            const response = await fetchData(url,setIsLoading,{
                "x-rapidapi-key": import.meta.env.VITE_X_RAPID_API_KEY,
                "x-rapidapi-host": import.meta.env.VITE_X_RAPID_API_HOST,
            });
            setData(response);
            console.log(response);
            
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <main
        className={`w-screen flex flex-col items-center justify-center min-h-screen bg-gradient-to-br ${
            isDarkMode
            ? "from-slate-900 via-slate-800 to-slate-700 text-white"
            : "from-slate-100 via-slate-200 to-slate-300 text-slate-800"
        } transition-colors duration-500 ease-in-out`}
        >
            <h1>Flight every where</h1>
            <button className="bg-emerald-500 text-white py-2 px-4 rounded hover:shadow shadow-emerald-300" 
                disabled={isLoading} 
                onClick={handleDataFetch}>
                Search Flights everywhere
            </button>
            {isLoading && <p>Loading...</p>}
            {data?.status && (
                <FlightQuoteUI data={data}/>
            )}
        </main>
    )
}
