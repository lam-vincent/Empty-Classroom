import { pool } from "../config/database";
import bcrypt from "bcrypt";
import { User } from "../types/types";

const registerUser = async (
  username: string,
  password: string,
  role: string
) => {
  try {
    const checkUsernameQuery = "SELECT * FROM users WHERE User_Name = ?";
    const checkUsernameResult = pool.query(
      checkUsernameQuery,
      [username],
      async (error, results, fields) => {
        if (error) throw error;
        if (results.length > 0) {
          throw new Error("Username already exists");
        }

        return results;
      }
    );

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertUserQuery =
      "INSERT INTO users (User_Name, User_Password, User_Role) VALUES (?, ?, ?) ";
    const insertUserValues = [username, hashedPassword, role];
    const insertUserResult = pool.query(insertUserQuery, insertUserValues);

    return insertUserResult;
  } catch (error) {
    throw error;
  }
};

const loginUser = (username: string, password: string) => {
  const checkUserQuery = "SELECT * FROM users WHERE User_Name = ?";
  return new Promise<User>((resolve, reject) => {
    pool.query(checkUserQuery, [username], async (error, results) => {
      const myQueryResult = results[0];
      if (!results.length) {
        reject("Unknown User."); // We reject the promise if there is no results to the query
      } else {
        const isPasswordValid = await bcrypt.compare(
          password,
          myQueryResult.User_Password
        );

        if (!isPasswordValid) {
          reject("Invalid Password.");
        }

        resolve(myQueryResult);
      }
    });
  });
};

export default { registerUser, loginUser };
