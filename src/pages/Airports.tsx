import  { useContext, useState } from 'react'
import { ThemeContext } from '../providers/ThemeProvider';
import fetchData from '../../utils/fetchData';
import { CiSearch } from 'react-icons/ci';
import {Container, Switch, TextField} from "@mui/material"
import { ApiResponseList } from '../../utils/types';
import { AirportUIWithList } from '../components/AirportWithList';
export default function Airports() {
  const { isDark } = useContext(ThemeContext);
  const isDarkMode = isDark || JSON.parse(localStorage.getItem("theme") || "false");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<ApiResponseList|null>(null);
  const [searchTerm,setSearchTerm] = useState<string>('')
  const [searchEnabled,setSearchEnabled] = useState<boolean>(false)

  async function handleDataFetch() {
    const response = await fetchData(
      `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${searchTerm.length > 0 ? searchTerm :'new'}&locale=en-US`,
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
        <Container className='flex flex-row justify-center items-center gap-2 w-full'>
            <button
                disabled={isLoading }
                onClick={handleDataFetch}
                className={`bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg px-6 py-3 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex flex-row justify-center items-center gap-2 shadow-lg hover:shadow-xl text-white font-semibold cursor-pointer ${(isLoading)?'disabled:opacity-50 cursor-not-allowed':''}`}
              >
                <CiSearch className="text-xl" />
                <span>{searchTerm.length == 0?'search new':'Search Flights'}</span>
            </button>
            <div className='flex flex-row justify-center items-center gap-1 relative'>
              <TextField
                label="Where"
                variant="outlined"
                value={searchTerm}
                disabled={!searchEnabled}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/80 dark:bg-slate-700/80 rounded-lg"
              />
              <Switch name='checked' className='absolute right-1' checked={searchEnabled} onChange={(e)=>setSearchEnabled(e.target.checked)}/>
            </div>
        </Container>
        {data && (
          <AirportUIWithList response={data} />
        )}
    </main>
  )
}
