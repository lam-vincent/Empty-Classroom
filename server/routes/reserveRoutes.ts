import express from "express";
import {
  createReservation,
  getReservationByUser,
  updateReservation,
  deleteReservation,
} from "../controllers/reserveController";

const router = express.Router();

// Create a reservation
router.post("/reserve", createReservation);

// Get all reservations for a user
router.get("/reserve/:user_id", getReservationByUser);

// Update a reservation by room and user
router.patch("/reserve/:room_id/:user_id", updateReservation);

// Delete a reservation by room and user
router.delete("/reserve/:room_id/:user_id", deleteReservation);

export default router;
