import { FormEvent, useContext, useState } from "react";
import { Leg, FlightPlace, Itinerary } from "../../utils/types";
import fetchData from "../../utils/fetchData";
import FlightDetailsDisplay from "../components/FlightDetailsDisplay";
import { ThemeContext } from "../providers/ThemeProvider";
const INITIAL_LEG: Leg = {
  id: "",
  origin: { id: "", name: "", displayCode: "", city: "", isHighlighted: false },
  destination: { id: "", name: "", displayCode: "", city: "", isHighlighted: false },
  durationInMinutes: 0,
  stopCount: 0,
  isSmallestStops: false,
  departure: "",
  arrival: "",
  timeDeltaInDays: 0,
  carriers: {
    marketing: [{ id: 0, logoUrl: "", name: "" }],
    operationType: "",
  },
  segments: [],
};
function FlightDetailsForm() {
  const [data, setData] = useState<Itinerary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [legs, setLegs] = useState<Leg[]>([INITIAL_LEG]);
  const { isDark } = useContext(ThemeContext);
  const isDarkMode = isDark || JSON.parse(localStorage.getItem("theme") || "false");
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number,
    field: keyof Leg | keyof FlightPlace
  ) => {
    const { name, value } = e.target;
    setLegs((prev) =>
      prev.map((leg, i) => {
        if (i === index) {
          if (field === "origin" || field === "destination") {
            return {
              ...leg,
              [field]: { ...leg[field], [name]: value },
            };
          }
          return { ...leg, [field]: value };
        }
        return leg;
      })
    );
  };
  const addLeg = () => setLegs((prev) => [...prev, INITIAL_LEG]);
  const removeLeg = (index: number) => {
    setLegs((prev) => prev.filter((_, i) => i !== index));
  };
  const handleDataFetch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const fullUrl = `'https://sky-scrapper.p.rapidapi.com/api/v1/flights/getFlightDetails?legs=%22%5B%7B%5C%22destination%5C%22%3A%5C%22LOND%5C%22%2C%5C%22origin%5C%22%3A%5C%22LAXA%5C%22%2C%5C%22date%5C%22%3A%5C%222024-04-11%5C%22%7D%5D%22&adults=1&currency=USD&locale=en-US&market=en-US&cabinClass=economy&countryCode=US'`;
    try {
      const response = await fetchData(fullUrl, setIsLoading, {
        "x-rapidapi-key": import.meta.env.VITE_X_RAPID_API_KEY,
        "x-rapidapi-host": import.meta.env.VITE_X_RAPID_API_HOST,
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching flight details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      className={`w-screen flex flex-col items-center justify-center min-h-screen bg-gradient-to-br ${
        isDarkMode
          ? "from-slate-900 via-slate-800 to-slate-700 text-white"
          : "from-slate-100 via-slate-200 to-slate-300 text-slate-800"
      } transition-colors duration-500 ease-in-out`}
    >
      <form onSubmit={handleDataFetch} className="space-y-4 w-[80%]">
        {legs.map((leg, index) => (
          <LegForm
            key={index}
            index={index}
            leg={leg}
            handleInputChange={handleInputChange}
            removeLeg={removeLeg}
          />
        ))}
        <button
          type="button"
          onClick={addLeg}
          className="w-full bg-gray-100 text-indigo-600 hover:bg-gray-200 py-2 rounded-md text-sm"
        >
          Add Another Leg
        </button>
        <button type="submit" className="w-full bg-indigo-500 text-white py-2 rounded-md">
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {data && <FlightDetailsDisplay flightData={data} />}
    </main>
  );
}

interface LegFormProps {
  index: number;
  leg: Leg;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number,
    field: keyof Leg | keyof FlightPlace
  ) => void;
  removeLeg: (index: number) => void;
}

const LegForm = ({ index, leg, handleInputChange, removeLeg }: LegFormProps) => (
  <div className="border-b pb-4">
    <h3 className="font-medium text-gray-700 mb-2">Leg {index + 1}</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <InputField
        label="Origin Name"
        name="name"
        value={leg.origin.name}
        onChange={(e) => handleInputChange(e, index, "origin")}
      />
      <InputField
        label="Origin City"
        name="city"
        value={leg.origin.city}
        onChange={(e) => handleInputChange(e, index, "origin")}
      />
      <InputField
        label="Destination Name"
        name="name"
        value={leg.destination.name}
        onChange={(e) => handleInputChange(e, index, "destination")}
      />
      <InputField
        label="Destination City"
        name="city"
        value={leg.destination.city}
        onChange={(e) => handleInputChange(e, index, "destination")}
      />
      <InputField
        label="Departure"
        name="departure"
        type="datetime-local"
        value={leg.departure}
        onChange={(e) => handleInputChange(e, index, "departure")}
      />
      <InputField
        label="Arrival"
        name="arrival"
        type="datetime-local"
        value={leg.arrival}
        onChange={(e) => handleInputChange(e, index, "arrival")}
      />
    </div>
    <button
      type="button"
      onClick={() => removeLeg(index)}
      className="mt-2 text-red-500 hover:underline text-sm"
    >
      Remove Leg
    </button>
  </div>
);

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type?: string;
}

const InputField = ({ label, name, value, onChange, type = "text" }: InputFieldProps) => (
  <div>
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full rounded-md border-gray-300"
    />
  </div>
);

export default FlightDetailsForm;