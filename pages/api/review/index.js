import Review from "../../../models/Review";
import dbConnect from "../../../util/dbConnect";

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    try {
      const Reviews = await Review.find();
      res.status(200).json(Reviews);
    } catch (err) {
      console.log(err);
    }
  }

  if (method === "POST") {
    try {




      const newReview = await Review.create(req.body);
      res.status(201).json(newReview);
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler;
