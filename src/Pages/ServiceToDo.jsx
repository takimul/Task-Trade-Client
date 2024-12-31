import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { ThemeContext } from "../Provider/ThemeProvider";
import { Helmet } from "react-helmet";

const ServiceToDo = () => {
  const [bookedServices, setBookedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { theme } = React.useContext(ThemeContext); // Accessing the current theme context

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "https://task-trade-server.vercel.app/bookings",
          {
            withCredentials: true,
          }
        );
        const providerEmail = response.data[0]?.providerEmail;
        const providerBookings = response.data.filter(
          (booking) => booking.providerEmail === providerEmail
        );
        setBookedServices(providerBookings);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const response = await axios.put(
        `https://task-trade-server.vercel.app/bookings/${bookingId}`,
        { serviceStatus: newStatus },
        { withCredentials: true }
      );
      setBookedServices((prevServices) =>
        prevServices.map((service) =>
          service._id === bookingId
            ? { ...service, serviceStatus: newStatus }
            : service
        )
      );
      Swal.fire(
        "Status Updated",
        "The service status has been updated.",
        "success"
      );
    } catch (err) {
      console.error("Error updating service status:", err);
      setError("Failed to update status. Please try again.");
      Swal.fire("Error", "Failed to update service status.", "error");
    }
  };

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

  if (bookedServices.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No booked services for you yet.
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Service-To-Do - TaskTrade</title>
      </Helmet>
      <motion.div
        className={`container mx-auto mt-10 p-4 min-h-screen ${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gray-50 text-gray-800"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Services To Do</h1>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {bookedServices.map((service) => (
            <motion.div
              key={service._id}
              className={`border rounded-lg shadow-md p-4 flex flex-col justify-between ${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-800"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <img
                src={service.serviceImage}
                alt={service.serviceName}
                className="w-full h-40 object-cover rounded-t-md"
              />
              <div className="mt-4">
                <h2 className="text-lg font-semibold">{service.serviceName}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  <strong>User:</strong> {service.userName}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Date:</strong>{" "}
                  {new Date(service.serviceDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Price:</strong> ${service.price}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Status:</strong> {service.serviceStatus}
                </p>
                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <label htmlFor="status" className="text-sm">
                    Update Status
                  </label>
                  <select
                    id="status"
                    value={service.serviceStatus}
                    onChange={(e) =>
                      handleStatusChange(service._id, e.target.value)
                    }
                    className={`w-full p-2 mt-1 ${
                      theme === "dark"
                        ? "bg-gray-700 text-white"
                        : "bg-gray-200 text-gray-800"
                    } rounded-md`}
                  >
                    <option value="pending">Pending</option>
                    <option value="working">Working</option>
                    <option value="completed">Completed</option>
                  </select>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </>
  );
};

export default ServiceToDo;
