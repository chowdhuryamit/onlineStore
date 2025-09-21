import jwt from "jsonwebtoken";

const verifyJWT = async (req, res, next) => {
  try {
    const token = req.cookies.plb;
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "Access denied! no token provided" });
    }
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!payload || payload.email !== process.env.EMAIL) {
      return res
        .status(400)
        .json({ success: false, message: "Access denied! invalid token" });
    }
    req.email=payload.email;
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "error ocured while validating user" });
  }
};

export { verifyJWT };
