import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../services/database.service";
import { User } from "../../user/user.schema";
import asyncHandler from "express-async-handler";
import expressAsyncHandler from "express-async-handler";
import { IUser } from "../../user/user.dto";

const userRepo = AppDataSource.getRepository(User);

//  Authenticate JWT Access Token
export const authenticate = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Token not found", success: false });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };

    const user = await userRepo.findOne({
      where: { id: decoded.id },
      select: ["id", "role"],
    });

    if (!user) {
      res.status(401).json({ message: "Invalid token", success: false });
      return;
    }

    req.user = { id: user.id, role: user.role } as IUser;
    // console.log((req.user as IUser).id);
    next();
  }
);

// // role-auth middleware
export const authorizeRoles = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({
        message: "Forbidden: Insufficient Permissions",
        success: false,
      });
      return;
    }
    next();
  };
};

// generate new access token

export const refreshTokenHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(401).json({ message: "token not found", success: false });
      return;
    }

    try {
      const decoded: any = jwt.verify(refreshToken, process.env.JWT_SECRET!);
      const user = await userRepo.findOne({ where: { id: decoded.id } });

      if (!user) {
        res.status(401).json({ message: "invalid token", success: false });
        return;
      }

      // Generate new access token
      const newAccessToken = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: "15m" }
      );

      res.json({ accessToken: newAccessToken });
    } catch (err) {
      res.status(403).json({ message: "token expired", success: false });
    }
  }
);
