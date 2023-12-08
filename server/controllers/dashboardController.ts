import { Request, Response } from "express";
import dashboardService from "../services/dashboardService";

export const getPreferredClassrooms = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const preferredClassrooms = await dashboardService.fetchPreferredClassrooms(
      userId
    );

    res.status(200).json({
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

// Duplicata du champ roomId dans la table Prefer --> Erreur
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

// CRUD routes for equipment.
export const getEquipment = async (req: Request, res: Response) => {
  try {
    const equipment = await dashboardService.fetchEquipment();

    res.status(200).json({
      message: "Equipment fetched",
      equipment: equipment,
    });
  } catch (error) {
    console.error("Error fetching equipment:", error);
    res.status(500).json({ message: "Error fetching equipment" });
  }
};

export const addEquipment = async (req: Request, res: Response) => {
  try {
    const equipmentData = req.body;
    const result = await dashboardService.addEquipment(equipmentData);
    res.json({ message: "Equipment added successfully" });
  } catch (error) {
    console.error("Error adding equipment:", error);
    res.status(500).json({ message: "Error adding equipment" });
  }
};

export const updateEquipment = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const equipmentData = req.body;
    const result = await dashboardService.updateEquipment(id, equipmentData);
    res.json({ message: "Equipment updated successfully" });
  } catch (error) {
    console.error("Error updating equipment:", error);
    res.status(500).json({ message: "Error updating equipment" });
  }
};

export const deleteEquipment = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log("id", id);
    const result = await dashboardService.deleteEquipment(id);
    res.json({
      message: "dashboardController.ts: Equipment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting equipment:", error);
    res.status(500).json({ message: "Error deleting equipment" });
  }
};
