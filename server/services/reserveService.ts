import { pool } from "../config/database";
import { Reserve } from "../types/types";

const createReservation = async (reservationData: any) => {
  const query =
    "INSERT INTO Reserve(id_room, id_user, Title, Description, Start_Time, End_Time) VALUES(?, ?, ?, ?, ?, ?)";
  await pool.query(
    query,
    Object.values(reservationData),
    (error, results, fields) => {
      if (error) throw error;
      console.log(results);
      return results;
    }
  );
};

const fetchReservationByUser = async (userId: string) => {
  const query = "SELECT * FROM Reserve WHERE id_user = ?";
  await pool.query(query, [userId], (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    return results;
  });
};

const fetchReservationByRoom = async (roomId: string) => {
  const query = "SELECT * FROM Reserve WHERE id_room = ?";
  return new Promise<Reserve[]>((resolve, reject) => {
    pool.query(query, [roomId], async (error, results, fields) => {
      if (error) throw error;
      resolve(results);
    });
  });
};

const updateReservation = async (id_reserve: string, reservationData: any) => {
  const query =
    "UPDATE Reserve SET id_room = ?, id_user = ?, Title = ?, Description = ?, Start_Time = ?, End_Time = ? WHERE id_reserve = ?";
  await pool.query(
    query,
    [...Object.values(reservationData), id_reserve],
    (error, results, fields) => {
      if (error) throw error;
      console.log(results);
      return results;
    }
  );
};

const deleteReservation = async (id: string) => {
  const query = "DELETE FROM Reserve WHERE id_reserve = ?";
  await pool.query(query, [id], (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    return results;
  });
};

export default {
  createReservation,
  fetchReservationByUser,
  fetchReservationByRoom,
  updateReservation,
  deleteReservation,
};
