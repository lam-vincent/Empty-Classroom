import { Request, Response } from "express";
import groupService from "../services/groupService";
import { ResultSetHeader } from "mysql2";

export const getAllGroups = async (req: Request, res: Response) => {
  try {
    const groups = await groupService.fetchAllGroups();
    res.json(groups);
  } catch (error) {
    console.error("Error fetching groups:", error);
    res.status(500).json({ message: "Error fetching groups" });
  }
};

export const getAllBelongings = async (req: Request, res: Response) => {
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
    const myGroup: any = await groupService.createGroup(groupData);

    if (myGroup && "insertId" in myGroup) {
      const insertId = myGroup.insertId;
      await groupService.createBelonging(groupData.Group_Owner, insertId);

      console.log("Group and belonging created successfully!");
      res.status(201).json({ message: "Group created successfully" });
    } else {
      console.log(myGroup);
      console.error("Group creation failed.");
      res.status(500).json({ message: "Error creating group" });
    }
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

export const getGroupMembers = async (req: Request, res: Response) => {
  try {
    const groupId = req.params.groupId;
    const groupMembers = await groupService.fetchUsersByGroup(groupId);
    res.json({ groupMembers });
  } catch (error) {
    console.error("Error deleting group:", error);
    res.status(500).json({ message: "Error deleting group" });
  }
};

export const quitGroup = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const groupId = req.params.groupId;
    await groupService.quitGroup(userId, groupId);
    res.json({ message: "Group left successfully" });
  } catch (error) {
    console.error("Error leaving group:", error);
    res.status(500).json({ message: "Error leaving group" });
  }
};

export const joinGroup = async (req: Request, res: Response) => {
  try {
    const { id_user, id_group } = req.body;
    const userInGroupCheck: any = await groupService.checkUserGroup(
      id_user,
      id_group
    );
    if (userInGroupCheck.length > 0) {
      throw new Error("This user already belong to this group.");
    } else {
      await groupService.joinGroup(id_user, id_group);
      res.json({ message: "Group joined successfully" });
    }
  } catch (error) {
    console.error("Error joining group:", error);
    res.status(500).json({ message: "Error joining group" });
  }
};
