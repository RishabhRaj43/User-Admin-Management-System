const checkBan = async (req, res, next) => {
  try {
    if (req.users.isBanned) {
      return res.status(400).json("User is banned");
    }
    next();
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export default checkBan;
