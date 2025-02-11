import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import { ThemeContext } from "../Provider/ThemeProvider";
import { NavLink } from "react-router";
import { IoIosSunny } from "react-icons/io";
import { IoMoonOutline } from "react-icons/io5";
import { div, li } from "framer-motion/client";

const Navbar = () => {
  const { user, signOutUser, loading } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be signed out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign out!",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser()
          .then(() => {
            Swal.fire("Signed Out!", "You have been signed out.", "success");
          })
          .catch(() => {
            Swal.fire(
              "Error!",
              "An error occurred while signing out.",
              "error"
            );
          });
      }
    });
  };

  const defaultAvatar =
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Services", path: "/all-services" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "About Us", path: "/about" },
  ];

  const dashboardLinks = [
    { name: "Add Service", path: "/dashboard/add-service" },
    { name: "Manage Service", path: "/dashboard/manage-service" },
    { name: "Booked Services", path: "/dashboard/booked-services" },
    { name: "Service To-Do", path: "/dashboard/service-to-do" },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav
      className={`navbar fixed top-0 left-0 w-full z-50 transition-colors duration-300 bg-gray-200 border-b-2 ${
        isScrolled ? "bg-opacity-80 bg-gray-900 shadow-lg" : "bg-transparent "
      } ${theme === "dark" ? "dark" : ""}`}
    >
      <div className="flex items-center justify-between w-full lg:w-1/2 px-4 lg:px-8 ">
        {/* Logo */}
        <NavLink
          to="/"
          className={`text-xl font-extrabold ${
            theme === "light" ? "text-black" : "text-white"
          }`}
        >
          <div className="flex gap-2">
            <img
              src="https://i.ibb.co.com/17FFw1L/Screenshot-2024-12-27-234943.jpg"
              alt="TaskTrade"
              className="h-6 w-6"
            />

            <h1>Task-Trade</h1>
          </div>
        </NavLink>

        {/* Theme Toggle Button */}
        <button
          className="btn btn-sm btn-outline mx-4 lg:hidden"
          onClick={toggleTheme}
        >
          {theme === "light" ? <IoIosSunny /> : <IoMoonOutline />}
        </button>

        {/* Hamburger Menu */}
        <div className="relative">
          <button
            className={`lg:hidden focus:outline-none ${
              theme === "light" ? "text-black " : "text-white"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div
              className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 ${
                theme === "light"
                  ? "bg-white text-black"
                  : "bg-gray-800 text-white"
              }`}
            >
              <ul className="space-y-2 py-2">
                {navLinks
                  .filter((_, idx) => idx !== 2) // Exclude the link at index 2
                  .map((link, idx) => (
                    <li key={idx}>
                      <NavLink
                        to={link.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={({ isActive }) =>
                          isActive
                            ? "text-blue-400 font-bold block px-4 py-2"
                            : "hover:text-blue-400 block px-4 py-2"
                        }
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  ))}

                <li>
                  <NavLink
                    to="/dashboard"
                    onClick={(e) => e.preventDefault()}
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-400 font-bold block px-4 py-2 cursor-not-allowed"
                        : "hover:text-blue-400 block px-4 py-2 cursor-not-allowed"
                    }
                  >
                    <span className="text-gray-400">Dashboard</span>
                  </NavLink>
                  <ul className="pl-4 space-y-2">
                    {dashboardLinks.map((dLink, idx) => (
                      <li key={idx}>
                        <NavLink
                          to={dLink.path}
                          onClick={() => setIsMenuOpen(false)}
                          className="hover:text-yellow-400 block px-4 py-2"
                        >
                          {dLink.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>

                {loading ? (
                  <div className="flex justify-center items-center h-screen">
                    <span className="loading loading-spinner loading-lg text-blue-500"></span>
                  </div>
                ) : user ? (
                  <li>
                    <img
                      src={user?.photoURL || defaultAvatar}
                      alt="User Avatar"
                      className="w-8 h-8 mx-auto rounded-full border-2 border-gray-300"
                    />

                    <button
                      onClick={handleSignOut}
                      className="btn btn-sm btn-red w-full px-4 py-2"
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <>
                    <li>
                      <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>
                        <button className="btn btn-sm btn-blue w-full px-4 py-2">
                          Log In
                        </button>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/sign-up"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <button className="btn btn-sm btn-green w-full px-4 py-2">
                          Register
                        </button>
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden font-bold lg:flex items-center justify-between w-full px-4 lg:px-8">
        <ul className="flex space-x-6">
          {navLinks.map((link, idx) => (
            <li key={idx} className="relative group">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `hover:text-orange-400 ${
                    link.name === "Dashboard" ? "pointer-events-none" : ""
                  } ${
                    isActive
                      ? "text-blue-400 font-bold block px-4 py-2"
                      : "hover:text-blue-400 block px-4 py-2"
                  }`
                }
              >
                <span
                  className={`${
                    link.name === "Dashboard"
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  {link.name}
                </span>
              </NavLink>
              {link.name === "Dashboard" && (
                <div
                  className="absolute left-0 w-48 bg-gray-800 text-white rounded-lg shadow-lg hidden group-hover:block"
                  style={{ top: "100%" }}
                >
                  <ul className="space-y-2 py-2">
                    {dashboardLinks.map((dLink, idx) => (
                      <li key={idx}>
                        <NavLink
                          to={dLink.path}
                          className={({ isActive }) =>
                            `hover:text-blue-400  ${
                              isActive
                                ? "text-blue-400 font-bold block px-4 py-2"
                                : "hover:text-blue-400 block px-4 py-2"
                            }`
                          }
                        >
                          {dLink.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center space-x-4 relative group">
          {/* Theme Toggle Button */}
          <button className="btn btn-sm btn-outline" onClick={toggleTheme}>
            {theme === "light" ? <IoIosSunny /> : <IoMoonOutline />}
          </button>

          {/* User Avatar and Name */}
          <div className="relative">
            {user && (
              <img
                src={user?.photoURL || defaultAvatar}
                alt="User Avatar"
                className="w-8 h-8 rounded-full border-2 border-gray-300"
              />
            )}
            {/* Display name on hover */}
            {user && (
              <div className="absolute left-0 mt-2 w-32 bg-gray-800 text-white text-center text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                {user?.displayName || "User Name"}
              </div>
            )}
          </div>

          {loading ? (
            <div>Loading...</div>
          ) : user ? (
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-red-500 border border-red-500 rounded hover:bg-red-100"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Log In
                </button>
              </NavLink>
              <NavLink to="/sign-up">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Register
                </button>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
