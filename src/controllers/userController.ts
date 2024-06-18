import { Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  const { fullName, login, password } = req.body;

  try {
    const user = new User({ fullName, login, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { login, password } = req.body;

  try {
    const user = await User.findOne({ login });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
