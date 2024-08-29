import jwt from "jsonwebtoken";
import User from "../Models/User.model.js";

const verifyUserToken = async (req, res, next) => {
  const token = req.cookies.token_user;

  if (!token) {
    return res.status(400).json("No token found");
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY_USER);

  if (!decoded) {
    return res.status(400).json("Invalid Token");
  }

  let users = await User.findById(decoded.userid);

  if (!users) {
    return res.status(400).json("Users not found");
  }

  req.users = users;

  next();
};

export default verifyUserToken;
