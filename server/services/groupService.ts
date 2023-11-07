import { pool } from "../config/database";

const fetchAllGroups = async () => {
  const query = "SELECT * FROM `Groups`";
  await pool.query(query, (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    return results;
  });
};

const fetchGroupsByUser = async (userId: string) => {
  const query =
    "SELECT * FROM `Groups` INNER JOIN Belong ON `Groups`.id_group = Belong.id_group WHERE Belong.id_user = ?";
  await pool.query(query, [userId], (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    return results;
  });
};

const fetchGroupsByStatus = async (status: string) => {
  const query = "SELECT * FROM `Groups` WHERE Group_State = ?";
  await pool.query(query, [status], (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    return results;
  });
};

// create then error probably because of the name Groups that should be in backticks
const createGroup = async (groupData: any) => {
  const query =
    "INSERT INTO `Groups`(Group_Creation, Group_Password, Group_Name, Group_Size, Group_State) VALUES(?, ?, ?, ?, ?)";
  await pool.query(
    query,
    Object.values(groupData),
    (error, results, fields) => {
      if (error) throw error;
      console.log(results);
      return results;
    }
  );
};

const updateGroupById = async (id: string, groupData: any) => {
  const query =
    "UPDATE `Groups` SET Group_Creation = ?, Group_Password = ?, Group_Name = ?, Group_Size = ?, Group_State = ? WHERE id_group = ?";
  await pool.query(
    query,
    [...Object.values(groupData), id],
    (error, results, fields) => {
      if (error) throw error;
      console.log(results);
      return results;
    }
  );
};

const deleteGroupById = async (id: string) => {
  const query = "DELETE FROM `Groups` WHERE id_group = ?";
  await pool.query(query, [id], (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    return results;
  });
};

const joinGroup = async (id_user: string, id_group: string) => {
  const query = "INSERT INTO Belong (id_user, id_group) VALUES (?, ?)";
  await pool.query(query, [id_user, id_group], (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    return results;
  });
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
