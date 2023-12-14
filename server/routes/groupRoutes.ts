import express from "express";
import {
  getGroupsByUser,
  getGroupsByStatus,
  createGroup,
  updateGroupById,
  deleteGroupById,
  joinGroup,
  quitGroup,
  getAllGroups,
  getGroupMembers,
} from "../controllers/groupController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

// Route to get groups by user
router.get("/groups/user/:userId", authMiddleware, getGroupsByUser);
router.get("/groups", authMiddleware, getAllGroups);

// Route to get user by group
router.get("/groups/users/:groupId", authMiddleware, getGroupMembers);

// Route to get groups by status
router.get("/groups/status/:status", authMiddleware, getGroupsByStatus);

// Route to create a group
router.post("/groups", authMiddleware, createGroup);

// Route to update a group by id
router.put("/groups/:id", authMiddleware, updateGroupById);

// Route to delete a group by id
router.delete("/groups/:id", authMiddleware, deleteGroupById);

// Route to delete a belonging
router.delete("/groups/:userId/:groupId", authMiddleware, quitGroup);

// Route to join a group
router.put("/groups", authMiddleware, joinGroup);

export default router;
