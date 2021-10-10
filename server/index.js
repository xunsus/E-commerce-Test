import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts.js";
import CartRoutes from "./routes/OrderdItem.js";
import userRouter from "./routes/user.js";
import imageRouter from "./routes/images.js";
import OtherRouter from "./routes/Others.js";

const app = express();

app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRouter);
app.use("/Cart", CartRoutes);
app.use("/images", imageRouter);
app.use("/assets", OtherRouter);

const CONNECTION_URL =
  "mongodb+srv://Adel:24861379@cluster0.cwvy4.mongodb.net/Cluster0?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set("useFindAndModify", false);
