import { Request, Response } from "express";
import findService from "../services/findService";
import reserveService from "../services/reserveService";

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

export const getRoomByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const room = await findService.fetchRoomByName(name);
    res.json(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({ message: "Error fetching room" });
  }
};

export const getRoomByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const room = await findService.fetchRoomByCategory(category);
    res.json(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({ message: "Error fetching room" });
  }
};

export const getRoomByBuilding = async (req: Request, res: Response) => {
  try {
    const { building } = req.params;
    const room = await findService.fetchRoomByBuilding(building);
    res.json(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({ message: "Error fetching room" });
  }
};

export const getRoomByCampus = async (req: Request, res: Response) => {
  try {
    const { campus } = req.params;
    const room = await findService.fetchRoomByCampus(campus);
    res.json(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({ message: "Error fetching room" });
  }
};

export const getRoomByLocation = async (req: Request, res: Response) => {
  try {
    const { location } = req.params;
    const room = await findService.fetchRoomByLocation(location);
    res.json(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({ message: "Error fetching room" });
  }
};

export const getRoomByState = async (req: Request, res: Response) => {
  try {
    const { state } = req.params;
    const room = await findService.fetchRoomByState(state);
    res.json(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({ message: "Error fetching room" });
  }
};

// for admin only --> TODO: add admin middleware

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
