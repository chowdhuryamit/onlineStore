import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const userLogin = async (req, res) => {
  try {
    const { password, passkey } = req.body;
    if (!passkey || !password) {
      return res
        .status(400)
        .json({ success: false, message: "credentails are missing" });
    }
    if (password !== process.env.PASSWORD || passkey !== process.env.PASSKEY) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user credentials" });
    }
    const token = jwt.sign(
      {
        email: process.env.EMAIL,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "error while generating access token",
      });
    }
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    };

    return res
      .status(200)
      .cookie("plb", token, options)
      .json({ success: true, message: "Pallab logged in successfully" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const userLogout = async (req, res) => {
  try {
    if (!req.email || req.email !== process.env.EMAIL) {
      return res.status(400).json({ success: false, message: "invalid user" });
    }
    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    };

    return res
      .status(200)
      .clearCookie("plb", options)
      .json({
        success: true,
        message: `pallab logged out successfully.`,
      });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export { userLogin,userLogout};
