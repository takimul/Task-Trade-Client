import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase.config";
import axios from "axios";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { ThemeContext } from "../Provider/ThemeProvider";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext); // Access the theme and toggle function
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const email = watch("email");

  const onSubmit = (data) => {
    if (isSignUp) {
      console.log("Sign-Up Data:", data);
    } else {
      const { email, password } = data;
      setLoading(true);
      signInUser(email, password)
        .then(() => {
          setTimeout(() => {
            navigate("/");
          });
        })
        .catch((error) => {
          if (error.code === "auth/wrong-password") {
            toast.error("Incorrect password. Please try again.");
          } else if (error.code === "auth/user-not-found") {
            toast.error("User not found. Please check your email.");
          } else {
            toast.error("Something went wrong. Please try again later.");
          }
          console.error("Error:", error);
        })
        .finally(() => setLoading(false));
    }
  };

  const handleForgetPassword = () => {
    if (!email) {
      toast.error("Please enter an email address to reset your password.");
    } else {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          toast.success(`Password reset email sent to ${email}`);
        })
        .catch((error) => {
          if (error.code === "auth/invalid-email") {
            toast.error("Invalid email address. Please try again.");
          } else if (error.code === "auth/user-not-found") {
            toast.error("No user found with this email.");
          } else {
            toast.error("Failed to send password reset email. Try again.");
          }
          console.error("Error:", error);
        });
    }
  };

  const handleGoogleLogin = () => {
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

  const formVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <>
      <Helmet>
        <title>Log In - Task-Trade</title>
      </Helmet>
      <div
        className={`flex items-center justify-center min-h-screen ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-100"
        }`}
      >
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <span className="loading loading-spinner loading-lg text-blue-500"></span>
          </div>
        ) : (
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className={`w-full max-w-md p-6 ${
              theme === "dark"
                ? "bg-gray-900 text-white border-gray-600"
                : "bg-white border-gray-300"
            } shadow-lg rounded-md`}
            initial="hidden"
            animate="visible"
            variants={formVariants}
          >
            <h2
              className={`mb-6 text-3xl font-bold text-center ${
                theme === "dark" ? "text-white" : "text-gray-700"
              }`}
            >
              {isSignUp ? "Sign Up" : "Login"}
            </h2>

            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className={`block mb-2 text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
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
                className={`w-full px-3 py-2 ${
                  theme === "dark"
                    ? "bg-gray-800 text-white border-gray-600"
                    : "bg-gray-100 text-gray-900 border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className={`block mb-2 text-sm font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`w-full px-3 py-2 ${
                  theme === "dark"
                    ? "bg-gray-800 text-white border-gray-600"
                    : "bg-gray-100 text-gray-900 border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="mb-4 text-right">
              <p
                onClick={handleForgetPassword}
                className={`text-sm ${
                  theme === "dark" ? "text-blue-400" : "text-blue-500"
                } hover:underline cursor-pointer`}
              >
                Forgot Password?
              </p>
            </div>

            <motion.button
              type="submit"
              className={`w-full px-4 py-2 font-semibold text-white ${
                theme === "dark"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-500 hover:bg-blue-600"
              } rounded-md focus:outline-none ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              variants={buttonVariants}
              whileHover={!loading ? "hover" : ""}
              whileTap={!loading ? "tap" : ""}
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <span className="loading loading-spinner loading-lg text-white"></span>
                </div>
              ) : isSignUp ? (
                "Sign Up"
              ) : (
                "Login"
              )}
            </motion.button>

            {/* Google Login */}
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
                onClick={handleGoogleLogin}
                className={`w-full px-4 py-2 mt-2 font-semibold ${
                  theme === "dark"
                    ? "text-gray-300 bg-gray-700 hover:bg-gray-600"
                    : "text-gray-700 bg-gray-100 hover:bg-gray-200"
                } rounded-md focus:outline-none flex items-center justify-center`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FcGoogle className="w-5 h-5 mr-2" />
                Sign in with Google
              </motion.button>
            </div>

            {/* Toggle Sign Up / Login */}
            <div className="mt-6 text-center">
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-blue-500 hover:underline"
                >
                  {isSignUp ? "Login" : "Sign Up"}
                </button>
              </p>
            </div>
          </motion.form>
        )}

        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
};

export default Login;
