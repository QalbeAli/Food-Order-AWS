import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const reviews = [
  { name: "Edu", date: "September 4, 2022", rating: 5, comment: "test" },
  { name: "Edu", date: "September 4, 2022", rating: 5, comment: "niceee" },
  { name: "Edu", date: "September 4, 2022", rating: 5, comment: "dca" },
];

export default function Review() {
  const handleRating = (rate) => {
    setRating(rate);
  };
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

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">
        3 reviews for Product 1 template
      </h2>
      <div className="mb-8">
        {reviews.map((r, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center space-x-4">
              <img
                src="/avatar.png"
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{r.name}</p>
                <p className="text-sm text-gray-500">{r.date}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  fill={i < r.rating ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={`w-5 h-5 ${
                    i < r.rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.5l3.09 6.26L22 11.25l-5 4.87 1.18 6.88L12 18.25l-6.18 3.25L7 16.12l-5-4.87 6.91-1.5L12 4.5z"
                  />
                </svg>
              ))}
            </div>
            <p className="mt-2">{r.comment}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleReviewSubmit} className="border-t pt-4">
        <h3 className="text-lg font-bold mb-4">Add a review</h3>
        <div className="mb-4">
          <p>Your Rating</p>
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                onClick={() => handleRating(i + 1)}
                xmlns="http://www.w3.org/2000/svg"
                fill={i < rating ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
                className={`w-7 h-7 cursor-pointer ${
                  i < rating ? "text-yellow-500" : "text-gray-300"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.5l3.09 6.26L22 11.25l-5 4.87 1.18 6.88L12 18.25l-6.18 3.25L7 16.12l-5-4.87 6.91-1.5L12 4.5z"
                />
              </svg>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            placeholder="Your review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
