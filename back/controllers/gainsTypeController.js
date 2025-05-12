import { db } from '../db.js';
import dotenv from 'dotenv';

dotenv.config();

export const getAll = (req, res) => {
    try {
        const q = `select * from gainsType`;
        db.query(q, (err, data) => {
            if (err) {
                console.error("Error executing database query:", err);
                return res.status(500).send({error: "Internal Server Error"});
            }
            return res.status(200).json(data);
        });
    } catch (error) {
        console.error("An unexpected error occurred:", error);
        return res.status(500).send({error: "Internal Server Error"});
    }
};

export const getOne = (req, res) => {
    const id = req.params.id;
    try {
        const q = `select * from gainsType where id = ?`;
        db.query(q, [id], (err, data) => {
            if (err) {
                console.error("Error executing database query:", err);
                return res.status(500).send({error: "Internal Server Error"});
            }
            return res.status(200).json(data);
        });
    } catch (error) {
        console.error("An unexpected error occurred:", error);
        return res.status(500).send({error: "Internal Server Error"});
    }
};