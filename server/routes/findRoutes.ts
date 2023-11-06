import express from "express";
import {
  getAllRooms,
  getRoomById,
  // getRoomByCategory,
  // getRoomByBuilding,
  // getRoomByCampus,
  // getRoomByLocation,
  // getRoomByState,
  createRoom,
  updateRoom,
  deleteRoom,
  // addEquipment,
} from "../controllers/findController";

const router = express.Router();

// Get all rooms
router.get("/rooms", getAllRooms);

// Get room by id
router.get("/rooms/:id", getRoomById);

// // Get room by category
// router.get("/rooms/category/:category", getRoomByCategory);

// // Get room by building
// router.get("/rooms/building/:building", getRoomByBuilding);

// // Get room by campus
// router.get("/rooms/campus/:campus", getRoomByCampus);

// // Get room by location
// router.get("/rooms/location/:location", getRoomByLocation);

// // Get room by state
// router.get("/rooms/state/:state", getRoomByState);

// Admin routes for creating, updating, and deleting rooms. These routes should be protected by an admin middleware.
router.post("/rooms", createRoom);
router.put("/rooms/:id", updateRoom);
router.delete("/rooms/:id", deleteRoom);

// Route to add an equipment to a room
// router.patch("/rooms/:id", addEquipment);

export default router;
