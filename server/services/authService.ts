import { pool } from "../config/database";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { config } from "dotenv";

config();
const secretKey: Secret = process.env.SECRET_KEY || "";

const registerUser = async (username: string, password: string) => {
  try {
    const checkUsernameQuery = "SELECT * FROM users WHERE User_Name = ?";
    const checkUsernameResult = await pool.query(
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
      "INSERT INTO users (User_Name, User_Password) VALUES (?, ?) ";
    const insertUserValues = [username, hashedPassword];
    const insertUserResult = await pool.query(
      insertUserQuery,
      insertUserValues
    );

    return insertUserResult;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (username: string, password: string) => {
  try {
    const checkUserQuery = "SELECT * FROM users WHERE User_Name = ?";
    console.log(checkUserQuery);
    const checkUserResult = await pool.query(
      checkUserQuery,
      [username],
      async (error, results, fields) => {
        if (error) throw error;
        console.log(results);
        const isPasswordValid = await bcrypt.compare(
          password,
          results[0].User_Password
        );
        if (!isPasswordValid) {
          throw new Error("Invalid username or password");
        }
        const token = jwt.sign({ userId: results[0].id_user }, secretKey, {
          expiresIn: "1h",
        });
        console.log("token", token);
        return token;
      }
    );
  } catch (error) {
    throw error;
  }
};

export default { registerUser, loginUser };
