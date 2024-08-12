import dbConnect from '../../../../util/dbConnect';
import Review from '../../../../models/Review';

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  try {
    const reviews = await Review.find({ orderId: id }).populate('userId', 'name');
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
}
