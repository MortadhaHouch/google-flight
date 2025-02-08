import { ApiResponseFiltered, Itinerary } from '../../utils/types';
function FlightItinerary ({ itinerary }:{itinerary:Itinerary}) {
  return (
    <div className="itinerary">
      <h3>Itinerary ID: {itinerary.id}</h3>
      <p>Price: {itinerary.price.formatted}</p>
      <p>Score: {itinerary.score}</p>
      <div>
        <h4>Legs:</h4>
        {itinerary.legs.map((leg, index) => (
          <div key={index} className="leg">
            <p>Origin: {leg.origin.name} ({leg.origin.displayCode})</p>
            <p>Destination: {leg.destination.name} ({leg.destination.displayCode})</p>
            <p>Departure: {leg.departure}</p>
            <p>Arrival: {leg.arrival}</p>
            <p>Duration: {leg.durationInMinutes} minutes</p>
            <p>Stops: {leg.stopCount}</p>
          </div>
        ))}
      </div>
      <div>
        <h4>Tags:</h4>
        <ul>
          {itinerary.tags.map((tag, index) => (
            <li key={index}>{tag}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
function FlightList ({ data }:{data:ApiResponseFiltered}) {
  return (
      <div className="flight-list">
      <h2>Flight Itineraries</h2>
          {data.status && data.data && (
              data.data.itineraries.map((itinerary, index) => (
                <FlightItinerary itinerary={itinerary} key={index} />
              ))
          )}
      </div>
  );
};
export {FlightList}