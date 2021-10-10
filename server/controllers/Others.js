import express from "express";
import mongoose from "mongoose";

import Color from "../models/Colors.js";
import Size from "../models/Size.js";
import Categories from "../models/Category.js";

const router = express.Router();

export const getCategories = async (req, res) => {
  try {
    const allCategories = await Categories.find();

    res.status(200).json(allCategories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const AddCategory = async (req, res) => {
  const Category = req.body.newPost;

  const NewCategory = new Categories({
    ...Category,
    /* creator: req.userId, */
  });

  try {
    await NewCategory.save();

    res.status(201).json(NewCategory);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getColors = async (req, res) => {
  try {
    const allColors = await Color.find();

    res.status(200).json(allColors);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const AddColor = async (req, res) => {
  const Colors = req.body.newPost;

  const NewColor = new Color({
    ...Colors,
    /* creator: req.userId, */
  });

  try {
    await NewColor.save();

    res.status(201).json(NewColor);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getSize = async (req, res) => {
  try {
    const allSizes = await Size.find();

    res.status(200).json(allSizes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const AddSize = async (req, res) => {
  const Sizes = req.body.newPost;

  const NewSize = new Size({
    ...Sizes,
    /* creator: req.userId, */
  });

  try {
    await NewSize.save();

    res.status(201).json(NewSize);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export default router;
