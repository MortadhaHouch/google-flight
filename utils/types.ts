type Comment = {
    body:string
    id:number
    title:string
    userId:number
}
interface Presentation {
    title: string;
    suggestionTitle: string;
    subtitle: string;
}

interface RelevantFlightParams {
    skyId: string;
    entityId: string;
    flightPlaceType: string;
    localizedName: string;
}

interface RelevantHotelParams {
    entityId: string;
    entityType: string;
    localizedName: string;
}

interface Navigation {
    entityId: string;
    entityType: string;
    localizedName: string;
    relevantFlightParams: RelevantFlightParams;
    relevantHotelParams: RelevantHotelParams;
}

interface Airport {
    presentation: Presentation;
    navigation: Navigation;
}

interface Data {
    current: Airport;
    nearby: Airport[];
    recent: Airport[];
}

interface ApiResponse {
    status: boolean;
    timestamp: number;
    data: Data;
}
interface ApiResponseList {
    status: boolean;
    timestamp: number;
    data: Airport[];
}
interface FlightPlace {
    id: string;
    name: string;
    displayCode: string;
    city: string;
    isHighlighted: boolean;
  }
  
  interface Segment {
    id: string;
    origin: FlightPlace;
    destination: FlightPlace;
    departure: string;
    arrival: string;
    durationInMinutes: number;
    flightNumber: string;
    marketingCarrier: {
      id: number;
      name: string;
      alternateId: string;
      allianceId: number;
    };
    operatingCarrier: {
      id: number;
      name: string;
      alternateId: string;
      allianceId: number;
    };
  }
  
  interface Leg {
    id: string;
    origin: FlightPlace;
    destination: FlightPlace;
    durationInMinutes: number;
    stopCount: number;
    isSmallestStops: boolean;
    departure: string;
    arrival: string;
    timeDeltaInDays: number;
    carriers: {
      marketing: {
        id: number;
        logoUrl: string;
        name: string;
      }[];
      operationType: string;
    };
    segments: Segment[];
  }

  interface Price {
    raw: number;
    formatted: string;
  }
  
  interface FarePolicy {
    isChangeAllowed: boolean;
    isPartiallyChangeable: boolean;
    isCancellationAllowed: boolean;
    isPartiallyRefundable: boolean;
  }
  
  interface Itinerary {
    id: string;
    price: Price;
    legs: Leg[];
    isSelfTransfer: boolean;
    isProtectedSelfTransfer: boolean;
    farePolicy: FarePolicy;
    eco?: {
      ecoContenderDelta: number;
    };
    tags: string[];
    isMashUp: boolean;
    hasFlexibleOptions: boolean;
    score: number;
  }
  
  interface Context {
    status: string;
    totalResults: number;
  }
  
  interface FilterStats {
    duration: {
      min: number;
      max: number;
    };
    airports: {
      city: string;
      airports: {
        id: string;
        name: string;
      }[];
    }[];
    carriers: {
      id: number;
      logoUrl: string;
      name: string;
    }[];
    stopPrices: {
      direct: {
        isPresent: boolean;
        formattedPrice: string;
      };
      one: {
        isPresent: boolean;
        formattedPrice: string;
      };
      twoOrMore: {
        isPresent: boolean;
      };
    };
  }
interface ApiResponseFiltered {
  status: boolean;
  timestamp: number;
  sessionId: string;
  data: {
    context: Context;
    destinationImageUrl: string;
    itineraries: Itinerary[];
    messages: string[];
    filterStats: FilterStats;
  };
}
type FlightDetails = {
  status:boolean
  timestamp:number
  data:Itinerary
  pollingCompleted:boolean
}
type FlightData = {
  status: boolean;
  timestamp: number;
  data: {
    flights: {
      noPriceLabel: string;
      currency:string
      days: Array<{
        day: string;
        group: string;
        price: number;
      }>;
    };
    groups: Array<{
      id: string;
      label: string;
    }>;
  };
};
type FlightQuoteData = {
  status: boolean;
  timestamp: number;
  data: {
    [key: string]: {
      Quote: {
        ImageUrl: string;
        NextScreen: string;
        Height: number;
        Subtitle: string | null;
        Title: string;
        FullSpan: boolean;
        Meta: {
          Generic: {
            ImageType: string;
            PricedResultsInFeed: number;
            ResultsInFeed: number;
            Price: number;
            CellIndex: number;
          };
        };
      };
    };
  };
};

export type {Comment,ApiResponse,Airport,ApiResponseList,Itinerary,Context,ApiResponseFiltered,FlightDetails,Leg,FlightPlace,FlightData,FlightQuoteData}