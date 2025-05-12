import { db } from '../db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const getAll = (req, res) => {
    try {
        const q = `select * from newsletters`;
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

export const ajouterNewsletter = (req, res) => {
    const email = req.body.email;
    try {
        if (!email || email === "") {
            return res.status(400).json({ error: "Email is a required field." });
        }
        const q = "SELECT * FROM newsletters WHERE email = ?";
        
        db.query(q, [email], (err, data) => {
            if (err) {
                console.error("Error checking email existence:", checkErr);
                return res.status(500).send("Internal Server Error");
            }

            if (data.length > 0) {
                return res.status(409).json({ error: "Email already exists." });
            }

            const qInsert = "INSERT INTO newsletters (email) VALUES (?)";

            db.query(qInsert, [email], (errInsert, dataInsert) => {
                if (errInsert) {
                    console.error("Error executing database query:", errInsert);
                    return res.status(500).send("Internal Server Error");
                }
                return res.status(201).json({ success: "Newsletter created successfully!" });
            });
        });
    } catch (error) {
        console.error("An unexpected error occurred:", error);
        return res.status(500).send("Internal Server Error");
    }
};

export const modifierNewsletter = (req, res) => {
    const dataBody = req.body;
    const bearerToken = req.headers.authorization;
    try {
        if (!bearerToken) return res.status(401).json({ error: "Unauthorized - Token not provided." });
        const token = bearerToken.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SEC_KEY);
        if (!decodedToken || decodedToken.role !== 'MANAGER') return res.status(403).json({ error: "Manager access required." });
        if (!dataBody.email || dataBody.email === "") return res.status(400).json({ error: "Email is a required field." });

        const q = `UPDATE newsletters SET email = ?, statut = ? WHERE id = ?`;
        const values = [dataBody.email, dataBody.statut, dataBody.id];
        db.query(q, [values], (err, data) => {
            if (err) {
                console.error("Error executing database query:", err);
                return res.status(500).send("Internal Server Error");
            }
            if (data.affectedRows > 0) return res.status(200).json({ success: "Newsletter updated successfully!" });
            return res.status(404).json({ error: "Newsletter not found for the given email." });
        });
    } catch (error) {
        console.error("An unexpected error occurred:", error);
        return res.status(500).send("Internal Server Error");
    }
};

export const supprimerNewsletter = (req, res) => {
    const id = req.params.id;
    const bearerToken = req.headers.authorization;
    try {
        if (!bearerToken) return res.status(401).json({ error: "Unauthorized - Token not provided." });
        const token = bearerToken.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SEC_KEY);
        if (!decodedToken || decodedToken.role !== 'MANAGER') return res.status(403).json({ error: "Manager access required." });

        const q = `DELETE FROM newsletters WHERE id = ?`;
        db.query(q, [id], (err, data) => {
            if (err) {
                console.error("Error executing database query:", err);
                return res.status(500).send("Internal Server Error");
            }
            if (data.affectedRows > 0) return res.status(204).json({ success: "Newsletter deleted successfully!" });
            return res.status(404).json({ error: "Newsletter not found for the given id." });
        });
    } catch (error) {
        console.error("An unexpected error occurred:", error);
        return res.status(500).send("Internal Server Error");
    }
}
