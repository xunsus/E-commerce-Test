// FIRST => Controllers

import express from "express";

import {
  getPosts,
  getPostsBySearch,
  getPost,
  createPost,
  updatePost,
  Reviews,
  deletePost,
} from "../controllers/posts.js";

const router = express.Router();
import AdminAuth from "../middleware/AdminAuth.js";

router.get("/search", getPostsBySearch);
router.get("/", getPosts);
router.get("/:id", getPost);

router.post("/", AdminAuth, createPost);
router.patch("/:id", AdminAuth, updatePost);
router.delete("/:id", AdminAuth, deletePost);
router.post("/:id/Reviews", AdminAuth, Reviews);

export default router;
