import { pool } from "../config/database";
import { Reserve } from "../types/types";

const fetchAllReservations = async () => {
  const query = "SELECT * FROM Reserve";
  return new Promise<Reserve[]>(async (resolve, reject) => {
    pool.query(query, async (error, results) => {
      const myQueryResult = results;
      console.log(results);
      resolve(myQueryResult);
    });
  });
};

const createReservation = async (reservationData: any) => {
  const query =
    "INSERT INTO Reserve(id_room, id_user, Title, Description, Reservation_Date, Start_Time, End_Time) VALUES(?, ?, ?, ?, ?, ?, ?)";
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

const createReservationByGroup = async (
  reservationData: any,
  groupName: any
) => {
  // const checkQuery =
  //   "SELECT users.id_user FROM users JOIN Belong ON Belong.id_user = users.id_user WHERE Belong.id_group = ?";
  const query = `INSERT INTO Reserve (id_room, id_user, Title, Description, Reservation_Date, Start_Time, End_Time)
    SELECT ?, users.id_user, ?, ?, ?, ?, ?
    FROM users
    JOIN Belong ON Belong.id_user = users.id_user
    WHERE Belong.id_group = ?;
    `;
  await pool.query(
    query,
    [
      reservationData.id_room,
      reservationData.Title,
      reservationData.Description,
      reservationData.Reservation_Date,
      reservationData.Start_Time,
      reservationData.End_Time,
      groupName,
    ],
    (error, results, fields) => {
      if (error) throw error;
      console.log(results);
      return results;
    }
  );
};

const fetchReservationByUser = async (userId: string) => {
  const query = "SELECT * FROM Reserve WHERE id_user = ?";
  return new Promise<Reserve[]>(async (resolve, reject) => {
    await pool.query(query, [userId], (error, results, fields) => {
      if (error) throw error;
      // console.log(results);
      resolve(results);
    });
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

const fetchReservationByDate = async (date: string) => {
  const query = "SELECT * FROM Reserve WHERE Reservation_Date = ?";
  return new Promise<Reserve[]>((resolve, reject) => {
    pool.query(query, [date], async (error, results, fields) => {
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
  createReservationByGroup,
  fetchReservationByUser,
  fetchReservationByRoom,
  fetchReservationByDate,
  fetchAllReservations,
  updateReservation,
  deleteReservation,
};
