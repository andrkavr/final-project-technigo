import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Trips = () => {
  const [trips, setTrips] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/trips")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTrips(data);
        } else {
          setTrips([data]);
        }
      })
      .catch((error) => console.error("Error fetching trips:", error));
  }, []);

  if (trips === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-8 space-y-4 mx-auto max-w-screen-lg mb-8">
      <h1 className="text-lg font-md">Available trips</h1>
      {trips.reverse().map((trip) => (
        <div
          key={trip.id}
          className="grid grid-cols-12 gap-2 p-4 bg-secondary rounded-lg relative">
          <div className="col-span-4 text-md text-gray-900 sm:text-xl">
            {trip.from}
          </div>
          <div className="col-span-1 text-md text-gray-900 text-center sm:text-xl">
            →
          </div>
          <div className="col-span-4 text-md text-gray-900 sm:text-xl">
            {trip.to}
          </div>
          <div className="col-span-3"></div>
          <div className="col-span-3 text-xs text-gray-900 sm:text-lg">
            {trip.date}
          </div>
          <div className="col-span-2 text-xs text-gray-900 sm:text-lg">
            {trip.time}
          </div>
          <div className="col-span-4 text-xs text-gray-900 sm:text-lg">
            NO USER
          </div>
          <div className="col-span-3 absolute right-4 top-1/2 transform -translate-y-1/2 h-full flex items-center justify-center">
            <Link
              to={`/trips/${trip.id}`}
              className="bg-rose-500 text-white px-4 py-2 rounded-full hover:bg-rose-700 focus:outline-none focus:ring focus:border-blue-300">
              Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
