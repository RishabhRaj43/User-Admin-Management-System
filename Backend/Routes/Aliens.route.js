import express from "express";
import Aliens from "../Models/Aliens.model.js";
import verifyAdminToken from "../Middlewares/verifyToken.admin.js";

const aliensRouter = express.Router();

aliensRouter.get("/list", async (req, res) => {
  try {
    const aliens = await Aliens.find({});

    res.status(200).json({
      message: "List of Aliens",
      aliens: aliens,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

aliensRouter.post("/add", verifyAdminToken, async (req, res) => {
  try {
    const { name, species, img, planet, powers, Description, firstApp } =
      req.body;

    if (
      !name ||
      !species ||
      !img ||
      !planet ||
      !powers ||
      !Description ||
      !firstApp
    ) {
      return res.status(400).json("All fields are required");
    }

    const alien = await Aliens.findOne({ name });

    if (alien) {
      return res.status(400).json("Alien already exists");
    }

    const newAlien = new Aliens({
      name,
      species,
      img,
      planet,
      powers,
      Description,
      firstApp,
    });

    await newAlien.save();

    res.status(200).json("Aliens Added");
  } catch (error) {
    res.status(400).json(error.message);
  }
});

export default aliensRouter;
