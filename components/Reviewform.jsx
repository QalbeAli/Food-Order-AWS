import { useState } from "react";
import axios from "axios";

export default function ReviewForm({ orderId }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleReviewSubmit = async () => {
    if (!review || !rating) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await axios.post(`/api/orders/${orderId}/review`, { review, rating });
      setReview("");
      setRating(0);
      alert("Review submitted successfully!");
    } catch (err) {
      setError("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review"
        required
      />
      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        placeholder="Rating"
        min="1"
        max="5"
        required
      />
      <button onClick={handleReviewSubmit} disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}
