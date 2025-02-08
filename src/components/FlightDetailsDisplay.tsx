import { Itinerary } from '../../utils/types';
function FlightDetailsDisplay({ flightData }: {flightData:Itinerary}) {
  const firstLeg = flightData.legs[0];
  const firstSegment = firstLeg.segments[0];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Flight Details</h1>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-gray-600">Origin:</div>
          <div className="text-gray-800">
            {firstSegment.origin.name} ({firstSegment.origin.displayCode})
          </div>
          <div className="text-gray-600">Destination:</div>
          <div className="text-gray-800">
            {firstSegment.destination.name} ({firstSegment.destination.displayCode})
          </div>
          <div className="text-gray-600">Departure Time:</div>
          <div className="text-gray-800">{firstSegment.departure}</div>
          <div className="text-gray-600">Arrival Time:</div>
          <div className="text-gray-800">{firstSegment.arrival}</div>
          <div className="text-gray-600">Duration:</div>
          <div className="text-gray-800">{firstLeg.durationInMinutes} minutes</div>
          {
            flightData.legs.map((item,idx)=>{
                return(
                    <div key={idx}>
                        <p className="text-gray-600">Layover:</p>
                        <p className="text-gray-800">{item.durationInMinutes} minutes</p>
                        <p className="text-gray-600">Layover Airport:</p>
                        <p className="text-gray-800">{item.destination.city}</p>
                        <p className="text-gray-800">{item.arrival}</p>
                    </div>
                )
            })
          }
          <div className="text-gray-600">Carrier:</div>
          <div className="text-gray-800">{firstSegment.marketingCarrier.name}</div>
          <div className="text-gray-600">Flight Number:</div>
          <div className="text-gray-800">{firstSegment.flightNumber}</div>
          <div className="text-gray-600">Price:</div>
          <div className="text-gray-800">{flightData.price.formatted}</div>
        </div>
      </div>
    </div>
  );
}

export default FlightDetailsDisplay;
