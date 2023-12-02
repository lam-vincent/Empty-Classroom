import express from "express";
import {
  getPreferredClassrooms,
  addPreferredClassroom,
  updatePreferredClassroom,
  deletePreferredClassroom,
  getEquipment,
  addEquipment,
  updateEquipment,
  deleteEquipment,
} from "../controllers/dashboardController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { isAdminMiddleware } from "../middlewares/isAdminMiddleware";

const router = express.Router();

// Route to get all preferred classrooms of a user
router.get(
  "/dashboard/recommended/:userId",
  authMiddleware,
  getPreferredClassrooms
);

// post request to add a preferred classroom
router.post(
  "/dashboard/recommended/:userId",
  authMiddleware,
  addPreferredClassroom
);

// patch request to update a preferred classroom
router.put(
  "/dashboard/recommended/:userId",
  authMiddleware,
  updatePreferredClassroom
);

// delete request to delete a preferred classroom
router.delete(
  "/dashboard/recommended/:userId",
  authMiddleware,
  deletePreferredClassroom
);

// CRUD routes for equipment. These routes are protected by an admin middleware.
router.get("/equipment", authMiddleware, isAdminMiddleware);
router.post("/equipment", authMiddleware, isAdminMiddleware, addEquipment);
router.put(
  "/equipment/:id",
  authMiddleware,
  isAdminMiddleware,
  updateEquipment
);
router.delete(
  "/equipment/:id",
  authMiddleware,
  isAdminMiddleware,
  deleteEquipment
);

export default router;
