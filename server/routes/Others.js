import express from "express";

import {
  AddCategory,
  getCategories,
  getColors,
  AddColor,
  getSize,
  AddSize,
} from "../controllers/Others.js";

const router = express.Router();
import AdminAuth from "../middleware/AdminAuth.js";

router.get("/Categories", getCategories);
router.post("/Categories", AdminAuth, AddCategory);

router.get("/Colors", getColors);
router.post("/Colors", AdminAuth, AddColor);

router.get("/Sizes", getSize);
router.post("/Sizes", AdminAuth, AddSize);

export default router;
