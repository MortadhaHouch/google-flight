import React from 'react';
import {ApiResponse,Airport} from "../../utils/types.ts"
const AirportCard: React.FC<{ airport: Airport }> = ({ airport }) => {
    return (
        <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <h3 className="text-xl font-bold">{airport.presentation.title}</h3>
        <p className="text-gray-600">{airport.presentation.suggestionTitle}</p>
        <p className="text-gray-500">{airport.presentation.subtitle}</p>
        <div className="mt-2">
            <p className="text-sm text-gray-700">
            <strong>Entity ID:</strong> {airport.navigation.entityId}
            </p>
            <p className="text-sm text-gray-700">
            <strong>Entity Type:</strong> {airport.navigation.entityType}
            </p>
        </div>
        </div>
    );
};
function AirportUI({response}:{response:ApiResponse}){
    const { data } = response;
    return (
        <div className="w-[80%] min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Airport Information</h1>
        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Current Airport</h2>
            <AirportCard airport={data.current} />
        </section>
        <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Nearby Airports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.nearby.map((airport, index) => (
                    <AirportCard key={index} airport={airport} />
                ))}
            </div>
        </section>
        <section>
            <h2 className="text-2xl font-semibold mb-4">Recent Airports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.recent.map((airport, index) => (
                    <AirportCard key={index} airport={airport} />
                ))}
            </div>
        </section>
        </div>
    );
};

export default AirportUI;
export {AirportCard}