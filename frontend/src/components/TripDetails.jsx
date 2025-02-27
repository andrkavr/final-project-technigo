import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { userStore } from "../stores/userStore";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

export const TripDetails = () => {
  const { tripId } = useParams();
  const { loggedInUserId, username } = userStore();
  const [selectedTrip, setSelectedTrip] = useState(null);
  const { isAuthenticated } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);
  const apiEnv = import.meta.env.VITE_BACKEND_API;
  const navigate = useNavigate();

  const joinTrip = async () => {
    const passengerDetails = {
      id: loggedInUserId,
      username: username,
    };

    try {
      const response = await fetch(`${apiEnv}/trips/join/${tripId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passengerDetails),
      });

      if (response.ok) {
        const data = await response.json();
        navigate("/mytrips");
      }
    } catch (error) {
      console.error("Error joining trip: ", error);
    }
  };

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await fetch(`${apiEnv}/trips/${tripId}`);
        const data = await response.json();
        setSelectedTrip(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching trip:", error);
      }
    };

    if (!tripId) {
      return;
    }
    fetchTrip();
  }, [tripId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="sm:mt-8 mt-2 space-y-4 mx-auto max-w-screen-md mb-8 p-2">
        <h1 className="text-lg font-md">Trip details</h1>
        <div className="grid grid-cols-12 bg-background rounded-lg relative p-4">
          <div className="col-span-12 flex items-center justify-center text-md sm:text-lg"></div>

          <div className="col-span-6 text-xs">From</div>

          <div className="col-span-6 text-xs">To</div>

          <div className="col-span-6 flex items-center text-lg text-primary font-semibold sm:text-4xl p-2">
            {selectedTrip.from}
          </div>

          <div className="col-span-6 flex items-center text-lg text-right font-semibold sm:text-4xl p-2">
            {selectedTrip.to}
          </div>

          <div className="col-span-6 mt-2 text-xs">Date</div>
          <div className="col-span-6 mt-2 text-xs">User</div>

          <div className="col-span-6 flex items-center text-lg sm:text-xl p-2">
            {selectedTrip.date}
          </div>
          <div className="col-span-6 flex items-center text-lg sm:text-xl p-2">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 mr-1">
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            {selectedTrip.username}
          </div>

          <div className="col-span-6 mt-2 text-xs">Make</div>
          <div className="col-span-6 mt-2 text-xs">Model</div>

          <div className="col-span-6 flex items-center text-lg sm:text-xl p-2">
            {selectedTrip.make}
          </div>
          <div className="col-span-6 flex items-center text-lg sm:text-xl p-2">
            {selectedTrip.model}
          </div>

          <div className="col-span-6 mt-2 text-xs">Reg. no</div>
          <div className="col-span-6 mt-2 text-xs">Avail. seats</div>

          <div className="col-span-6 flex items-center p-2">
            <span className="font-semibold border border-primary px-1 text-lg sm:text-xl rounded-sm">
              {selectedTrip.reg}
            </span>
          </div>

          <div className="col-span-6 flex items-center text-lg sm:text-xl p-2">
            {selectedTrip.availableSeats}
          </div>

          <div className="col-span-12 mt-2 text-xs">Music</div>

          <div className="col-span-12 flex items-center text-lg sm:text-xl p-2">
            {selectedTrip.music}
          </div>

          <div className="col-span-12 mt-2 text-xs">Message</div>

          <div className="col-span-12 flex items-center text-md sm:text-lg p-2">
            {selectedTrip.message}
          </div>

          <div className="col-span-12 flex items-center justify-end text-gray-300 text-xs mt-8">
            Trip ID: {selectedTrip._id}
          </div>

          <div className="col-span-12 flex items-center justify-center text-md sm:text-lg p-2">
            {isAuthenticated &&
              selectedTrip.user !== loggedInUserId &&
              !selectedTrip.passengers
                .map((x) => x.userId)
                .includes(loggedInUserId) && (
                <>
                  {selectedTrip && selectedTrip.availableSeats > 0 ? (
                    <button
                      type="button"
                      onClick={joinTrip}
                      className="bg-pink-400 rounded-full cursor-pointer hover:bg-cyan-800 text-white px-5 py-2 mt-8 font-semibold">
                      Join trip
                    </button>
                  ) : (
                    <>
                      <span className="text-red-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6 mr-1">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                          />
                        </svg>
                      </span>
                      <p>No available seats</p>
                    </>
                  )}
                </>
              )}
          </div>
        </div>
        <div className="flex items-center">
          <Link
            to="/trips"
            className="text-blue-500 text-md hover:text-blue-700 focus:outline-none focus:ring focus:border-blue-300 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 mr-1">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            Back to Trips
          </Link>
        </div>
      </div>
    </>
  );
};
