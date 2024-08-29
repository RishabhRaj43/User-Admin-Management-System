import express from "express";

import {
  signupUser,
  loginUser,
  logoutUser,
  editUser 
} from "../Controllers/User.controller.js";
import verifyUserToken from "../Middlewares/verifyToken.user.js";
import checkBan from "../Middlewares/checkBan.user.js";

const userRouter = express.Router();

userRouter.post("/signup", signupUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.put("/edit", verifyUserToken, checkBan ,editUser);

export default userRouter;
