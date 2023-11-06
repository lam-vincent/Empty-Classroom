import { Request, Response } from "express";
import dashboardService from "../services/dashboardService";

export const getPreferredClassrooms = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  console.log("userId", userId);

  try {
    const preferredClassrooms = await dashboardService.fetchPreferredClassrooms(
      userId
    );

    res.status(200).json({
      message: "Preferred classrooms fetched",
      preferredClassrooms: preferredClassrooms,
    });
  } catch (error) {
    console.error("Error fetching preferred classrooms:", error);
    res.status(500).json({ message: "Error fetching preferred classrooms" });
  }
};

export const addPreferredClassroom = async (req: Request, res: Response) => {
  const { userId, roomId } = req.body;

  try {
    await dashboardService.insertPreferredClassroom(userId, roomId);

    res.status(201).json({ message: "Preferred classroom added successfully" });
  } catch (error) {
    console.error("Error adding preferred classroom:", error);
    res.status(500).json({ message: "Error adding preferred classroom" });
  }
};

export const updatePreferredClassroom = async (req: Request, res: Response) => {
  const { userId, roomId } = req.body;

  try {
    await dashboardService.modifyPreferredClassroom(userId, roomId);

    res
      .status(200)
      .json({ message: "Preferred classroom updated successfully" });
  } catch (error) {
    console.error("Error updating preferred classroom:", error);
    res.status(500).json({ message: "Error updating preferred classroom" });
  }
};

export const deletePreferredClassroom = async (req: Request, res: Response) => {
  const { userId, roomId } = req.body;

  try {
    await dashboardService.removePreferredClassroom(userId, roomId);

    res
      .status(200)
      .json({ message: "Preferred classroom deleted successfully" });
  } catch (error) {
    console.error("Error deleting preferred classroom:", error);
    res.status(500).json({ message: "Error deleting preferred classroom" });
  }
};
