import mongoose from "mongoose";

const AlienSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    species: {
      type: String,
      required: true,
    },
    img:{
      type: String,
      required: true,
    },
    planet: {
      type: String,
      required: true,
    },
    powers: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    firstApp: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Aliens = mongoose.model("Aliens", AlienSchema);
export default Aliens;
