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

const fetchEquipment = async () => {
  const query = "SELECT * FROM Equipments";

  return new Promise<Equipment[]>((resolve, reject) => {
    pool.query(query, async (error, results) => {
      const myQueryResult = results;
      resolve(myQueryResult);
    });
  });
};

const addEquipment = async (name: string, quantity: number) => {
  const query = "INSERT INTO Equipments(name, quantity) VALUES(?, ?)";

  return new Promise((resolve, reject) => {
    pool.query(query, [name, quantity], async (error, results) => {
      const myQueryResult = results;
      resolve(myQueryResult);
    });
  });
};

const updateEquipment = async (id: string, name: string) => {
  const query = "UPDATE Equipments SET name = ? WHERE id = ?";

  return new Promise((resolve, reject) => {
    pool.query(query, [name, id], async (error, results) => {
      const myQueryResult = results;
      resolve(myQueryResult);
    });
  });
};

const deleteEquipment = async (id: string) => {
  const query = "DELETE FROM Equipments WHERE id = ?";

  return new Promise((resolve, reject) => {
    pool.query(query, [id], async (error, results) => {
      const myQueryResult = results;
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
