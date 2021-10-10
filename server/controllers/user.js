import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import Token from "../models/Token.js";

export const signin = async (req, res) => {
  const { UserName, password } = req.body;

  try {
    const UserInfo = await User.findOne({ UserName });

    if (!UserInfo)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, UserInfo.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    let accessToken = await UserInfo.createAccessToken();
    let refreshToken = await UserInfo.createRefreshToken();

    return res.status(201).json({ UserInfo, accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, UserName } = req.body;

  try {
    const oldUseremail = await User.findOne({ email });

    if (oldUseremail)
      return res.status(400).json({ message: "User already exists" });

    const oldUserUserName = await User.findOne({ UserName });

    if (oldUserUserName)
      return res.status(400).json({ message: "UserName Taken" });

    let UserInfo = await new User(req.body).save();
    let accessToken = await UserInfo.createAccessToken();
    let refreshToken = await UserInfo.createRefreshToken();
    return res.status(201).json({ UserInfo, accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const generateRefreshToken = async (req, res) => {
  try {
    //get refreshToken
    const { refreshToken } = req.body;
    //send error if no refreshToken is sent
    if (!refreshToken) {
      return res.status(403).json({ error: "Access denied,token missing!" });
    } else {
      //query for the token to check if it is valid:
      const tokenDoc = await Token.findOne({ token: refreshToken });
      //send error if no token found:
      if (!tokenDoc) {
        return res.status(401).json({ error: "Token expired!" });
      } else {
        //extract payload from refresh token and generate a new access token and send it
        const payload = jwt.verify(tokenDoc.token, "REFRESH_TOKEN_SECRET");
        const accessToken = jwt.sign({ User: payload }, "ACCESS_TOKEN_SECRET", {
          expiresIn: "10m",
        });
        return res.status(200).json({ accessToken });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};

export const logout = async (req, res) => {
  try {
    //delete the refresh token saved in database:
    const { refreshToken } = req.body;
    await Token.findOneAndDelete({ token: refreshToken });
    return res.status(200).json({ success: "User logged out!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error!" });
  }
};
