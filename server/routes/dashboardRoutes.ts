import express from "express";
import {
  getPreferredClassrooms,
  addPreferredClassroom,
  updatePreferredClassroom,
  deletePreferredClassroom,
} from "../controllers/dashboardController";
import { authMiddleware } from "../middlewares/authMiddleware";

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

export default router;
