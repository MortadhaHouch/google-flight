import { ThemeContext } from '../providers/ThemeProvider';
import { useContext, useState } from 'react'
import fetchData from '../../utils/fetchData';
import { FlightData } from '../../utils/types';
import FlightInfoUI from '../components/FlightInfoUI';

export default function PriceCalendar() {
  const { isDark } = useContext(ThemeContext);
  const isDarkMode = isDark || JSON.parse(localStorage.getItem("theme") || "false");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<FlightData|null>(null);

  async function handleDataFetch() {
      const response = await fetchData(
        'https://sky-scrapper.p.rapidapi.com/api/v1/flights/getPriceCalendar?originSkyId=BOM&destinationSkyId=JFK&fromDate=2024-02-20&currency=USD',
        setIsLoading,
        {
          "x-rapidapi-key": import.meta.env.VITE_X_RAPID_API_KEY,
          "x-rapidapi-host": import.meta.env.VITE_X_RAPID_API_HOST,
        }
      );
      console.log(response);
      if(response){
        setData(response)
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
            Fetch Price Calendar
        </button>
        <section>
            {isLoading && <div>Loading...</div>}
            {data?.status && (
              <div className='flex flex-col items-start justify-center gap-2'>
              <p>{data.data.flights.days.length} flights found</p>
              <p>{data.data.groups.length} groups found</p>
                <FlightInfoUI data={data}/>
              </div>
            )}
        </section>
    </main>
  )
}
