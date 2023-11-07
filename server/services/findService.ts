import { pool } from "../config/database";

const fetchAllRooms = async () => {
  const query = "SELECT * FROM Rooms";
  await pool.query(query, (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    return results;
  });
};

const fetchRoomById = async (id: string) => {
  const query = "SELECT * FROM Rooms WHERE id_room = ?";
  await pool.query(query, [id], (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    return results;
  });
};

const fetchRoomByCategory = async (category: string) => {
  const query = "SELECT * FROM Rooms WHERE Room_Category = ?";
  await pool.query(query, [category], (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    return results;
  });
};

const fetchRoomByBuilding = async (building: string) => {
  const query = "SELECT * FROM Rooms WHERE Room_Building = ?";
  await pool.query(query, [building], (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    return results;
  });
};

const fetchRoomByCampus = async (campus: string) => {
  const query = "SELECT * FROM Rooms WHERE Room_Campus = ?";
  await pool.query(query, [campus], (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    return results;
  });
};

const fetchRoomByLocation = async (location: string) => {
  const query = "SELECT * FROM Rooms WHERE Room_Location = ?";
  await pool.query(query, [location], (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    return results;
  });
};

const fetchRoomByState = async (state: string) => {
  const query = "SELECT * FROM Rooms WHERE Room_State = ?";
  await pool.query(query, [state], (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    return results;
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
