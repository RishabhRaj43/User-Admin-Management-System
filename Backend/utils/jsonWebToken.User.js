import jwt from "jsonwebtoken";

const jsonSetToken = (userid, res) => {
  const token = jwt.sign({ userid }, process.env.SECRET_KEY_USER, {
    expiresIn: "1d",
  });

  res.cookie("token_user", token, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

export default jsonSetToken;
