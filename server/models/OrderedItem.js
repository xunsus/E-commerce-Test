import mongoose from "mongoose";

const OrderdItemSchema = mongoose.Schema({
  User: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ordered: {
    type: Boolean,
    default: false,
  },
  id: String,
  Color: String,
  Size: String,
  Quantity: Number,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var OrderdItem = mongoose.model("OrderdItem", OrderdItemSchema);

export default OrderdItem;
