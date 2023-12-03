import { Request, Response } from "express";
import reserveService from "../services/reserveService";

export const createReservation = async (req: Request, res: Response) => {
  try {
    const reservationData = req.body;
    await reserveService.createReservation(reservationData);
    res.status(201).json({ message: "Reservation created successfully" });
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ message: "Error creating reservation" });
  }
};

export const getReservations = async (req: Request, res: Response) => {
  try {
    const reservations = await reserveService.fetchAllReservations();
    res.json(reservations);
  } catch (error) {
    console.error("Error fetching reservations", error);
    res.status(500).json({ message: "Error fetching reservations" });
  }
};

export const getReservationByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;
    const reservations = await reserveService.fetchReservationByUser(userId);
    res.json(reservations);
  } catch (error) {
    console.error("Error fetching reservation:", error);
    res.status(500).json({ message: "Error fetching reservation" });
  }
};

export const getReservationByRoom = async (req: Request, res: Response) => {
  try {
    const roomId = req.params.room_id;
    const reservations = await reserveService.fetchReservationByRoom(roomId);
    res.json(reservations);
  } catch (error) {
    console.error("Error fetching reservation:", error);
    res.status(500).json({ message: "Error fetching reservation" });
  }
};

export const updateReservation = async (req: Request, res: Response) => {
  try {
    const reserveId = req.params.id_reserve;
    const reservationData = req.body;
    await reserveService.updateReservation(reserveId, reservationData);
    res.json({ message: "Reservation updated successfully" });
  } catch (error) {
    console.error("Error updating reservation:", error);
    res.status(500).json({ message: "Error updating reservation" });
  }
};

export const deleteReservation = async (req: Request, res: Response) => {
  try {
    const reserveId = req.params.id_reserve;
    await reserveService.deleteReservation(reserveId);
    res.json({ message: "Reservation deleted successfully" });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    res.status(500).json({ message: "Error deleting reservation" });
  }
};
