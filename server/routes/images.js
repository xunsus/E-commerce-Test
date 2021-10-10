// FIRST => Controllers

import express from "express";

import {
  getimages,
  Createimages,
  updateimages,
} from "../controllers/images.js";

const router = express.Router();
import AdminAuth from "../middleware/AdminAuth.js";

router.get("/", getimages);

router.post("/", Createimages);
router.patch("/admin", AdminAuth, updateimages);

export default router;
