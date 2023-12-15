import { pool } from "../config/database";
import { Equipment } from "../types/types";

const fetchPreferredClassrooms = async (userId: string) => {
  const query = `SELECT * FROM Rooms WHERE id_room IN (SELECT id_room FROM Prefer WHERE id_user = ?)`;

  return new Promise((resolve, reject) => {
    pool.query(query, [userId], async (error, results) => {
      resolve(results);
    });
  });
};

const insertPreferredClassroom = async (
  userId: string,
  Room_Building: string,
  Room_Name: string
) => {
  const query = `INSERT INTO Prefer (id_user, id_room) SELECT ?, (SELECT id_room FROM Rooms WHERE Room_Building = ? AND Room_Name = ?) WHERE NOT EXISTS (SELECT * FROM Prefer WHERE id_user = ? AND id_room = (SELECT id_room FROM Rooms WHERE Room_Building = ? AND Room_Name = ?))`;

  return new Promise((resolve, reject) => {
    pool.query(
      query,
      [userId, Room_Building, Room_Name, userId, Room_Building, Room_Name],
      async (error, results) => {
        resolve(results);
      }
    );
  });
};

const removePreferredClassroom = async (
  userId: string,
  Room_Building: string,
  Room_Name: string
) => {
  const query = `DELETE FROM Prefer WHERE id_user = ? AND id_room = (SELECT id_room FROM Rooms WHERE Room_Building = ? AND Room_Name = ?)`;

  return new Promise((resolve, reject) => {
    pool.query(
      query,
      [userId, Room_Building, Room_Name],
      async (error, results) => {
        resolve(results);
      }
    );
  });
};

// Equipment methods
const fetchEquipment = async () => {
  const query = "SELECT * FROM Equipments";

  return new Promise<Equipment[]>((resolve, reject) => {
    pool.query(query, async (error, results) => {
      resolve(results);
    });
  });
};

const addEquipment = async (roomEquipment: any) => {
  const query = `INSERT INTO Equipments(Equipment_Name, Equipment_Type, Equipment_Location, Equipment_Description, Equipment_Status) SELECT ?, ?, ?, ?, ? WHERE NOT EXISTS (SELECT * FROM Equipments WHERE Equipment_Name = ?)`;

  return new Promise((resolve, reject) => {
    pool.query(
      query,
      [...Object.values(roomEquipment), roomEquipment.Equipment_Name],
      async (error, results) => {
        resolve(results);
      }
    );
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
        resolve(results);
      }
    );
  });
};

const deleteEquipment = async (id: string) => {
  const query = "DELETE FROM Equipments WHERE id_equipment = ?";

  return new Promise((resolve, reject) => {
    pool.query(query, [id], async (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

// is_equipped methods
const fetchIsEquipped = async (id: string) => {
  const query = `SELECT e.Equipment_Name, ie.Quantity FROM Equipments e JOIN Is_Equiped ie ON e.id_equipment = ie.id_equipment WHERE ie.id_room = ?`;

  return new Promise((resolve, reject) => {
    pool.query(query, [id], async (error, results) => {
      resolve(results);
    });
  });
};

const addIsEquipped = async (
  id_room: string,
  Equipment_Name: string,
  Quantity: string
) => {
  const query = `INSERT INTO is_equiped (id_room, id_equipment, Quantity) VALUES (?, (SELECT id_equipment FROM Equipments WHERE Equipment_Name = ?), ?) ON DUPLICATE KEY UPDATE Quantity = ?`;
  return new Promise((resolve, reject) => {
    pool.query(
      query,
      [id_room, Equipment_Name, Quantity, Quantity],
      async (error, results) => {
        resolve(results);
      }
    );
  });
};

const deleteIsEquipped = async (id_room: string, equipmentName: string) => {
  const query =
    "DELETE FROM is_equiped WHERE id_equipment = (SELECT id_equipment FROM Equipments WHERE Equipment_Name = ?) AND id_room = ?";

  return new Promise((resolve, reject) => {
    pool.query(query, [equipmentName, id_room], async (error, results) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

export default {
  fetchPreferredClassrooms,
  insertPreferredClassroom,
  removePreferredClassroom,
  fetchEquipment,
  addEquipment,
  updateEquipment,
  deleteEquipment,
  fetchIsEquipped,
  addIsEquipped,
  deleteIsEquipped,
};
