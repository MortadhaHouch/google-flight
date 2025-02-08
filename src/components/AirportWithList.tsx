import { ApiResponseList } from '../../utils/types';
import { AirportCard } from './AirportCard';


const mockData: ApiResponseList = {
  status: true,
  timestamp: 1691008938320,
  data: [
    {
      presentation: {
        title: "New York",
        suggestionTitle: "New York (Any)",
        subtitle: "United States"
      },
      navigation: {
        entityId: "27537542",
        entityType: "CITY",
        localizedName: "New York",
        relevantFlightParams: {
          skyId: "NYCA",
          entityId: "27537542",
          flightPlaceType: "CITY",
          localizedName: "New York"
        },
        relevantHotelParams: {
          entityId: "27537542",
          entityType: "CITY",
          localizedName: "New York"
        }
      }
    },
    {
      presentation: {
        title: "New York Newark",
        suggestionTitle: "New York Newark (EWR)",
        subtitle: "United States"
      },
      navigation: {
        entityId: "95565059",
        entityType: "AIRPORT",
        localizedName: "New York Newark",
        relevantFlightParams: {
          skyId: "EWR",
          entityId: "95565059",
          flightPlaceType: "AIRPORT",
          localizedName: "New York Newark"
        },
        relevantHotelParams: {
          entityId: "27537542",
          entityType: "CITY",
          localizedName: "New York"
        }
      }
    },
    {
      presentation: {
        title: "New York John F. Kennedy",
        suggestionTitle: "New York John F. Kennedy (JFK)",
        subtitle: "United States"
      },
      navigation: {
        entityId: "95565058",
        entityType: "AIRPORT",
        localizedName: "New York John F. Kennedy",
        relevantFlightParams: {
          skyId: "JFK",
          entityId: "95565058",
          flightPlaceType: "AIRPORT",
          localizedName: "New York John F. Kennedy"
        },
        relevantHotelParams: {
          entityId: "27537542",
          entityType: "CITY",
          localizedName: "New York"
        }
      }
    },
    {
      presentation: {
        title: "New York LaGuardia",
        suggestionTitle: "New York LaGuardia (LGA)",
        subtitle: "United States"
      },
      navigation: {
        entityId: "95565057",
        entityType: "AIRPORT",
        localizedName: "New York LaGuardia",
        relevantFlightParams: {
          skyId: "LGA",
          entityId: "95565057",
          flightPlaceType: "AIRPORT",
          localizedName: "New York LaGuardia"
        },
        relevantHotelParams: {
          entityId: "27537542",
          entityType: "CITY",
          localizedName: "New York"
        }
      }
    },
    {
      presentation: {
        title: "Stewart International",
        suggestionTitle: "Stewart International (SWF)",
        subtitle: "United States"
      },
      navigation: {
        entityId: "95566280",
        entityType: "AIRPORT",
        localizedName: "Stewart International",
        relevantFlightParams: {
          skyId: "SWF",
          entityId: "95566280",
          flightPlaceType: "AIRPORT",
          localizedName: "Stewart International"
        },
        relevantHotelParams: {
          entityId: "27537542",
          entityType: "CITY",
          localizedName: "New York"
        }
      }
    }
  ]
};

// Main component
function AirportUIWithList({response}:{response:ApiResponseList}) {
  const { data } = response||mockData;

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Airport Information</h1>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Airports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((airport, index) => (
            <AirportCard key={index} airport={airport} />
          ))}
        </div>
      </section>
    </div>
  );
};

export {AirportUIWithList};