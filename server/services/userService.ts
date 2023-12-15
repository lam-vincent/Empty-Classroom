import { pool } from "../config/database";
import bcrypt from "bcrypt";
import { User } from "../types/types";

const fetchUserById = async (userId: string) => {
  const query =
    "SELECT User_Name,User_Class,User_Description,User_Picture,User_Promo,User_Role FROM users WHERE id_user = ?";
  return new Promise<User>((resolve, reject) => {
    pool.query(query, [userId], async (error, results) => {
      const myQueryResult = results;
      resolve(myQueryResult);
    });
  });
};

const updateUserById = async (id: string, groupData: any) => {
  const query =
    "UPDATE users SET User_Class = ?, User_Description = ?, User_Picture = ?, User_Promo = ?  WHERE id_user = ?";
  console.log(groupData);
  pool.query(
    query,
    [...Object.values(groupData), id],
    (error, results, fields) => {
      if (error) throw error;
      console.log(results);
      return results;
    }
  );
};

export default { fetchUserById, updateUserById };
