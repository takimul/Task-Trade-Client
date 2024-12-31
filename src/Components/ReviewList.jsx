import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../Provider/ThemeProvider";
import { div } from "framer-motion/client";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const { theme } = useContext(ThemeContext);

  // Fetch reviews when the component is mounted
  const fetchReviews = async () => {
    try {
      const response = await fetch(
        "https://task-trade-server.vercel.app/reviews"
      );
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="mt-6 mb-4">
      <h3 className="text-2xl text-center font-semibold mb-4">Reviews</h3>

      <div
        className={`md:grid md:grid-cols-2 lg:grid-cols-3 gap-6  p-6 space-y-6 ${
          theme === "dark"
            ? "bg-gray-800 text-gray-100"
            : "bg-white text-gray-800"
        }`}
      >
        {reviews.length === 0 ? (
          <p className="text-lg text-gray-500">No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              className={`review p-4 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 ${
                theme === "dark"
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <div className="review-header lg:flex justify-between items-center mb-3">
                <h4 className="text-xl font-medium">{review.reviewer}</h4>
                <span className="text-yellow-500">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </span>
              </div>
              <p className="mb-4">{review.content}</p>
              <span className="text-sm">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewList;
