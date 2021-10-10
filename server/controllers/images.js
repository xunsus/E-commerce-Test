//SECONDE

import express from "express";
import mongoose from "mongoose";

import images from "../models/images.js";

const router = express.Router();

export const getimages = async (req, res) => {
  try {
    const image = await images.find();

    res.status(200).json(image);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const Createimages = async (req, res) => {
  const image = req.body;

  const newimage = new images({ ...image });

  try {
    await newimage.save();

    res.status(201).json(newimage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateimages = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, Categories } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = {
    creator,
    title,
    message,
    Categories,
    selectedFile,
    _id: id,
  };

  await images.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

export default router;
