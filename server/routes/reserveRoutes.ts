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
router.put("/reserve/:id_reserve", updateReservation);

// Delete a reservation by room and user
router.delete("/reserve/:id_reserve", deleteReservation);

export default router;
