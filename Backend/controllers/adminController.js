import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    //  Check user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, msg: "Admin not found" });
    }

    //  Check if role is admin
    if (user.role !== "admin") {
      return res.status(403).json({ success: false, msg: "Not authorized as admin" });
    }

    //  Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, msg: "Invalid credentials" });
    }

    //  SUCCESS
    res.json({
      success: true,
      msg: "Admin Logged In Successfully",
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};
