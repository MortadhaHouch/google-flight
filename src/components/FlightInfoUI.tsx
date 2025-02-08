import { FlightData } from "../../utils/types";

const FlightInfoUI: React.FC<{ data: FlightData }> = ({ data }) => {
  const formattedTimestamp = new Date(data.timestamp).toLocaleString();

  return (
    <div className="p-6 max-w-4xl mx-auto shadow-lg rounded-lg flex flex-col justify-center items-center">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Flight Information</h2>
        <p className="text-lg text-gray-500">Timestamp: {formattedTimestamp}</p>
      </div>
      <div className="mb-6">
        {data.data.flights.days.map((day,idx) => (
          <div key={idx} className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Day: {day.day}</span>
          <span className="text-gray-600">Group: {day.group}</span>
          <span className="font-semibold text-green-600">${day.price.toFixed(2)}</span>
        </div>
        ))}
      </div>
      <div className="mb-6">
        {data.data.flights.days.map((day,idx) => (
          <div key={idx} className="flex justify-between py-2 border-b">
          <span className="text-gray-600">Day: {day.day}</span><span className="text-gray-600">Group: {day.group}</span><span className="font-semibold text-green-600">${day.price.toFixed(2)}</span>
        </div>
        ))}
      </div>
    </div>
  );
};

export default FlightInfoUI;
