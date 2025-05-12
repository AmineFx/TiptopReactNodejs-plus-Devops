import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

export const db = mysql.createPool({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE
});

db.getConnection((err, connection) => {
    if (err) {
        console.error("Database Connection Failed !!!", err);
        return;
    }
    console.log("Connected to Database");

    // Release the connection when done with it
    connection.release();
});
