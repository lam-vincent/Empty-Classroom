import { Request, Response } from "express";
import findService from "../services/findService";

export const getAllRooms = async (req: Request, res: Response) => {
  try {
    const rooms = await findService.fetchAllRooms();
    res.json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ message: "Error fetching rooms" });
  }
};

export const getRoomById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const room = await findService.fetchRoomById(id);
    res.json(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({ message: "Error fetching room" });
  }
};

// for admin only

export const createRoom = async (req: Request, res: Response) => {
  try {
    const roomData = req.body;
    const result = await findService.createRoom(roomData);
    res.json({ message: "Room created successfully" });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ message: "Error creating room" });
  }
};

export const updateRoom = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const roomData = req.body;
    const result = await findService.updateRoom(id, roomData);
    res.json({ message: "Room updated successfully" });
  } catch (error) {
    console.error("Error updating room:", error);
    res.status(500).json({ message: "Error updating room" });
  }
};

export const deleteRoom = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await findService.deleteRoom(id);
    res.json({ message: "Room deleted successfully" });
  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ message: "Error deleting room" });
  }
};
