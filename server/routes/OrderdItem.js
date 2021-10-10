import express from "express";
import {
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/OrderdItem.js";

const router = express.Router();
import Userauth from "../middleware/Userauth.js";

router.get("/:User", Userauth, getOrder);

router.post("/", Userauth, createOrder);
router.patch("/:id", Userauth, updateOrder);
router.delete("/:id", Userauth, deleteOrder);

export default router;
