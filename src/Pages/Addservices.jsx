import React, { useContext, useState } from "react";
import Swal from "sweetalert2";

import { motion } from "framer-motion";
import { AuthContext } from "../Provider/AuthProvider";
import { ThemeContext } from "../Provider/ThemeProvider";
import { Helmet } from "react-helmet";

const AddServices = () => {
  const { user } = useContext(AuthContext); // Get user details from AuthContext
  const { theme } = useContext(ThemeContext); // Access the theme from ThemeContext
  const [service, setService] = useState({
    imageUrl: "",
    name: "",
    price: "",
    area: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !service.imageUrl ||
      !service.name ||
      !service.price ||
      !service.area ||
      !service.description
    ) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");

    // Prepare service data
    const serviceData = {
      ...service,
      providerEmail: user?.email || "N/A", // Send providerEmail to match backend structure
      createdAt: new Date(),
    };

    try {
      const response = await fetch(
        "https://task-trade-server.vercel.app/services",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(serviceData),
        }
      );

      if (response.ok) {
        Swal.fire("Success!", "Service added successfully.", "success");
        setService({
          imageUrl: "",
          name: "",
          price: "",
          area: "",
          description: "",
        });
      } else {
        Swal.fire(
          "Error!",
          "Failed to add service. Please try again later.",
          "error"
        );
      }
    } catch (error) {
      Swal.fire("Error!", "An unexpected error occurred.", "error");
    } finally {
      setLoading(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <>
      <Helmet>
        <title>Add Services - TaskTrade</title>
      </Helmet>
      <div
        className={`max-w-2xl mx-auto p-6 ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        } rounded shadow`}
      >
        <motion.h1
          className={`text-3xl font-bold text-center mb-6 ${
            theme === "dark" ? "text-blue-300" : "text-blue-600"
          }`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Add New Service
        </motion.h1>
        {error && (
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
        )}
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <span className="loading loading-spinner loading-lg text-blue-500"></span>
          </div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={formVariants}
          >
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-800"
                }`}
              >
                Image URL
              </label>
              <input
                type="text"
                name="imageUrl"
                value={service.imageUrl}
                onChange={handleChange}
                placeholder="Enter Image URL"
                className={`w-full p-3 border rounded ${
                  theme === "dark"
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-50 text-gray-700"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-800"
                }`}
              >
                Service Name
              </label>
              <input
                type="text"
                name="name"
                value={service.name}
                onChange={handleChange}
                placeholder="Enter Service Name"
                className={`w-full p-3 border rounded ${
                  theme === "dark"
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-50 text-gray-700"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-800"
                }`}
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                value={service.price}
                onChange={handleChange}
                placeholder="Enter Price"
                className={`w-full p-3 border rounded ${
                  theme === "dark"
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-50 text-gray-700"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-800"
                }`}
              >
                Service Area
              </label>
              <input
                type="text"
                name="area"
                value={service.area}
                onChange={handleChange}
                placeholder="Enter Service Area"
                className={`w-full p-3 border rounded ${
                  theme === "dark"
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-50 text-gray-700"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-800"
                }`}
              >
                Description
              </label>
              <textarea
                name="description"
                value={service.description}
                onChange={handleChange}
                placeholder="Enter Description"
                rows="4"
                className={`w-full p-3 border rounded ${
                  theme === "dark"
                    ? "bg-gray-700 text-gray-300"
                    : "bg-gray-50 text-gray-700"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              ></textarea>
            </div>
            <motion.button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-3 font-bold text-white rounded ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              variants={buttonVariants}
              whileHover={!loading ? "hover" : ""}
              whileTap={!loading ? "tap" : ""}
            >
              {loading ? "Adding Service..." : "Add Service"}
            </motion.button>
          </motion.form>
        )}
      </div>
    </>
  );
};

export default AddServices;
