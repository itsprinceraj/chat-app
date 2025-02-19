import { Request, Response } from "express";
import { AppDataSource } from "../common/services/database.service";
import { Group } from "../group-chat/group.schema";
import { User } from "../user/user.schema";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { IUser } from "../user/user.dto";

// create repository of all entities;
const userRepo = AppDataSource.getRepository(User);
const groupRepo = AppDataSource.getRepository(Group);

// get all users (super-admin)
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await userRepo.find();
  if (users.length === 0) {
    res.status(404).json({ success: false, message: "No user found" });
    return;
  }
  res.status(201).json({ success: true, users, message: "All user Fetched" });
});

// get a single user by id (super-admin)
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.id;

  const user = await userRepo.findOne({
    where: { id: userId },
    select: ["id", "email", "role"],
  });

  if (!user) {
    res.status(404).json({ success: false, message: "User not found" });
    return;
  }

  res
    .status(201)
    .json({ success: true, message: "user fetched successfully", user });
});

//Delete User (super-admin)
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.id;
  if (!userId) {
    res.status(404).json({
      success: false,
      message: "user not found",
    });
  }
  await userRepo.delete(userId);
  res.json({ success: true, message: "User deleted successfully" });
});

// App analytics (super-admin)
export const getGrpAnalytics = asyncHandler(
  async (req: Request, res: Response) => {
    const adminId = (req.user as IUser).id;
    if (!adminId) {
      res.status(401).json({ message: "Unauthorized", success: false });
      return;
    }

    const totalUsers = await userRepo.count();
    const totalGroups = await groupRepo.count();
    const groupDetails = await groupRepo.find({
      relations: ["members"],
    });

    const groupStats = groupDetails.map((group) => ({
      groupId: group.id,
      name: group.name,
      totalMembers: group.members.length,
    }));

    res.status(201).json({
      success: true,
      mesage: "data fetched successfully",
      totalUsers,
      totalGroups,
      groupStats,
    });
  }
);

// generate invitation link
export const generateGroupInvitationLink = asyncHandler(
  async (req: Request, res: Response) => {
    const { groupId } = req.body;

    if (!req.user || !groupId) {
      res.status(401).json({ message: "Unauthorized", success: false });
      return;
    }

    const senderId = (req.user as IUser).id;
    const group = await groupRepo.findOne({
      where: { id: groupId },
      relations: ["members"],
    });

    if (!group) {
      res.status(404).json({ message: "Group not found", success: false });
      return;
    }

    const isAdmin = group.members.some(
      (member) => member.id === senderId && member.role === "admin"
    );

    if (!isAdmin) {
      res
        .status(403)
        .json({ message: "Only admins can generate invites", success: false });
      return;
    }

    // link validity 24 hrs
    const token = jwt.sign({ groupId }, process.env.JWT_SECRET!, {
      expiresIn: "24h",
    });

    const invitationLink = `${process.env.FRONTEND_URL}/join-group/${token}`;

    res.status(201).json({
      message: "Invitation link generated successfully",
      success: true,
      invitationLink,
    });
  }
);

// approve join Req
export const approveJoinReq = asyncHandler(
  async (req: Request, res: Response) => {
    const { groupId, userId } = req.body;

    if (!req.user) {
      res.status(401).json({ message: "Unauthorized", success: false });
      return;
    }

    // console.log("admin-controller", req.user);
    const adminId = (req.user as IUser).id;
    const group = await groupRepo.findOne({
      where: { id: groupId, isPublic: false },
      relations: ["admin", "members"],
    });

    if (!group) {
      res.status(404).json({ message: "Group not found", success: false });
      return;
    }

    if (group.id !== adminId) {
      res
        .status(403)
        .json({ message: "Only admin can approve requests", success: false });
      return;
    }

    const user = await userRepo.findOne({ where: { id: userId } });

    if (!user) {
      res.status(404).json({ message: "User not found", success: false });
      return;
    }

    if (group.members.some((member) => member.id === userId)) {
      res
        .status(400)
        .json({ message: "User is already a member", success: false });
      return;
    }

    group.members.push(user);
    await groupRepo.save(group);

    res
      .status(201)
      .json({ message: "User added to the group", group, success: true });
  }
);
