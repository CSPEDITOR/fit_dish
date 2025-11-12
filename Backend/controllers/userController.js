import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import crypto from "crypto";
import nodemailer from "nodemailer";

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Signup
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Forgot Password ---
// --- Forgot Password ---
// export const forgotPassword = async (req, res) => {
//   const { email } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(404).json({ message: "No account found with this email" });

//     // Generate token and save
//     const token = crypto.randomBytes(32).toString("hex");
//     user.resetToken = token;
//     user.resetTokenExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
//     await user.save();

//     const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

//     // Initialize resend with your API key
//     const resend = new Resend(process.env.RESEND_API_KEY);
//     console.log(resend)
//     // ✅ Important: You must use onboarding@resend.dev unless you verify a domain
//     await resend.emails.send({
//       from: 'Acme <onboarding@resend.dev>',
//       to: email,
//       subject: "Password Reset Request - FitDish",
//       html: `
//         <h2>Hi ${user.name || "User"},</h2>
//         <p>You requested to reset your password.</p>
//         <p>Click the link below to reset it:</p>
//         <a href="${resetLink}" style="color:#4f46e5; font-weight:bold;">Reset Password</a>
//         <p>This link will expire in 15 minutes.</p>
//         <br/>
//         <p>– The FitDish Team</p>
//       `,
//     });

//     res.json({ message: "Password reset link sent to your email" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error sending email" });
//   }
// };

// ...other imports remain same

// --- Forgot Password ---
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "No account found with this email" });

    // Generate token and save
    const token = crypto.randomBytes(32).toString("hex");
    console.log(token);
    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();
    
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    console.log(resetLink);
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,          // e.g. smtp.gmail.com
      port: process.env.SMTP_PORT,          // e.g. 587
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,        // your SMTP username
        pass: process.env.SMTP_PASS,        // your SMTP password or app password
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"FitDish Team" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Password Reset Request - FitDish",
      html: `
        <h2>Hi ${user.name || "User"},</h2>
        <p>You requested to reset your password.</p>
        <p>Click the link below to reset it:</p>
        <a href="${resetLink}" style="color:#4f46e5; font-weight:bold;">Reset Password</a>
        <p>This link will expire in 15 minutes.</p>
        <br/>
        <p>– The FitDish Team</p>
      `,
    });

    res.json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending email" });
  }
};



// --- Reset Password ---
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password" });
  }
};

