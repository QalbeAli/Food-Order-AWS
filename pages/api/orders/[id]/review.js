import dbConnect from "../../../../util/dbConnect";
import Review from "../../../../models/Review";
import Order from "../../../../models/Order";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { review, rating } = req.body;
    const { id } = req.query;

    // Validate request data
    if (!review || typeof review !== 'string' || !rating || typeof rating !== 'number' || rating < 1 || rating > 5) {
      console.error("Invalid request data:", { review, rating });
      return res.status(400).json({ error: "Invalid review or rating" });
    }

    try {
      const order = await Order.findById(id);

      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      if (order.status !== 2) {
        console.log("Order status:", order.status);
        return res.status(400).json({ error: "Order not delivered yet" });
      }

      const newReview = new Review({
        orderId: id,
        review,
        rating,
        // userId is not included anymore
      });

      await newReview.save();

      res.status(200).json({ message: "Review submitted successfully" });
    } catch (error) {
      console.error("Error submitting review:", error);
      res.status(500).json({ error: "Failed to submit review" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
