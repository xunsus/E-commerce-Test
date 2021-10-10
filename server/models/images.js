import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
  image1: String,
  image2: String,
  image3: String,
  image4: String,
  image5: String,
});

var images = mongoose.model("images", imageSchema);

export default images;
