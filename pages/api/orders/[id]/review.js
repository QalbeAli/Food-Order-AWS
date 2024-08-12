import dbConnect from '../../../../util/dbConnect';
import Review from '../../../../models/Review';
import Order from '../../../../models/Order';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  await dbConnect();

  const session = await getSession({ req });
  if (req.method === 'POST') {
    const { review, rating } = req.body;
    const { id } = req.query;

    try {

      const order = await Order.findById(id);

      if (order.status !== 'delivered') {
        return res.status(400).json({ error: 'Order not delivered yet' });
      }
      if (!session) {
        // User is not logged in
        return res.status(401).json({ error: 'You must be logged in to access this resource' });
      }
      const newReview = new Review({
        orderId: id,
        review,
        rating,
        userId: req.user.id,
      });

      await newReview.save();

      res.status(200).json({ message: 'Review submitted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to submit review' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
