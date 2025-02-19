import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AppDataSource } from "../common/services/database.service";
import { User } from "./user.schema";
import { Group } from "../group-chat/group.schema";
import { IUser } from "./user.dto";
import jwt from "jsonwebtoken";

// Repository
const userRepo = AppDataSource.getRepository(User);
const groupRepo = AppDataSource.getRepository(Group);

//join invitaion ;
export const acceptGroupInvitation = asyncHandler(
  async (req: Request, res: Response) => {
    const { token } = req.params;

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized", success: false });
      return;
    }

    const userId = (req.user as IUser).id;

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const { groupId } = decoded;

    // Find the user with their groups
    const user = await userRepo.findOne({
      where: { id: userId },
      relations: ["groups"],
    });

    if (!user) {
      res.status(404).json({ message: "User not found", success: false });
      return;
    }

    const group = await groupRepo.findOne({
      where: { id: groupId },
      relations: ["members"],
    });

    if (!group) {
      res.status(404).json({ message: "Group not found", success: false });
      return;
    }

    if (user.groups.some((g) => g.id === groupId)) {
      res.status(400).json({
        message: "You are already in this group",
        success: false,
      });
      return;
    }

    user.groups.push(group);
    await userRepo.save(user);

    group.members.push(user);
    await groupRepo.save(group);

    res.status(201).json({
      success: true,
      message: "Group joined successfully",
      group: {
        id: group.id,
        name: group.name,
        isPublic: group.isPublic,
        members: group.members.map((m) => ({
          id: m.id,
          email: m.email,
        })),
      },
    });
  }
);

// send request to join a private group
export const sendReqToJoinPvtGrp = asyncHandler(
  async (req: Request, res: Response) => {
    const { groupId } = req.params;
    const userId = (req.user as IUser).id;

    const group = await groupRepo.findOne({
      where: { id: groupId, isPublic: false },
      relations: ["admin"],
    });

    if (!group) {
      res
        .status(404)
        .json({ message: "Private group not found", success: false });
      return;
    }

    res.status(201).json({
      message: "Request sent to group admin",
      adminId: group.id,
      success: true,
    });
  }
);
