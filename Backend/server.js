import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import Connect from "./MongoDB/MongoConnect.js";
import userRouter from "./Routes/User.route.js";
import adminRouter from "./Routes/Admin.route.js";
import aliensRouter from "./Routes/Aliens.route.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your client's origin
    credentials: true, // Allows cookies to be sent and received
  })
);

const port = process.env.PORT;

app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/aliens", aliensRouter);

app.listen(port, async () => {
  await Connect();
  console.log(`Server Running at port ${port}`);
});
