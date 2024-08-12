"use client";
// components/ReviewPopup.js

import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ReviewPopup({ isOpen, onClose, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (!id && router.isReady) {
      // Optionally, handle the case when ID is still not present even after router is ready
      console.error("Order ID is not available");
    }
  }, [id, router.isReady]);
  const handleReviewSubmit = async () => {
    if (!review || !rating) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await axios.post(`/api/orders/${id}/review`, { review, rating });
      setReview("");
      setRating(0);
      alert("Review submitted successfully!");
    } catch (err) {
      setError("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Submit Your Review</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Your Rating:
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className={`text-2xl ${
                  rating >= star ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Your Review:
          </label>
          <textarea
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            rows="4"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            onClick={handleReviewSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
