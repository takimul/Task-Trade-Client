import axios from "axios";
import React, { useEffect, useState, useContext } from "react";

import { motion } from "framer-motion";
import { ThemeContext } from "../Provider/ThemeProvider";
import { Link } from "react-router";

const PopularServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Access the theme from ThemeContext
  const { theme } = useContext(ThemeContext);

  // Fetch services from the backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "https://task-trade-server.vercel.app/services"
        ); // Adjust the URL if needed
        setServices(response.data);
      } catch (err) {
        setError("Failed to fetch services");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* DaisyUI Spinner */}
        <span className="loading loading-spinner loading-lg text-blue-500"></span>

        {/* Uncomment this to use React Spinners instead */}
        {/* <ClipLoader color="#2563eb" size={50} /> */}
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section
      className={`popular-services my-16 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-2xl font-bold text-center mb-8">Popular Services</h2>

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8 px-4">
        {services.slice(0, 6).map((service, idx) => (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            key={idx}
            className={`service-card ${
              theme === "dark"
                ? "bg-gray-900 text-white"
                : "bg-base-300 text-black"
            } rounded-lg shadow-lg overflow-hidden`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: idx * 0.1 }}
          >
            <img
              src={service.imageUrl}
              alt={service.name}
              className="w-full h-80 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{service.name}</h3>
              <p className="text-sm">
                {service.description.substring(0, 100)}
                {service.description.length > 100 && "..."}
              </p>
              <div className="mt-4 flex items-center">
                <h1>Provider: </h1>
                <img
                  src={service.providerImage}
                  alt={service.providerName}
                  className="w-8 h-8 rounded-full border-2 border-gray-300"
                />
                <p className="ml-2 text-sm">{service.providerName}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-semibold">
                  {service.price} BDT
                </span>
                <Link
                  to={`/services/${service._id}`}
                  className={`text-green-800 hover:underline ${
                    theme === "dark"
                      ? "hover:text-green-400"
                      : "hover:text-green-600"
                  }`}
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Show All Button */}
      <div className="text-center mt-8">
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/all-services"
            className={`px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all ${
              theme === "dark" ? "hover:bg-blue-700" : "hover:bg-blue-600"
            }`}
          >
            Show All
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularServices;
