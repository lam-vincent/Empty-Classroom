import express from "express";
import {
  getAllRooms,
  getRoomById,
  getRoomByName,
  getRoomByCategory,
  getRoomByBuilding,
  getRoomByCampus,
  getRoomByLocation,
  getRoomByState,
  createRoom,
  updateRoom,
  deleteRoom,
  addEquipment,
} from "../controllers/findController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

// Get all rooms
router.get("/rooms", authMiddleware, getAllRooms);

// Get room by id
router.get("/rooms/:id", authMiddleware, getRoomById);

// Get room by name
router.get("/rooms/:name", authMiddleware, getRoomByName);

// Get room by category
router.get("/rooms/category/:category", authMiddleware, getRoomByCategory);

// Get room by building
router.get("/rooms/building/:building", authMiddleware, getRoomByBuilding);

// Get room by campus
router.get("/rooms/campus/:campus", authMiddleware, getRoomByCampus);

// Get room by location
router.get("/rooms/location/:location", authMiddleware, getRoomByLocation);

// Get room by state
router.get("/rooms/state/:state", authMiddleware, getRoomByState);

// Admin routes for creating, updating, and deleting rooms. These routes should be protected by an admin middleware.
router.post("/rooms", authMiddleware, createRoom);
router.put("/rooms/:id", authMiddleware, updateRoom);
router.delete("/rooms/:id", authMiddleware, deleteRoom);

// Route to add an equipment to a room
router.post("/rooms/:id", authMiddleware, addEquipment);

export default router;
