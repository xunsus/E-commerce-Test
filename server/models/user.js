import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Token from "./Token.js";

const userSchema = mongoose.Schema({
  UserName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  role: { type: String, enum: ["admin", "staff", "user"], default: "user" },
});

//define schema level methods to create access token and refresh token:
userSchema.methods = {
  createAccessToken: async function () {
    try {
      let { _id, UserName } = this;
      let accessToken = jwt.sign(
        { user: { _id, UserName } },
        "ACCESS_TOKEN_SECRET",
        {
          expiresIn: "10m",
        }
      );
      return accessToken;
    } catch (error) {
      console.error(error);
      return;
    }
  },
  createRefreshToken: async function () {
    try {
      let { _id, UserName } = this;
      let refreshToken = jwt.sign(
        { user: { _id, UserName } },
        "REFRESH_TOKEN_SECRET",
        {
          expiresIn: "1d",
        }
      );
      await new Token({ token: refreshToken }).save();
      return refreshToken;
    } catch (error) {
      console.error(error);
      return;
    }
  },
}; //pre save hook to hash password before saving user into the database:
userSchema.pre("save", async function (next) {
  try {
    let salt = await bcrypt.genSalt(12); // generate hash salt of 12 rounds
    let hashedPassword = await bcrypt.hash(this.password, salt); // hash the current user's password
    this.password = hashedPassword;
  } catch (error) {
    console.error(error);
  }
  return next();
});

export default mongoose.model("User", userSchema);
