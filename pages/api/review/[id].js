import Review from "../../../models/Review";
import dbConnect from "../../../util/dbConnect";

const handler = async (req, res) => {
  await dbConnect();
  const {
    method,
    query: { id },
  } = req;

  if (method === "GET") {
    try {
      const reviews = await Review.findById(id);
      res.status(200).json(reviews);
    } catch (err) {
      console.log(err);
    }
  }

  if (method === "DELETE") {
    try {
      const reviews = await Review.findByIdAndDelete(id);
      res.status(200).json(reviews);
    } catch (error) {
      console.log(error);
    }
  }
};

export default handler;