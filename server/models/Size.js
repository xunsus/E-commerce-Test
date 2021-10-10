import mongoose from "mongoose";

const SizesSchema = mongoose.Schema({
  name: String,
});

var Size = mongoose.model("Size", SizesSchema);

export default Size;
