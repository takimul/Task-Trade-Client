import React, { useEffect, useState } from "react";
import axios from "axios";

import { useContext } from "react"; // To use the ThemeContext
import { ThemeContext } from "../Provider/ThemeProvider";
import { Helmet } from "react-helmet";

const BookedServices = () => {
  const { theme } = useContext(ThemeContext); // Access the theme from ThemeContext
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch bookings for the logged-in user
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "https://task-trade-server.vercel.app/bookings",
          {
            withCredentials: true, // Ensure token is sent
          }
        );
        setBookings(response.data); // Store bookings in state
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings. Please try again.");
      } finally {
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10 mb-[700px]">
        You have no booked services yet.
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Booked-Services - TaskTrade</title>
      </Helmet>
      <div
        className={`min-h-screen container mx-auto mt-10 p-4 ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        }`}
      >
        <h1
          className={`text-2xl font-bold mb-6 ${
            theme === "dark" ? "text-blue-300" : "text-blue-600"
          }`}
        >
          Your Booked Services
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className={`border rounded-lg shadow-md p-4 flex flex-col justify-between ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-50"
              }`}
            >
              <img
                src={booking.serviceImage}
                alt={booking.serviceName}
                className="w-full h-40 object-cover rounded-t-md"
              />
              <div className="mt-4">
                <h2
                  className={`text-lg font-semibold ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  {booking.serviceName}
                </h2>
                <p
                  className={`text-sm mt-1 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <strong>Provider:</strong> {booking.providerName}
                </p>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <strong>Date:</strong>{" "}
                  {new Date(booking.serviceDate).toLocaleDateString()}
                </p>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <strong>Status:</strong> {booking.serviceStatus}
                </p>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <strong>Price:</strong> ${booking.price}
                </p>
              </div>
              {booking.specialInstructions && (
                <p
                  className={`text-sm mt-2 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <strong>Instructions:</strong> {booking.specialInstructions}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BookedServices;
