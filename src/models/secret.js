import mongoose from "mongoose";

const Secret = new mongoose.Schema({
  hash: {
    type: String,
    required: [true, "hash is required"],
  },
  secret: {
    type: String,
    required: [true, "secret is required"],
  },
  expireAfterViews: {
    type: Number,
    required: [true, "expireAfterViews is required"],
  },
  expireAfter: {
    type: Number,
    required: [true, "expireAfter is required"],
  },
  remainingViews: {
    type: Number,
    required: [true, "remainingViews is required"],
  },
  createdAt: {
    type: Date,
    required: [true, "createdAt is required"],
  },
});

export default mongoose.model("Secret", Secret);
