import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { ThemeContext } from "../Provider/ThemeProvider";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router";

const ServiceCard = ({ service, theme }) => (
  <div
    className={`p-6 rounded-lg shadow-md ${
      theme === "light" ? "bg-white text-gray-800" : "bg-gray-800 text-white"
    }`}
  >
    <img
      src={service.imageUrl}
      alt={service.name}
      className="w-full h-40 object-cover rounded-md mb-4"
    />
    <h2
      className={`text-2xl font-bold mb-2 ${
        theme === "light" ? "text-gray-800" : "text-white"
      }`}
    >
      {service.name}
    </h2>
    <p
      className={`mb-1 ${
        theme === "light" ? "text-green-700" : "text-green-400"
      }`}
    >
      <strong>Price:</strong> ${service.price}
    </p>
    <p
      className={`mb-1 ${
        theme === "light" ? "text-green-700" : "text-green-400"
      }`}
    >
      <strong>Area:</strong> {service.area}
    </p>
    <p
      className={`mb-4 ${
        theme === "light" ? "text-gray-600" : "text-gray-400"
      }`}
    >
      {service.description}
    </p>
    <Link
      to={`/services/${service._id}`}
      className={`${
        theme === "light"
          ? "text-blue-600 hover:text-blue-800"
          : "text-blue-400"
      }`}
    >
      View Details
    </Link>
  </div>
);

const AllServices = () => {
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 6; // Number of services per page (6-9 based on your preference)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "https://task-trade-server.vercel.app/services",
          {
            withCredentials: true,
          }
        );
        setServices(response.data);
        setFilteredServices(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setError("Failed to fetch services. Please try again later.");
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Handle search button click
  const handleSearchClick = () => {
    const query = searchText.toLowerCase();
    setFilteredServices(
      services.filter((service) => service.name.toLowerCase().includes(query))
    );
    setCurrentPage(1); // Reset to first page on search
  };

  // Pagination logic
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(
    indexOfFirstService,
    indexOfLastService
  );

  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1) return; // Prevent going to negative page numbers
    if (pageNumber > totalPages) return; // Prevent going beyond the last page
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* DaisyUI Spinner */}
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (filteredServices.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <p className="text-white">No matching services found.</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>All Services - TaskTrade</title>
      </Helmet>
      <div
        className={`min-h-screen ${
          theme === "light"
            ? "bg-base-100 text-black"
            : "bg-gray-900 text-white"
        }`}
      >
        <div className="container mx-auto py-10">
          <h1
            className={`text-4xl font-bold text-center mb-8 ${
              theme === "light" ? "text-black" : "text-white"
            }`}
          >
            All Services
          </h1>

          {/* Search Input and Button */}
          <div className="mb-6 flex justify-center items-center space-x-4">
            <div>
              <input
                type="text"
                placeholder="Search for services..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className={`w-full max-w-lg px-4 py-2 text-lg rounded-md border ${
                  theme === "light"
                    ? "border-gray-300 text-black"
                    : "border-gray-700 text-white"
                } focus:outline-none`}
              />

              <div className="flex justify-center items-center h-full">
                <button
                  onClick={handleSearchClick}
                  className={`px-6 py-2 my-2 text-lg font-semibold rounded-md hover:${
                    theme === "light" ? "bg-yellow-600" : "bg-yellow-500"
                  } focus:outline-none shadow-md ${
                    theme === "light"
                      ? "bg-yellow-500 text-white"
                      : "bg-yellow-400 text-black"
                  }`}
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Display Filtered Services */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentServices.map((service) => (
              <ServiceCard key={service._id} service={service} theme={theme} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-8 space-x-4">
            <div
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-4 rounded-md ${
                theme === "light"
                  ? "bg-yellow-500 text-white hover:bg-yellow-600"
                  : "bg-yellow-400 text-black hover:bg-yellow-500"
              }`}
            >
              <IoIosArrowBack />
            </div>
            <span className="text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
            <div
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-4 rounded-md ${
                theme === "light"
                  ? "bg-yellow-500 text-white hover:bg-yellow-600"
                  : "bg-yellow-400 text-black hover:bg-yellow-500"
              }`}
            >
              <IoIosArrowForward />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllServices;
