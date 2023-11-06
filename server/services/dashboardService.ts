import { pool } from "../config/database";

const fetchPreferredClassrooms = async (userId: string) => {
  try {
    const query = "SELECT * FROM Prefer WHERE id_user = ?";

    console.log("userId", userId);

    await pool.query(query, [userId], async (error, results, fields) => {
      if (error) throw error;
      console.log(results);
      return results;
    });
  } catch (error) {
    throw error;
  }
};

const insertPreferredClassroom = async (userId: string, roomId: string) => {
  try {
    const query = "INSERT INTO Prefer(id_user, id_room) VALUES(?, ?)";
    await pool.query(query, [userId, roomId], (error, results, fields) => {
      if (error) throw error;
      console.log("results", results);
      return results;
    });
  } catch (error) {
    throw error;
  }
};

const modifyPreferredClassroom = async (userId: string, roomId: string) => {
  try {
    const query = "UPDATE Prefer SET id_room = ? WHERE id_user = ?";

    await pool.query(query, [roomId, userId], (error, results, fields) => {
      if (error) throw error;
      console.log("results", results);
      return results;
    });
  } catch (error) {
    throw error;
  }
};

const removePreferredClassroom = async (userId: string, roomId: string) => {
  try {
    const query = "DELETE FROM Prefer WHERE id_user = ? AND id_room = ?";

    await pool.query(query, [userId, roomId], (error, results, fields) => {
      if (error) throw error;
      console.log("results", results);
      return results;
    });
  } catch (error) {
    throw error;
  }
};

export default {
  fetchPreferredClassrooms,
  insertPreferredClassroom,
  modifyPreferredClassroom,
  removePreferredClassroom,
};
