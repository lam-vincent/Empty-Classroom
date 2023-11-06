import { pool } from "../config/database";

const fetchAllRooms = async () => {
  const query = "SELECT * FROM Rooms";
  await pool.query(query, (error, results, fields) => {
    if (error) throw error;
    return results;
  });
};

const fetchRoomById = async (id: string) => {
  const query = "SELECT * FROM Rooms WHERE id_room = ?";
  await pool.query(query, [id], (error, results, fields) => {
    if (error) throw error;
    return results;
  });
};

// for admin only

const createRoom = async (roomData: any) => {
  const query =
    "INSERT INTO Rooms (Room_Name, Room_Building, Room_Campus, Room_Location, Room_State, Room_Category, Is_Reserved, Event_Time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  await pool.query(query, Object.values(roomData), (error, results, fields) => {
    if (error) throw error;
    return results;
  });
};

const updateRoom = async (id: string, roomData: any) => {
  const query =
    "UPDATE Rooms SET Room_Name = ?, Room_Building = ?, Room_Campus = ?, Room_Location = ?, Room_State = ?, Room_Category = ?, Is_Reserved = ?, Event_Time = ? WHERE id_room = ?";
  const result = await pool.query(
    query,
    [...Object.values(roomData), id],
    (error, results, fields) => {
      if (error) throw error;
      return results;
    }
  );
};

const deleteRoom = async (id: string) => {
  const query = "DELETE FROM Rooms WHERE id_room = ?";
  const result = await pool.query(query, [id], (error, results, fields) => {
    if (error) throw error;
    return results;
  });
};

export default {
  fetchAllRooms,
  fetchRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
};
