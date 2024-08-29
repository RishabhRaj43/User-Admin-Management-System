import User from "../Models/User.model.js";
import bcrypt from "bcryptjs";
import jsonSetToken from "../utils/jsonWebToken.User.js";

const signupUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json("All Fields are Important");
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json("User Already again");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      const token = jsonSetToken(newUser._id, res);
      await newUser.save();
      res.status(200).json({
        token: token,
        message: "Login Successful",
      });
    }
  } catch (error) {
    res.status(400).json("Something Went Wrong");
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("All Fields are Important");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json("User Not Found");
    }

    if (user.isBanned) {
      if (req.cookies.token_user) {
        res.clearCookie("token_user");
      }
      return res.status(400).json("User is Banned");
    }

    if (req.cookies.token_user) {
      return res.status(400).json("Already Logged In");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json("Incorrect Password");
    }

    const token = jsonSetToken(user._id, res);

    res.status(200).json({
      token: token,
      message: "Login Successful",
    });
  } catch (error) {
    res.status(400).json("Something Went Wrong");
  }
};

const logoutUser = async (req, res) => {
  try {
    if (!req.cookies.token_user) {
      return res.status(400).json("No token found");
    }
    res.clearCookie("token_user");
    res.status(200).json("Logout Successful");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const editUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (username) {
      req.users.username = username;
    }

    if (email) {
      req.users.email = email;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      req.users.password = hashedPassword;
    }

    if (tokenRefreshed) {
      jsonSetToken(req.users._id, res);
    }

    await req.users.save();

    res.status(200).json("User Edited Successful");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export { signupUser, loginUser, logoutUser, editUser };
