import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { useAuth } from "../Provider/AuthProvider"; // Import useAuth to get user details
import axios from "axios";

import { useContext } from "react"; // To use the ThemeContext
import { ThemeContext } from "../Provider/ThemeProvider";
import { Helmet } from "react-helmet";

const BookingForm = () => {
  const { id } = useParams(); // Extract the id from the URL params
  const { user } = useAuth(); // Get the current user from AuthContext
  const { theme } = useContext(ThemeContext); // Access the theme from ThemeContext
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for form submission
  const [bookingData, setBookingData] = useState({
    serviceId: id,
    serviceName: "",
    serviceImage: "",
    providerEmail: "",
    providerName: "",
    userEmail: user?.email || "",
    userName: user?.displayName || "",
    serviceDate: "",
    specialInstructions: "",
    price: "",
  });

  useEffect(() => {
    // Fetch the service details by ID
    const fetchService = async () => {
      try {
        const response = await axios.get(
          `https://task-trade-server.vercel.app/services/${id}`,
          {
            withCredentials: true, // Include credentials for cookies
          }
        );
        const data = response.data;
        setService(data);
        setBookingData((prevData) => ({
          ...prevData,
          serviceName: data.name,
          serviceImage: data.imageUrl,
          providerEmail: data.providerEmail,
          providerName: data.providerName,
          price: data.price,
        }));
      } catch (error) {
        Swal.fire("Error!", "Failed to fetch service details", "error");
      }
    };

    fetchService();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Check if user email and name are filled
    if (!bookingData.userEmail || !bookingData.userName) {
      Swal.fire("Error!", "Please provide user email and name", "error");
      return;
    }

    setLoading(true); // Set loading state to true
    try {
      const response = await axios.post(
        "https://task-trade-server.vercel.app/bookings",
        {
          ...bookingData, // Ensure all required fields are sent
        },
        {
          withCredentials: true, // Include credentials to send cookies
        }
      );

      if (response.status === 200 || response.status === 201) {
        Swal.fire("Success!", "Booking successful", "success");
      } else {
        Swal.fire("Error!", "Failed to book the service", "error");
      }
    } catch (error) {
      console.error("Error during booking request:", error.response || error);
      Swal.fire("Error!", "An unexpected error occurred", "error");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <>
      <Helmet>
        <title>Booking-Form - TaskTrade</title>
      </Helmet>
      <div
        className={`min-h-screen py-10 ${
          theme === "dark"
            ? "bg-gray-800 text-white"
            : "bg-gray-50 text-gray-800"
        }`}
      >
        <div className="container mx-auto px-6">
          <h1
            className={`text-3xl font-bold text-center ${
              theme === "dark" ? "text-green-300" : "text-green-600"
            } mb-6`}
          >
            Book Service
          </h1>
          {loading ? (
            <div className="flex justify-center items-center h-24">
              <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-blue-500"></span>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className={`p-6 rounded shadow-lg ${
                theme === "dark" ? "bg-gray-700" : "bg-white"
              }`}
            >
              <div className="mb-4">
                <label
                  className={`block text-sm font-medium ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Service Name
                </label>
                <input
                  type="text"
                  name="serviceName"
                  value={bookingData.serviceName}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${
                    theme === "dark"
                      ? "bg-gray-600 text-gray-200"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  disabled
                />
              </div>
              <div className="mb-4">
                <label
                  className={`block text-sm font-medium ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Service Image
                </label>
                <div className="w-full p-2 border rounded mb-2">
                  <img
                    src={bookingData.serviceImage}
                    alt={bookingData.serviceName}
                    className="w-full h-auto rounded"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  className={`block text-sm font-medium ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Provider Name
                </label>
                <input
                  type="text"
                  name="providerName"
                  value={bookingData.providerName}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${
                    theme === "dark"
                      ? "bg-gray-600 text-gray-200"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  disabled
                />
              </div>
              <div className="mb-4">
                <label
                  className={`block text-sm font-medium ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Service Date
                </label>
                <input
                  type="date"
                  name="serviceDate"
                  value={bookingData.serviceDate}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${
                    theme === "dark"
                      ? "bg-gray-600 text-gray-200"
                      : "bg-gray-200 text-gray-800"
                  }`}
                />
              </div>
              <div className="mb-4">
                <label
                  className={`block text-sm font-medium ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Special Instructions
                </label>
                <textarea
                  name="specialInstructions"
                  value={bookingData.specialInstructions}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${
                    theme === "dark"
                      ? "bg-gray-600 text-gray-200"
                      : "bg-gray-200 text-gray-800"
                  }`}
                />
              </div>
              <div className="mb-4">
                <label
                  className={`block text-sm font-medium ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  User Email
                </label>
                <input
                  type="email"
                  name="userEmail"
                  value={bookingData.userEmail}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${
                    theme === "dark"
                      ? "bg-gray-600 text-gray-200"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  placeholder="Enter your email"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label
                  className={`block text-sm font-medium ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  User Name
                </label>
                <input
                  type="text"
                  name="userName"
                  value={bookingData.userName}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded ${
                    theme === "dark"
                      ? "bg-gray-600 text-gray-200"
                      : "bg-gray-200 text-gray-800"
                  }`}
                  placeholder="Enter your name"
                  disabled
                />
              </div>
              <button
                type="submit"
                className={`bg-green-600 text-white py-2 px-6 rounded-full w-full ${
                  theme === "dark" ? "hover:bg-green-500" : "hover:bg-green-700"
                }`}
              >
                Book Now
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingForm;
