import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  creator: String,
  title: String,
  Overview: String,
  Price: Number,
  Categories: [String],
  Colors: Array,
  Sizes: Array,
  image: String,
  Reviews: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
