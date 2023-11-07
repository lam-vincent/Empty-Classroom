import { pool } from "../config/database";

const createReservation = async (reservationData: any) => {
  const query = "INSERT INTO Reserve(id_room, id_user) VALUES(?, ?)";
  await pool.query(
    query,
    [reservationData.room_id, reservationData.user_id],
    (error, results, fields) => {
      if (error) throw error;
      return results;
    }
  );
};

const fetchReservationByUser = async (userId: string) => {
  const query = "SELECT * FROM Reserve WHERE id_user = ?";
  const result = await pool.query(query, [userId], (error, results, fields) => {
    if (error) throw error;
    return results;
  });
};

const updateReservation = async (roomId: string, userId: string) => {
  const query = "UPDATE Reserve WHERE id_room = ? AND id_user = ?";
  await pool.query(query, [roomId, userId], (error, results, fields) => {
    if (error) throw error;
    return results;
  });
};

const deleteReservation = async (roomId: string, userId: string) => {
  const query = "DELETE FROM Reserve WHERE id_room = ? AND id_user = ?";
  await pool.query(query, [roomId, userId], (error, results, fields) => {
    if (error) throw error;
    return results;
  });
};

export default {
  createReservation,
  fetchReservationByUser,
  updateReservation,
  deleteReservation,
};
