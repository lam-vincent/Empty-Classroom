import { Request, Response } from "express";
import groupService from "../services/groupService";

export const getAllGroups = async (req: Request, res: Response) => {
  try {
    const groups = await groupService.fetchAllGroups();
    res.json(groups);
  } catch (error) {
    console.error("Error fetching groups:", error);
    res.status(500).json({ message: "Error fetching groups" });
  }
};

export const getGroupsByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    console.log("userId", userId);
    const groups = await groupService.fetchGroupsByUser(userId);
    res.json(groups);
  } catch (error) {
    console.error("Error fetching groups by user:", error);
    res.status(500).json({ message: "Error fetching groups by user" });
  }
};

export const getGroupsByStatus = async (req: Request, res: Response) => {
  try {
    const status = req.params.status;
    const groups = await groupService.fetchGroupsByStatus(status);
    res.json(groups);
  } catch (error) {
    console.error("Error fetching groups by status:", error);
    res.status(500).json({ message: "Error fetching groups by status" });
  }
};

export const createGroup = async (req: Request, res: Response) => {
  try {
    const groupData = req.body;
    await groupService.createGroup(groupData);
    res.status(201).json({ message: "Group created successfully" });
  } catch (error) {
    console.error("Error creating group:", error);
    res.status(500).json({ message: "Error creating group" });
  }
};

export const updateGroupById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const groupData = req.body;
    await groupService.updateGroupById(id, groupData);
    res.json({ message: "Group updated successfully" });
  } catch (error) {
    console.error("Error updating group:", error);
    res.status(500).json({ message: "Error updating group" });
  }
};

export const deleteGroupById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await groupService.deleteGroupById(id);
    res.json({ message: "Group deleted successfully" });
  } catch (error) {
    console.error("Error deleting group:", error);
    res.status(500).json({ message: "Error deleting group" });
  }
};

export const joinGroup = async (req: Request, res: Response) => {
  try {
    const { id_user, id_group } = req.body;
    await groupService.joinGroup(id_user, id_group);
    res.json({ message: "Joined group successfully" });
  } catch (error) {
    console.error("Error joining group:", error);
    res.status(500).json({ message: "Error joining group" });
  }
};
