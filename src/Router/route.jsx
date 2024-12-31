import React from "react";
// import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Layout/Mainlayout";
import HomePage from "../Pages/HomePage";
import AllServices from "../Pages/AllServices";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import AddServices from "../Pages/Addservices";
import ServiceToDo from "../Pages/ServiceToDo";
import BookedServices from "../Pages/BookedServices";
import ServiceDetails from "../Pages/ServiceDetails";
import { createBrowserRouter } from "react-router";
import BookingForm from "../Pages/BookingForm";
import ManageService from "../Pages/ManageService";
import PrivateRoute from "./PrivateRoute";
import NotFoundPage from "../Pages/NotFoundPage";
import AboutUs from "../Pages/AboutUs";

const router = createBrowserRouter(
  [
    {
      path: "*",
      element: <NotFoundPage></NotFoundPage>,
    },
    {
      path: "/",
      element: <Mainlayout />, // Main layout with Navbar
      children: [
        { path: "/", element: <HomePage /> }, // Home Page
        { path: "/all-services", element: <AllServices /> }, // All Services Page
        { path: "/login", element: <Login /> }, // Login Page
        { path: "/sign-up", element: <SignUp /> }, // Sign-Up Page
        { path: "/about", element: <AboutUs></AboutUs> }, // Contact Page
        {
          path: "/services/:id", // Service Details Page
          element: (
            <PrivateRoute>
              <ServiceDetails />
            </PrivateRoute>
          ), // New Service Details page
        },
        {
          path: "/book-service/:id", // Booking Form Page
          element: <BookingForm />, // New Booking Form page
        },
        {
          path: "/dashboard",
          children: [
            {
              path: "add-service",
              element: (
                <PrivateRoute>
                  <AddServices />
                </PrivateRoute>
              ),
            }, // Add Service
            {
              path: "manage-service",
              element: (
                <PrivateRoute>
                  <ManageService />
                </PrivateRoute>
              ),
            }, // Manage Service
            {
              path: "booked-services",
              element: (
                <PrivateRoute>
                  <BookedServices />
                </PrivateRoute>
              ),
            }, // Booked Services
            {
              path: "service-to-do",
              element: (
                <PrivateRoute>
                  <ServiceToDo />
                </PrivateRoute>
              ),
            }, // Service To-Do
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

export default router;
