import { pool } from "../config/database";

const fetchPreferredClassrooms = async (userId: string) => {
  try {
    const query = "SELECT * FROM Prefer WHERE id_user = ?";

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

const fetchEquipment = async () => {
  try {
    const query = "SELECT * FROM Equipments";

    await pool.query(query, async (error, results, fields) => {
      if (error) throw error;
      console.log(results);
      return results;
    });
  } catch (error) {
    throw error;
  }
};

const addEquipment = async (name: string, quantity: number) => {
  try {
    const query = "INSERT INTO Equipments(name, quantity) VALUES(?, ?)";

    await pool.query(query, [name, quantity], (error, results, fields) => {
      if (error) throw error;
      console.log("results", results);
      return results;
    });
  } catch (error) {
    throw error;
  }
};

const updateEquipment = async (id: string, name: string) => {
  try {
    const query = "UPDATE Equipments SET name = ? WHERE id = ?";

    await pool.query(query, [name, id], (error, results, fields) => {
      if (error) throw error;
      console.log("results", results);
      return results;
    });
  } catch (error) {
    throw error;
  }
};

const deleteEquipment = async (id: string) => {
  try {
    const query = "DELETE FROM Equipments WHERE id = ?";

    await pool.query(query, [id], (error, results, fields) => {
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
  fetchEquipment,
  addEquipment,
  updateEquipment,
  deleteEquipment,
};
