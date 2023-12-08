import { pool } from "../config/database";
import { Equipment } from "../types/types";

const fetchPreferredClassrooms = async (userId: string) => {
  const query = "SELECT * FROM Prefer WHERE id_user = ?";

  return new Promise((resolve, reject) => {
    pool.query(query, [userId], async (error, results) => {
      const myQueryResult = results;
      resolve(myQueryResult);
    });
  });
};

const insertPreferredClassroom = async (userId: string, roomId: string) => {
  const query = "INSERT INTO Prefer(id_user, id_room) VALUES(?, ?)";

  return new Promise((resolve, reject) => {
    pool.query(query, [userId, roomId], async (error, results) => {
      const myQueryResult = results;
      resolve(myQueryResult);
    });
  });
};

const modifyPreferredClassroom = async (userId: string, roomId: string) => {
  const query = "UPDATE Prefer SET id_room = ? WHERE id_user = ?";

  return new Promise((resolve, reject) => {
    pool.query(query, [roomId, userId], async (error, results) => {
      const myQueryResult = results;
      resolve(myQueryResult);
    });
  });
};

const removePreferredClassroom = async (userId: string, roomId: string) => {
  const query = "DELETE FROM Prefer WHERE id_user = ? AND id_room = ?";

  return new Promise((resolve, reject) => {
    pool.query(query, [userId, roomId], async (error, results) => {
      const myQueryResult = results;
      resolve(myQueryResult);
    });
  });
};

// Equipment methods
const fetchEquipment = async () => {
  const query = "SELECT * FROM Equipments";

  return new Promise<Equipment[]>((resolve, reject) => {
    pool.query(query, async (error, results) => {
      const myQueryResult = results;
      resolve(myQueryResult);
    });
  });
};

const addEquipment = async (roomEquipment: any) => {
  const query =
    "INSERT INTO Equipments(Equipment_Name, Equipment_Type, Equipment_Location, Equipment_Description, Equipment_Status) VALUES(?, ?, ?, ?, ?)";

  return new Promise((resolve, reject) => {
    pool.query(query, Object.values(roomEquipment), async (error, results) => {
      const myQueryResult = results;
      resolve(myQueryResult);
    });
  });
};

const updateEquipment = async (id: string, roomEquipment: any) => {
  const query = `UPDATE Equipments SET Equipment_Name = ?, Equipment_Type = ?, Equipment_Location = ?, Equipment_Description = ?, Equipment_Status = ? WHERE id_equipment = ?`;

  console.log("roomEquipment", roomEquipment);

  return new Promise((resolve, reject) => {
    pool.query(
      query,
      [...Object.values(roomEquipment), id],
      async (error, results) => {
        const myQueryResult = results;
        resolve(myQueryResult);
      }
    );
  });
};

const deleteEquipment = async (id: string) => {
  const query = "DELETE FROM Equipments WHERE id_equipment = ?";

  return new Promise((resolve, reject) => {
    pool.query(query, [id], async (error, results) => {
      const myQueryResult = results;
      if (error) reject(error);
      resolve(myQueryResult);
    });
  });
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
