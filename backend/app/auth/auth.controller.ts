import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../common/services/database.service";
import { User } from "../user/user.schema";
import asyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
console.log(JWT_SECRET);

/**
 * @desc User Signup
 * @route POST /api/v1/auth/signup
 * @access Public
 */

export const signup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
      return;
    }

    const { email, password } = req.body;
    const userRepo = AppDataSource.getRepository(User);

    const existingUser = await userRepo.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "email already taken" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = userRepo.create({
      email,
      password: hashedPassword,
    });
    const userData = await userRepo.save(newUser);
    userData.password = "";

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      userData,
    });
  }
);

/**
 * @desc User Login
 * @route POST /api/auth/login
 * @access Public
 */

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
      return;
    }

    const { email, password } = req.body;
    const userRepo = AppDataSource.getRepository(User);

    const user = await userRepo.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }
    user.password = "";

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.status(201).json({
      success: true,
      message: "User logged in",
      user,
      accessToken,
      refreshToken,
    });
  }
);
