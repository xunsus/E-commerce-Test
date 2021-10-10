import express from "express";
import mongoose from "mongoose";

import OrderdItem from "../models/OrderedItem.js";

const router = express.Router();

export const getOrder = async (req, res) => {
  try {
    const Order = await OrderdItem.find({ User: req.params.User });

    res.status(200).json(Order);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createOrder = async (req, res) => {
  const Order = req.body.item;

  const newOrderdItem = new OrderdItem({
    ...Order,
    User: req.body.user,
    createdAt: new Date().toISOString(),
  });

  try {
    await newOrderdItem.save();

    res.status(201).json(newOrderdItem);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const updateOrder = async (req, res) => {
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

  await OrderdItem.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

export const deleteOrder = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await OrderdItem.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};

export default router;
