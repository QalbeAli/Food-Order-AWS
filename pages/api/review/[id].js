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




// import axios from "axios";

// const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api"
// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     const { review, rating } = req.body;
//     const { id } = req.query;

//     console.log({
//       review, id, rating
//     })

//     if (!id || !review || !rating) {
//       return res.status(301).json({ message: `id:${id} or review:${review}  and rating:${rating} wrong` })
//     }

//     try {

//       res.status(200).json({ message: "Review submitted successfully" });
//     } catch (error) {
//       res.status(500).json({ error: "Failed to submit review" });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
