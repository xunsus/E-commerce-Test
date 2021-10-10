import mongoose from "mongoose";

const ColorsSchema = mongoose.Schema({
  name: String,
});

var Color = mongoose.model("Color", ColorsSchema);

export default Color;
