import { FlightQuoteData } from '../../utils/types'

export default function FlightQuoteUI({data}:{data:FlightQuoteData}) {
    const { status, timestamp, data: quoteData } = data;
    const formattedTimestamp = new Date(timestamp).toLocaleString();
    const quote = quoteData[0]?.Quote; // Accessing quote from the data object
  
    if (!quote) return <div>Loading...</div>;
  return(
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Flight Quote Information</h2>
        <p className="text-lg text-gray-700">Status: {status ? 'Active' : 'Inactive'}</p>
        <p className="text-lg text-gray-500">Timestamp: {formattedTimestamp}</p>
      </div>
      <div className="mb-6">
        <img src={quote.ImageUrl} alt={quote.Title} className="w-full h-64 object-cover rounded-lg" />
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-800">{quote.Title}</h3>
          {quote.Subtitle && <p className="text-lg text-gray-600">{quote.Subtitle}</p>}
        </div>
        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <span className="font-semibold text-gray-700">Price:</span>
            <span className="text-green-600">${quote.Meta.Generic.Price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold text-gray-700">Image Type:</span>
            <span className="text-gray-600">{quote.Meta.Generic.ImageType}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Results in Feed:</span>
            <span className="text-gray-600">{quote.Meta.Generic.ResultsInFeed}</span>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-lg text-gray-700">Next Screen: {quote.NextScreen}</p>
        </div>
      </div>
    </div>
  )
}
