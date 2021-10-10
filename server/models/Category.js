import mongoose from "mongoose";

const CategoriesSchema = mongoose.Schema({
  name: String,
});

var Category = mongoose.model("Category", CategoriesSchema);

export default Category;
