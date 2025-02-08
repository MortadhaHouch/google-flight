import React, { useState } from 'react';
import fetchData from '../../utils/fetchData';
import Loader from '../components/Loader';
import { ApiResponseFiltered } from '../../utils/types';
import { FlightList } from '../components/FlightItinerary';

function FlightFilter() {
  const [originSkyId, setOriginSkyId] = useState<string>('LOND');
  const [destinationSkyId, setDestinationSkyId] = useState<string>('NYCA');
  const [originEntityId, setOriginEntityId] = useState<string>('27544008');
  const [destinationEntityId, setDestinationEntityId] = useState<string>('27537542');
  const [date, setDate] = useState<string>('2024-07-01');
  const [cabinClass, setCabinClass] = useState<string>('economy');
  const [adults, setAdults] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>('best');
  const [currency, setCurrency] = useState<string>('USD');
  const [market, setMarket] = useState<string>('en-US');
  const [countryCode, setCountryCode] = useState<string>('US');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ApiResponseFiltered | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await fetchData(
        `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights?originSkyId=${originSkyId}&destinationSkyId=${destinationSkyId}&originEntityId=${originEntityId}&destinationEntityId=${27537542}&date=${date}&${cabinClass}=economy&adults=${adults}&sortBy=${sortBy}&currency=${currency}&market=${market}&countryCode=${countryCode}`,
        setIsLoading,
        {
          'x-rapidapi-key': import.meta.env.VITE_X_RAPID_API_KEY,
          'x-rapidapi-host': import.meta.env.VITE_X_RAPID_API_HOST,
        }
      );
      if (data.status) {
        setData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="w-full min-h-screen bg-gradient-to-br p-6">
      <form
        onSubmit={handleSubmit}
        className="w-[80%] mx-auto p-6 rounded-lg shadow-md bg-slate-600 space-y-4"
      >
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Origin Sky ID:</label>
          <input
            type="text"
            value={originSkyId}
            onChange={(e) => setOriginSkyId(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Destination Sky ID:</label>
          <input
            type="text"
            value={destinationSkyId}
            onChange={(e) => setDestinationSkyId(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Origin Entity ID:</label>
          <input
            type="text"
            value={originEntityId}
            onChange={(e) => setOriginEntityId(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Destination Entity ID:</label>
          <input
            type="text"
            value={destinationEntityId}
            onChange={(e) => setDestinationEntityId(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Departure Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Cabin Class:</label>
          <select
            value={cabinClass}
            onChange={(e) => setCabinClass(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="economy">Economy</option>
            <option value="business">Business</option>
            <option value="first">First</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Adults:</label>
          <input
            type="number"
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            min="1"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Sort By:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="best">Best</option>
            <option value="price">Price</option>
            <option value="duration">Duration</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Currency:</label>
          <input
            type="text"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Market:</label>
          <input
            type="text"
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Country Code:</label>
          <input
            type="text"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search Flights
        </button>
      </form>
      {isLoading && <Loader isLoading />}
      {data && data.status && <FlightList data={data} />}
    </main>
  );
}

export default FlightFilter;