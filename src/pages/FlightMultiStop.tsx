import  { useContext, useState } from 'react'
import { ThemeContext } from '../providers/ThemeProvider';
import fetchData from '../../utils/fetchData';
import { ApiResponseFiltered } from '../../utils/types';
import Loader from '../components/Loader';
import { FlightList } from '../components/FlightItinerary';
export default function FlightMultiStop() {
    const { isDark } = useContext(ThemeContext);
    const isDarkMode = isDark || JSON.parse(localStorage.getItem("theme") || "false");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<ApiResponseFiltered | null>(null);
    async function handleDataFetch() {
        try {
            const url = 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlightsMultiStops?legs=%22%5B%7B%5C%22origin%5C%22%3A%5C%22AMD%5C%22%2C%5C%22originEntityId%5C%22%3A%5C%2295673366%5C%22%2C%5C%22destination%5C%22%3A%5C%22STV%5C%22%2C%5C%22destinationEntityId%5C%22%3A%5C%22128667060%5C%22%2C%5C%22date%5C%22%3A%5C%222025-02-07%5C%22%7D%2C%7B%5C%22originEntityId%5C%22%3A%5C%22128667060%5C%22%2C%5C%22destination%5C%22%3A%5C%22BOM%5C%22%2C%5C%22destinationEntityId%5C%22%3A%5C%2295673320%5C%22%2C%5C%22origin%5C%22%3A%5C%22STV%5C%22%2C%5C%22date%5C%22%3A%5C%222025-02-12%5C%22%7D%5D%22&cabinClass=economy&adults=1&sortBy=best&currency=USD&countryCode=US&market=en-US'
            const response = await fetchData(url,setIsLoading,{
                "x-rapidapi-key": import.meta.env.VITE_X_RAPID_API_KEY,
                "x-rapidapi-host": import.meta.env.VITE_X_RAPID_API_HOST,
              });
            setData(response);
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
        <button className="bg-emerald-500 text-white py-2 px-4 rounded hover:shadow shadow-emerald-300" disabled={isLoading} onClick={handleDataFetch}>
            Fetch Multi Stop Flights
        </button>
        {isLoading && <Loader isLoading/>}
        {
            data &&(
                <img src={data?.data.destinationImageUrl} alt="" />
            )
        }
        {data && data.status && <FlightList data={data} />}
    </main>
  )
}
