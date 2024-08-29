import mongoose from "mongoose";

const Connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");
  } catch (error) {
    console.log("Error is:- ", error.message);
  }
};

export default Connect;
