import express from "express";
import {
  getGroupsByUser,
  getGroupsByStatus,
  createGroup,
  updateGroupById,
  deleteGroupById,
  joinGroup,
} from "../controllers/groupController";

const router = express.Router();

// Route to get groups by user
router.get("/groups/user/:userId", getGroupsByUser);

// Route to get groups by status
router.get("/groups/status/:status", getGroupsByStatus);

// Route to create a group
router.post("/groups", createGroup);

// Route to update a group by id
router.put("/groups/:id", updateGroupById);

// Route to delete a group by id
router.delete("/groups/:id", deleteGroupById);

// Route to join a group
router.patch("/groups/:id", joinGroup);

export default router;
