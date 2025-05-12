import { db } from "../db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const getAll = (req, res) => {
    const bearerToken = req.headers.authorization;
    try {
        if (!bearerToken) return res.status(401).json({ error: "Unauthorized - Token not provided." });
        const token = bearerToken.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SEC_KEY);
        if (!decodedToken || decodedToken.role !== 'MANAGER') return res.status(403).json({ error: "Manager access required." });

        const q = `SELECT 
                    b.*, 
                    g.*, 
                    CONCAT(uc.prenom, ' ', uc.nom) AS "nomClient",
                    CONCAT(ue.prenom, ' ', ue.nom) AS "nomEmploye"
                    FROM billets b
                    LEFT JOIN gainstype g
                    on b.gainTypeId = g.id
                    LEFT JOIN utilisateurs uc
                    on b.clientId = uc.id
                    LEFT JOIN utilisateurs ue
                    on b.employeId = ue.id
                    limit 1000`;
        db.query(q, (err, data) => {
            if (err) {
                console.error("Error executing database query:", err);
                return res.status(500).send({error: "Internal Server Error"});
            }
            return res.status(200).json(data);
        });
    } catch (e) {
        console.error("An unexpected error occurred:", e);
        return res.status(500).send({error: "Internal Server Error"});
    }
};

export const getClientBillets = (req, res) => {
    const id = req.params.id;
    const bearerToken = req.headers.authorization;
    try {
        if (!bearerToken) return res.status(401).json({ error: "Unauthorized - Token not provided." });
        const token = bearerToken.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SEC_KEY);
        // if (decodedToken.id !== id && decodedToken.role !== 'MANAGER') return res.status(403).json({ error: "Manager access required." });

        const q = `SELECT * 
                    FROM billets b
                    LEFT JOIN gainstype g
                    on b.gainTypeId = g.id
                    where b.clientId = ?`;
        db.query(q, [decodedToken.id], (err, data) => {
            if (err) {
                console.error("Error executing database query:", err);
                return res.status(500).send({error: "Internal Server Error"});
            }
            return res.status(200).json(data);
        });
    } catch (e) {
        console.error("An unexpected error occurred:", e);
        return res.status(500).send({error: "Internal Server Error"});
    }
};

export const getOneByCode = (req, res) => {
    const code = req.params.code;
    const bearerToken = req.headers.authorization;
    try {
        if (!bearerToken) return res.status(401).json({ error: "Unauthorized - Token not provided." });
        const token = bearerToken.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SEC_KEY);
        if (!decodedToken) return res.status(403).json({ error: "Unauthorized - Token not valid" });

        const q = `SELECT b.*, g.img, g.libelle, g.percentage, g.ticketsTotal, g.ticketsUtilise 
                    FROM billets b
                    LEFT JOIN gainstype g
                    on b.gainTypeId = g.id
                    where b.code = ?`;
        db.query(q, [code], (err, data) => {
            if (err) {
                console.error("Error executing database query:", err);
                return res.status(500).send({error: "Internal Server Error"});
            }
            return res.status(200).json(data[0]);
        });
    } catch (e) {
        console.error("An unexpected error occurred:", e);
        return res.status(500).send({error: "Internal Server Error"});
    }
};

export const clientModifierBillet = (req, res) => {
    const id = req.body.id;
    const bearerToken = req.headers.authorization;
    try {
        if (!bearerToken) return res.status(401).json({ error: "Unauthorized - Token not provided." });
        const token = bearerToken.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SEC_KEY);
        if (!decodedToken) return res.status(403).json({ error: "Unauthorized - Token not valid" });

        const q = `update billets set 
                    clientId = ?,
                    dateUtilise = ?,
                    statut = ?
                    where id = ?`;
        const values = [decodedToken.id, new Date(Date.now()), 1, id];
        db.query(q, values, (err, data) => {
            if (err) {
                console.error("Error executing database query:", err);
                return res.status(500).send({error: "Internal Server Error"});
            }
            return res.status(200).json(data);
        });
    } catch (e) {
        console.error("An unexpected error occurred:", e);
        return res.status(500).send({error: "Internal Server Error"});
    }
};

export const employeModifierBillet = (req, res) => {
    const id = req.body.id;
    const bearerToken = req.headers.authorization;
    try {
        if (!bearerToken) return res.status(401).json({ error: "Unauthorized - Token not provided." });
        const token = bearerToken.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SEC_KEY);
        if (decodedToken.role !== "EMPLOYE" && decodedToken.role !== "MANAGER") return res.status(403).json({ error: "Unauthorized - You can't do that" });

        const q = `update billets set 
                    employeId = ?,
                    dateRecuperer = ?,
                    recuperer = ?
                    where id = ?`;
        const values = [decodedToken.id, new Date(Date.now()), 1, id];
        db.query(q, values, (err, data) => {
            if (err) {
                console.error("Error executing database query:", err);
                return res.status(500).send({error: "Internal Server Error"});
            }
            return res.status(200).json(data);
        });
    } catch (e) {
        console.error("An unexpected error occurred:", e);
        return res.status(500).send({error: "Internal Server Error"});
    }
};

export const getStatistics = (req, res) => {
    try {
        const getUsers = new Promise((resolve, reject) => {
            const q = `SELECT COUNT(*) AS userCount FROM utilisateurs`;
            db.query(q, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data[0].userCount);
                }
            });
        });

        const getUsedTickets = new Promise((resolve, reject) => {
            const q = `SELECT COUNT(*) AS usedCount FROM billets WHERE statut = 1`;
            db.query(q, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data[0].usedCount);
                }
            });
        });

        Promise.all([getUsers, getUsedTickets])
            .then(([userCount, usedCount]) => {
                const ticketCount = 500000;
                const restant = ticketCount - usedCount;
                return res.status(200).json({ tickets: ticketCount, used: usedCount, restant: restant, users: userCount });
            })
            .catch(err => {
                console.error("An unexpected error occurred:", err);
                return res.status(500).send({ error: "Internal Server Error" });
            });
    } catch (e) {
        console.error("An unexpected error occurred:", e);
        return res.status(500).send({ error: "Internal Server Error" });
    }
};