import { pool } from "../config/database";

const fetchAllGroups = async () => {
  const query = "SELECT * FROM Groups";
  const groups = await pool.query(query, (error, results, fields) => {
    if (error) throw error;
    return results;
  });
};

const fetchGroupsByUser = async (userId: string) => {
  const query = "SELECT * FROM Groups WHERE user_id = ?";
  const result = await pool.query(query, [userId], (error, results, fields) => {
    if (error) throw error;
    return results;
  });
};

const fetchGroupsByStatus = async (status: string) => {
  const query = "SELECT * FROM Groups WHERE Group_State = ?";
  const result = await pool.query(query, [status], (error, results, fields) => {
    if (error) throw error;
    return results;
  });
};

const createGroup = async (groupData: any) => {
  const query =
    "INSERT INTO Groups(Group_Creation, Group_Password, Group_Name, Group_Size, Group_State) VALUES(?, ?, ?, ?, ?)";
  await pool.query(
    query,
    Object.values(groupData),
    (error, results, fields) => {
      if (error) throw error;
      return results;
    }
  );
};

const updateGroupById = async (id: string, groupData: any) => {
  const query =
    "UPDATE Groups SET Group_Creation = ?, Group_Password = ?, Group_Name = ?, Group_Size = ?, Group_State = ? WHERE id_group = ?";
  await pool.query(
    query,
    [...Object.values(groupData), id],
    (error, results, fields) => {
      if (error) throw error;
      return results;
    }
  );
};

const deleteGroupById = async (id: string) => {
  const query = "DELETE FROM Groups WHERE id_group = ?";
  await pool.query(query, [id], (error, results, fields) => {
    if (error) throw error;
    return results;
  });
};

const joinGroup = async (id: string, groupData: any) => {
  const query =
    "UPDATE Groups SET Group_Creation = ?, Group_Password = ?, Group_Name = ?, Group_Size = ?, Group_State = ? WHERE id_group = ?";
  await pool.query(
    query,
    [...Object.values(groupData), id],
    (error, results, fields) => {
      if (error) throw error;
      return results;
    }
  );
};

export default {
  fetchAllGroups,
  fetchGroupsByUser,
  fetchGroupsByStatus,
  createGroup,
  updateGroupById,
  deleteGroupById,
  joinGroup,
};
