import Flight from "../assets/Flight Booking.svg";
import { CiSearch } from "react-icons/ci";
import { useContext, useState } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import fetchData from "../../utils/fetchData.ts";
import AirportUI from "../components/AirportCard.tsx";
import { ApiResponse } from "../../utils/types.ts";
import Loader from "../components/Loader.tsx";

export default function Flights() {
  const { isDark } = useContext(ThemeContext);
  const isDarkMode = isDark || JSON.parse(localStorage.getItem("theme") || "false");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [coords, setCoord] = useState<{ latitude: number; longitude: number } | null>(null);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [geoEnabled, setGeoEnabled] = useState<boolean>(false);
  navigator.geolocation.getCurrentPosition(success, error);

  function success(position: GeolocationPosition) {
    const { latitude, longitude } = position.coords;
    setCoord({ latitude, longitude });
    setGeoEnabled(true);
  }

  function error(error: GeolocationPositionError) {
    console.error(error);
    setGeoEnabled(false);
  }

  async function handleDataFetch() {
    if (geoEnabled && coords && Object.keys(coords).length > 0) {
      const response = await fetchData(
        `https://sky-scrapper.p.rapidapi.com/api/v1/flights/getNearByAirports?lat=${coords.latitude}&lng=${coords.longitude}&locale=en-US`,
        setIsLoading,
        {
          "x-rapidapi-key": import.meta.env.VITE_X_RAPID_API_KEY,
          "x-rapidapi-host": import.meta.env.VITE_X_RAPID_API_HOST,
        }
      );
      console.log(response);
      if (response.data) {
        setData(response);
      }
    }
  }

  return (
    <main
      className={`w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br ${
        isDarkMode
          ? "from-slate-900 via-slate-800 to-slate-700 text-white"
          : "from-slate-100 via-slate-200 to-slate-300 text-slate-800"
      } transition-colors duration-500 ease-in-out`}
    >
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Welcome to TravelPedia
        </h1>
        <p className="mt-4 text-lg md:text-xl text-slate-500 dark:text-slate-400">
          Your gateway to seamless travel experiences
        </p>
      </div>
      <img
        src={Flight}
        alt="Flight Booking"
        className="w-[clamp(250px,30%,400px)] aspect-square transform hover:scale-105 transition-transform duration-500 animate-float shadow-xl rounded-lg"
      />
      <section className="w-full max-w-4xl px-6 py-8 bg-white/10 dark:bg-slate-800/20 backdrop-blur-md rounded-2xl shadow-2xl animate-fade-in-up">
        <div className="flex justify-center items-center">
          <button
            disabled={isLoading || !geoEnabled}
            onClick={handleDataFetch}
            className={`flex items-center gap-3 px-8 py-3 text-lg font-semibold rounded-lg shadow-md transition-all duration-300 transform ${
              isLoading || !geoEnabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            }`}
          >
            {isLoading ? (
              <>
                <Loader isLoading />
                <span>Fetching...</span>
              </>
            ) : (
              <>
                <CiSearch className="text-2xl" />
                <span>Search Nearby Airports</span>
              </>
            )}
          </button>
        </div>
      </section>
      <section className="w-full flex justify-center items-center gap-2">
        {geoEnabled ? (
          data ? (
              <AirportUI response={data} />
          ) : (
            !isLoading && <p className="text-center text-lg text-slate-700 dark:text-slate-300">No nearby airports found.</p>
          )
        ) : (
          <p className="text-center text-red-500 text-2xl font-semibold mt-4">
            Geolocation is not enabled. Please enable it to find nearby airports.
          </p>
        )}
      </section>
      {isLoading && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <Loader isLoading />
        </div>
      )}
    </main>
  );
}
