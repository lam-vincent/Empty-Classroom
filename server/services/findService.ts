import { pool } from "../config/database";
import { Room } from "../types/types";

const fetchAllRooms = async () => {
  const query = "SELECT * FROM Rooms";
  return new Promise<Room[]>((resolve, reject) => {
    pool.query(query, async (error, results) => {
      const myQueryResult = results;
      resolve(myQueryResult);
    });
  });
};

const fetchRoomByName = async (name: string) => {
  const query = "SELECT * FROM Rooms WHERE Room_Name LIKE ?";
  return new Promise<Room[]>((resolve, reject) => {
    pool.query(query, [name], async (error, results) => {
      const myQueryResult = results;
      resolve(myQueryResult);
    });
  });
};

const fetchRoomById = async (id: string) => {
  const query = "SELECT * FROM Rooms WHERE id_room = ?";
  return new Promise<Room>((resolve, reject) => {
    pool.query(query, [id], async (error, results) => {
      const myQueryResult = results[0];
      resolve(myQueryResult);
    });
  });
};

const fetchRoomByCategory = async (category: string) => {
  const query = "SELECT * FROM Rooms WHERE Room_Category = ?";
  return new Promise<Room[]>((resolve, reject) => {
    pool.query(query, [category], async (error, results) => {
      const myQueryResult = results;
      resolve(myQueryResult);
    });
  });
};

const fetchRoomByBuilding = async (building: string) => {
  const query = "SELECT * FROM Rooms WHERE Room_Building = ?";
  return new Promise<Room[]>((resolve, reject) => {
    pool.query(query, [building], async (error, results) => {
      const myQueryResult = results;
      resolve(myQueryResult);
    });
  });
};

const fetchRoomByCampus = async (campus: string) => {
  const query = "SELECT * FROM Rooms WHERE Room_Campus = ?";
  return new Promise<Room[]>((resolve, reject) => {
    pool.query(query, [campus], async (error, results) => {
      const myQueryResult = results;
      resolve(myQueryResult);
    });
  });
};

const fetchRoomByLocation = async (location: string) => {
  const query = "SELECT * FROM Rooms WHERE Room_Location = ?";
  return new Promise<Room[]>((resolve, reject) => {
    pool.query(query, [location], async (error, results) => {
      const myQueryResult = results;
      resolve(myQueryResult);
    });
  });
};

const fetchRoomByState = async (state: string) => {
  const query = "SELECT * FROM Rooms WHERE Room_State = ?";
  return new Promise<Room[]>((resolve, reject) => {
    pool.query(query, [state], async (error, results) => {
      const myQueryResult = results;
      resolve(myQueryResult);
    });
  });
};

// for admin only

const createRoom = async (roomData: any) => {
  const query =
    "INSERT INTO Rooms (Room_Name, Room_Building, Room_Campus, Room_Location, Room_State, Room_Category) VALUES (?, ?, ?, ?, ?, ?)";
  await pool.query(query, Object.values(roomData), (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    return results;
  });
};

// put an error but update the room + i think it change the id
const updateRoom = async (id: string, roomData: any) => {
  const query =
    "UPDATE Rooms SET Room_Name = ?, Room_Building = ?, Room_Campus = ?, Room_Location = ?, Room_State = ?, Room_Category = ? WHERE id_room = ?";
  await pool.query(
    query,
    [...Object.values(roomData), id],
    (error, results, fields) => {
      if (error) throw error;
      console.log(results);
      return results;
    }
  );
};

const deleteRoom = async (id: string) => {
  const query = "DELETE FROM Rooms WHERE id_room = ?";
  await pool.query(query, [id], (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    return results;
  });
};

// put an error but add the equipment
const addEquipment = async (id: string, equipment: string) => {
  const query =
    "INSERT INTO Equipments (id_room, Equipment_Name) VALUES (?, ?)";
  await pool.query(query, [id, equipment], (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    return results;
  });
};

export default {
  fetchAllRooms,
  fetchRoomById,
  fetchRoomByName,
  fetchRoomByCategory,
  fetchRoomByBuilding,
  fetchRoomByCampus,
  fetchRoomByLocation,
  fetchRoomByState,
  createRoom,
  updateRoom,
  deleteRoom,
  addEquipment,
};
