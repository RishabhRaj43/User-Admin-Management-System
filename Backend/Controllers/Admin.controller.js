import Admin from "../Models/Admin.model.js";
import Aliens from "../Models/Aliens.model.js";
import User from "../Models/User.model.js";
import jsonSetToken from "../utils/jsonWebToken.Admin.js";
import bcrypt from "bcryptjs";

const signupAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (
      !req.body.secretKey ||
      req.body.secretKey !== process.env.SECRET_KEY_ADMIN
    ) {
      return res.status(400).json({ message: "Pls provide the correct key" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await Admin.findOne({ email });

    if (user) {
      res.status(400).send("Admin already exists");
    }

    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
      isAdmin: true,
    });

    const token = jsonSetToken(newAdmin._id, res);

    await newAdmin.save();

    res.status(201).json({
      message: "New Admin Created",
      token: token,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json("Admin not found");
    }

    if (req.cookies.token_admin) {
      return res.status(400).json("Already Logged In");
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json("Incorrect Password");
    }

    const token = jsonSetToken(admin._id, res);

    res.status(200).json({
      message: "Login Successful",
      token: token,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const logoutAdmin = async (req, res) => {
  try {
    if (!req.cookies.token_admin) {
      return res.status(400).json("No token found");
    }
    res.clearCookie("token_admin");
    res.status(200).json("Logout Successful");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const editAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let tokenNeedsRefresh = false;

    if (!username && !email && !password) {
      return res.status(400).json("No fields to edit");
    }

    if (username) req.admin.username = username;
    if (email) {
      req.admin.email = email;
      tokenNeedsRefresh = true;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      req.admin.password = hashedPassword;
    }

    if (tokenNeedsRefresh) {
      jsonSetToken(req.admin._id, res);
    }

    await req.admin.save();

    res.status(200).json("Edited Successful");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json({
      users: users,
      message: "All Users",
    });
  } catch (error) {
    res.status(400).json("Internal Server Error");
  }
};

const editAdminUser = async (req, res) => {};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.staus(200).json("Deleted Sucessfully");
  } catch (error) {
    res.status(400).json("Deleted Sucessfully");
  }
};

const banUser = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).json("ID not found");
    console.log(req.params.id);
    
    
    const user = await User.findById(req.params.id);
    console.log(user);

    if (!user) {
      return res.status(400).json("User not found");
    }
    user.isBanned = true;

    await user.save();

    console.log("Banned");
    
    res.status(200).json("User banned");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const unbanUser = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).json("ID not found");

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(400).json("User not found");
    }

    user.isBanned = false;

    await user.save();

    res.status(200).json("User unbanned");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const likeAlien = async (req, res) => {
  const { id } = req.body;

  try {
    const alien = await Aliens.findById(id);

    if (!alien) {
      return res.status(404).json({ message: "Alien not found" });
    }

    if (!req.admin.likes.includes(id)) {
      req.admin.likes.push(id);
    }

    await req.admin.save();

    return res.status(200).json({ message: "Alien liked successfully", alien });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getLikeAlien = async (req, res) => {
  try {
    const { likes } = await Admin.findById(req.admin._id);

    const likesArr = await Promise.all(
      likes.map(async (item) => {
        return await Aliens.findById(item);
      })
    );

    return res.status(200).json({ message: "Likes", likesArr });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export {
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
  getLikeAlien,
};
