import { useState } from "react";
import axios from "axios";

export default function ReviewForm({ isOpen, onClose, onSubmit, orderId }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleReviewSubmit = async () => {
    if (!review || rating < 1 || rating > 5) {
      setError("Please provide a valid review and rating between 1 and 5.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await axios.post(`/api/orders/${orderId}/review`, { review, rating });
      onSubmit({ review, rating }); // Pass the review data back to parent
      setReview("");
      setRating(0);
      alert("Review submitted successfully!");
      onClose();
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message);
      setError("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null; // If not open, don't render the component

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-none">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative transition-none">
        <button onClick={onClose} className="absolute top-2 right-2 text-red-500 focus:outline-none">
          ✖
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Add a comment</h2>
          <div className="flex space-x-2 mb-4">
            {[...Array(5)].map((_, index) => (
              <button
                key={index}
                onClick={() => handleRating(index + 1)}
                className={`text-2xl ${
                  rating > index ? 'text-red-500' : 'text-gray-400'
                } focus:outline-none`}
              >
                ★
              </button>
            ))}
          </div>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
            rows={4}
            required
          />
          <button
            onClick={handleReviewSubmit}
            disabled={isSubmitting}
            className="bg-red-500 text-white px-4 py-2 rounded-md w-full hover:bg-red-600 focus:outline-none"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
}
