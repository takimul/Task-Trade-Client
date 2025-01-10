import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";
import Loader from "../Components/Loader";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router";
import axios from "axios";
import { ThemeContext } from "../Provider/ThemeProvider";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const {
    createUser,
    updateCurrentUser,
    setLoading,
    loading,
    signInWithGoogle,
  } = useContext(AuthContext);

  // Access the theme from context
  const { theme } = useContext(ThemeContext);

  // Password Validation Function
  const validatePassword = (password) => {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;

    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!uppercaseRegex.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!lowercaseRegex.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    return "";
  };

  const onSubmit = async (data) => {
    const { email, password, fullName, photo } = data;
    setLoading(true);

    // Validate Password
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      setLoading(false);
      return;
    }

    setPasswordError("");

    try {
      const res = await createUser(email, password);
      if (res.user) {
        await updateCurrentUser(fullName, photo);

        // Save user to the database
        const userToSave = {
          name: fullName,
          email,
          image: photo,
        };

        const response = await axios.post(
          "https://task-trade-server.vercel.app/users",
          userToSave
        );
        if (response.status === 201 || response.status === 200) {
          toast.success("Account created successfully!", {
            position: "top-center",
          });
          navigate("/");
        }
      }
    } catch (err) {
      console.error(err.message);
      toast.error("Failed to create account. Email might already be in use.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    signInWithGoogle()
      .then(async (result) => {
        const user = result.user;
        if (user) {
          const userToSave = {
            name: user.displayName,
            email: user.email,
            image: user.photoURL,
          };

          try {
            const response = await axios.post(
              "https://task-trade-server.vercel.app/users",
              userToSave
            );
            if (response.status === 201 || response.status === 200) {
              toast.success("Google Login successful!");
              navigate("/");
            }
          } catch (error) {
            console.error("Error saving user to database:", error);
            toast.error("Failed to save user data. Please try again later.");
          }
        }
      })
      .catch((error) => {
        console.error("Error during Google login:", error);
        toast.error("Google Login failed. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Apply theme classes dynamically
  const formStyles =
    theme === "light" ? "bg-white text-black" : "bg-gray-800 text-gray-100";
  const inputStyles =
    theme === "light"
      ? "bg-gray-100 text-black border-gray-300 focus:ring-neon-green"
      : "bg-gray-900 text-gray-100 border-gray-700 focus:ring-neon-green";

  return (
    <>
      <Helmet>
        <title>SignUp - MovieVerse</title>
      </Helmet>
      <div className="flex items-center justify-center min-h-screen ">
        {loading ? (
          <Loader loading={loading} />
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`w-full max-w-sm p-6 border shadow-md rounded-md ${formStyles}`}
          >
            <h2 className="mb-4 text-3xl font-extrabold text-center">
              Sign Up
            </h2>

            {/* Full Name Field */}
            <div className="mb-6">
              <label
                htmlFor="fullName"
                className="block mb-2 text-sm font-medium"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                {...register("fullName", { required: "Full Name is required" })}
                className={`w-full px-3 py-2 rounded-md ${inputStyles}`}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Photo URL Field */}
            <div className="mb-6">
              <label htmlFor="photo" className="block mb-2 text-sm font-medium">
                Photo URL
              </label>
              <input
                id="photo"
                type="url"
                {...register("photo", {
                  required: "Photo URL is required",
                  pattern: {
                    value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                    message: "Invalid URL format",
                  },
                })}
                className={`w-full px-3 py-2 rounded-md ${inputStyles}`}
              />
              {errors.photo && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.photo.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full px-3 py-2 rounded-md ${inputStyles}`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
                className={`w-full px-3 py-2 rounded-md ${inputStyles}`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                className={`w-full px-3 py-2 rounded-md ${inputStyles}`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full px-3 py-2 font-semibold rounded-md ${
                theme === "light" ? "bg-neon-green" : "bg-neon-green-light"
              } focus:outline-none`}
            >
              Sign Up
            </button>

            <div className="my-6 text-center">
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}
              >
                or
              </p>
              <motion.button
                type="button"
                onClick={handleGoogleSignIn}
                className={`w-full px-4 py-2 mt-2 font-semibold ${
                  theme === "dark"
                    ? "text-gray-300 bg-gray-700 hover:bg-gray-600"
                    : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                } rounded-md focus:outline-none flex items-center justify-center`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FcGoogle className="w-5 h-5 mr-2" />
                Sign in with Google
              </motion.button>
            </div>
          </form>
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default SignUp;
