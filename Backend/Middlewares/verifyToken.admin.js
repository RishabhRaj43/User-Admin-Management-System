import Admin from "../Models/Admin.model.js";
import jwt from "jsonwebtoken";

const verifyAdminToken = async (req, res, next) => {
  const token = req.cookies.token_admin;

  if (!token) {
    return res.status(400).json("No Admin token found");
  }
  const decoded_admin = jwt.verify(token, process.env.SECRET_KEY_ADMIN);

  if (!decoded_admin) {
    return res.status(400).json("Invalid Token");
  }

  const admin = await Admin.findById(decoded_admin.userid);

  if (!admin) {
    return res.status(400).json("Admin not found");
  }

  req.admin = admin;

  next();
};

export default verifyAdminToken;
