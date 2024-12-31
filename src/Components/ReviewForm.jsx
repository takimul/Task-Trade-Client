import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { ThemeContext } from "../Provider/ThemeProvider";

const ReviewForm = () => {
  const { theme } = useContext(ThemeContext);
  const [reviewer, setReviewer] = useState("");
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reviewer || !rating || !content) {
      Swal.fire("Error", "All fields are required", "error");
      return;
    }

    const reviewData = { reviewer, rating, content };

    try {
      const response = await fetch(
        "https://task-trade-server.vercel.app/reviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewData),
        }
      );

      const result = await response.json();
      if (response.ok) {
        Swal.fire("Success", "Review submitted successfully!", "success");
        setReviewer("");
        setRating(0);
        setContent("");
      } else {
        Swal.fire("Error", result.message, "error");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to submit review.", "error");
    }
  };

  return (
    <div
      className={`review-form lg:w-1/2 mx-auto mb-6 p-6 rounded-lg shadow-lg ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h3 className="text-xl font-semibold mb-4">Submit Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={reviewer}
          onChange={(e) => setReviewer(e.target.value)}
          placeholder="Your Name"
          className="w-full p-2 border rounded-md"
        />
        <div>
          <span className="text-lg font-medium">Rating: </span>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star cursor-pointer ${
                star <= rating ? "text-yellow-500" : "text-gray-500"
              }`}
              onClick={() => handleRatingChange(star)}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your review"
          className="w-full p-2 border rounded-md"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
