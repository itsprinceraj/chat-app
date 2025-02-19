import { Request, Response } from "express";
import { AppDataSource } from "../common/services/database.service";
import { Group } from "./group.schema";
import { User } from "../user/user.schema";
import expressAsyncHandler from "express-async-handler";
import { IUser } from "../user/user.dto";

// create repository of all entities;
const userRepo = AppDataSource.getRepository(User);
const groupRepo = AppDataSource.getRepository(Group);

export const createGrp = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { name, isPublic } = req.body;

    if (!req.user || !(req.user as IUser).id) {
      res.status(401).json({ message: "Unauthorized", success: false });
      return;
    }

    const userId = (req.user as IUser).id;

    const user = await userRepo.findOne({
      where: { id: userId },
      relations: ["groups"],
    });

    if (!user) {
      res.status(404).json({ message: "User not found", success: false });
      return;
    }

    const newGroup = groupRepo.create({ name, isPublic });
    await groupRepo.save(newGroup);

    // Set user as admin of the group
    user.role = "admin";
    user.groups = [...user.groups, newGroup];

    await userRepo.save(user);
    newGroup.members = [...(newGroup.members || []), user];
    await groupRepo.save(newGroup);

    const groupResponse = {
      id: newGroup.id,
      name: newGroup.name,
      isPublic: newGroup.isPublic,
      members: newGroup.members.map((member) => ({
        id: member.id,
        email: member.email,
        role: member.role,
      })),
    };

    res.status(201).json({
      message: "Group created successfully",
      group: groupResponse,
      success: true,
    });
  }
);

// join public group
export const joinPublicGroup = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const groupId = req.params.groupId;

    if (!req.user || !(req.user as IUser).id) {
      res.status(401).json({ message: "Unauthorized", success: false });
      return;
    }

    const userId = (req.user as IUser).id;

    const group = await groupRepo.findOne({
      where: { id: groupId },
      relations: ["members"],
    });

    console.log("group:", group);

    if (!group) {
      res.status(404).json({ message: "Group not found", success: false });
      return;
    }

    const user = await userRepo.findOne({
      where: { id: userId },
      relations: ["groups"],
    });

    if (!user) {
      res.status(404).json({ message: "User not found", success: false });
      return;
    }

    const isMember = group.members.some((member) => member.id === userId);

    if (isMember) {
      res.status(400).json({ message: "Already a member", success: false });
      return;
    }

    // using transaction to save both entities at one time
    await user.groups.push(group);
    await group.members.push(user);

    const groupResponse = {
      id: group.id,
      name: group.name,
      isPublic: group.isPublic,
      members: group.members.map((member) => ({
        id: member.id,
        email: member.email,
        role: member.role,
      })),
    };

    res.status(201).json({
      message: "Joined group successfully",
      group: groupResponse,
      success: true,
    });
  }
);
