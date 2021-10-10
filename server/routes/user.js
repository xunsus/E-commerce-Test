import express from "express";
const router = express.Router();

import checkAuth from "../controllers/checkAuth.js";
import {
  signin,
  signup,
  logout,
  generateRefreshToken,
} from "../controllers/user.js";

router.post("/signin", signin);
router.post("/signup", signup);
router.delete("/logout", logout);
router.post("/refresh_token", generateRefreshToken);
router.get("/protected_resource", checkAuth, (req, res) => {
  return res.status(200).json({ user: req.user });
});

export default router;
