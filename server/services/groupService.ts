import { pool } from "../config/database";
import { Group } from "../types/types";
import { Belong } from "../types/types";

const fetchAllGroups = async () => {
  const query = "SELECT * FROM `Groups`";
  return new Promise<Group[]>((resolve, reject) => {
    pool.query(query, async (error, results) => {
      const myArrayPromises = results.map(async (result: Group) => {
        const belongings = await fetchBelongingByGroup(
          result.id_group.toString()
        );
        return {
          ...result,
          Belonging: belongings,
        };
      });

      // Wait for all promises to resolve
      Promise.all(myArrayPromises)
        .then((myArray) => {
          resolve(myArray);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
};

const fetchAllBelongings = async () => {
  const query = "SELECT * FROM `Belong`";
  return new Promise<Group[]>(async (resolve, reject) => {
    pool.query(query, async (error, results) => {
      const myQueryResult = results;
      console.log(results);
      resolve(myQueryResult);
    });
  });
};

const fetchBelongingByGroup = async (groupId: string) => {
  const query = "SELECT * FROM `Belong` WHERE id_group = ?";
  return new Promise<Belong[]>(async (resolve, reject) => {
    pool.query(query, [groupId], async (error, results) => {
      const myQueryResult = results;
      console.log(results);
      resolve(myQueryResult);
    });
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
    "INSERT INTO `Groups`(Group_Creation, Group_Password, Group_Name, Group_Size, Group_State, Group_Owner) VALUES(?, ?, ?, ?, ?, ?)";
  return new Promise(async (resolve, reject) => {
    pool.query(
      query,
      Object.values(groupData),
      async (error, results, fields) => {
        if (error) throw error;
        resolve(results);
      }
    );
  });
};

const createBelonging = async (idUser: any, idGroup: any) => {
  const query = "INSERT INTO `Belong`(id_user,id_group) VALUES(?, ?)";
  await pool.query(query, [idUser, idGroup], (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    return results;
  });
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

const deleteBelongingByGroup = async (id: string) => {
  const query = "DELETE FROM Belong WHERE id_group = ?";
  await pool.query(query, [id], (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    return results;
  });
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

const fetchUsersByGroup = async (id_group: string) => {
  const query =
    "SELECT User_Name FROM Users INNER JOIN Belong ON Users.id_user = Belong.id_user WHERE Belong.id_group = ?";
  await pool.query(query, [id_group], (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    return results;
  });
};

const quitGroup = async (id_user: string, id_group: string) => {
  const query = "DELETE FROM Belong WHERE id_user = ? AND id_group = ?";
  await pool.query(query, [id_user, id_group], (error, results, fields) => {
    if (error) throw error;
    console.log(results);
    return results;
  });
};

const checkUserGroup = async (id_user: string, id_group: string) => {
  const query = "SELECT * FROM Belong WHERE (id_user, id_group) = (?, ?)";
  return new Promise<any>(async (resolve, reject) => {
    pool.query(query, [id_user, id_group], async (error, results) => {
      const myQueryResult = results;
      // console.log(results);
      resolve(myQueryResult);
    });
  });
};

export default {
  fetchAllGroups,
  fetchAllBelongings,
  fetchGroupsByUser,
  fetchGroupsByStatus,
  createGroup,
  checkUserGroup,
  createBelonging,
  updateGroupById,
  deleteGroupById,
  joinGroup,
  quitGroup,
};
