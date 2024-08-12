import { useEffect, useState } from "react";
import axios from "axios";
import ReviewStars from "./ReviewStars";

export default function ReviewList({ orderId }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await axios.get(`/api/reviews/${orderId}`);
      setReviews(response.data.reviews);
    };

    fetchReviews();
  }, [orderId]);

  return (
    <div>
      <h3>Customer Reviews</h3>
      {reviews.map((review) => (
        <div key={review._id}>
          <ReviewStars rating={review.rating} />
          <p>{review.review}</p>
        </div>
      ))}
    </div>
  );
}
