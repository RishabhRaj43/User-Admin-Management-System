import express from "express";
import {
  signupAdmin,
  loginAdmin,
  logoutAdmin,
  editAdmin,
  getAllUser,
  editAdminUser,
  deleteUser,
  banUser,
  unbanUser,
  likeAlien,
  getLikeAlien
} from "../Controllers/Admin.controller.js";
import verifyAdminToken from "../Middlewares/verifyToken.admin.js";

const adminRouter = express.Router();

adminRouter.post("/signup", signupAdmin);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/logout", logoutAdmin);
adminRouter.put("/edit", verifyAdminToken, editAdmin);

adminRouter.get("/getallUser",verifyAdminToken, getAllUser);
adminRouter.put("/editUser/:id", verifyAdminToken, editAdminUser);
adminRouter.delete("/deleteUser/:id", verifyAdminToken, deleteUser);
adminRouter.put("/banUser/:id", verifyAdminToken, banUser);
adminRouter.put("/unbanUser/:id", verifyAdminToken, unbanUser);


adminRouter.post("/like", verifyAdminToken, likeAlien);
adminRouter.get("/likealiens", verifyAdminToken, getLikeAlien);



export default adminRouter;
