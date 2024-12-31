import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { ThemeContext } from "../Provider/ThemeProvider";
import { Helmet } from "react-helmet";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);

  // Access the theme from ThemeContext
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(
          `https://task-trade-server.vercel.app/services/${id}`,
          {
            withCredentials: true,
          }
        );
        setService(response.data); // Access the service data from response.data
      } catch (error) {
        Swal.fire(
          "Error!",
          error.response?.data?.message || "Failed to fetch service details",
          "error"
        );
      }
    };

    fetchService();
  }, [id]);

  const handleBookNowClick = () => {
    navigate(`/book-service/${id}`);
  };

  if (!service) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Service-Details - TaskTrade</title>
      </Helmet>
      <motion.div
        className={`min-h-screen py-10 ${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gradient-to-r from-gray-100 via-white to-gray-100 text-black"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6">
          <motion.h1
            className={`text-4xl font-extrabold mb-6 text-center ${
              theme === "dark" ? "text-blue-300" : "text-blue-700"
            }`}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {service.name}
          </motion.h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <motion.div
              className={`shadow-lg rounded-lg overflow-hidden ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <img
                src={service.imageUrl}
                alt={service.name}
                className="w-full h-64 object-cover"
              />
              <p
                className={`p-4 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {service.description}
              </p>
            </motion.div>

            <motion.div
              className={`p-6 shadow-lg rounded-lg ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <h2
                className={`text-2xl font-bold ${
                  theme === "dark" ? "text-gray-300" : "text-gray-800"
                } mb-4`}
              >
                Service Provider
              </h2>
              <div className="flex items-center mb-6">
                <img
                  src={service.providerImage}
                  alt={service.providerName}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <p
                    className={`text-gray-600 font-semibold ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {service.providerName}
                  </p>
                  <p
                    className={`text-gray-500 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {service.providerEmail}
                  </p>
                </div>
              </div>
              <p
                className={`text-green-600 font-medium ${
                  theme === "dark" ? "text-green-400" : "text-green-600"
                }`}
              >
                <strong>Area:</strong> {service.area}
              </p>
              <p
                className={`text-green-600 font-medium mt-2 ${
                  theme === "dark" ? "text-green-400" : "text-green-600"
                }`}
              >
                <strong>Price:</strong> ${service.price}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookNowClick}
                className={`w-full mt-6 py-2 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                    : "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                } font-bold rounded shadow-lg hover:shadow-xl`}
              >
                Book Now
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ServiceDetails;
