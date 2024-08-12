// models/Review.js

import mongoose from "mongoose";

const { Schema } = mongoose;

const reviewSchema = new Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order", // Assuming you have an Order model
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;
