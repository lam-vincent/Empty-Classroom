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
  "/dashboard/preferences/:userId",
  authMiddleware,
  getPreferredClassrooms
);

// post request to add a preferred classroom
router.post(
  "/dashboard/preferences/:userId",
  authMiddleware,
  addPreferredClassroom
);

// patch request to update a preferred classroom
router.put(
  "/dashboard/preferences/:userId",
  authMiddleware,
  updatePreferredClassroom
);

// delete request to delete a preferred classroom
router.delete(
  "/dashboard/preferences/:userId",
  authMiddleware,
  deletePreferredClassroom
);

export default router;
