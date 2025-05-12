import { db } from "../db.js";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";

dotenv.config();


export const getAll = (req, res) => {
    const bearerToken = req.headers.authorization;
    try {
        if (!bearerToken) return res.status(401).json({ error: "Unauthorized - Token not provided." });
        const token = bearerToken.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SEC_KEY);
        if (!decodedToken || decodedToken.role !== 'MANAGER') return res.status(403).json({ error: "Manager access required." });

        const q = `select id, prenom, nom, email, genre, dateNaissance, role, inscription, cree, compte from utilisateurs`;
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

export const getOne = (req, res) => {
    const id = req.params.id;
    const bearerToken = req.headers.authorization;
    try {
        if (!bearerToken) return res.status(401).json({ error: "Unauthorized - Token not provided." });
        const token = bearerToken.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SEC_KEY);
        if (decodedToken.id !== id && decodedToken.role !== 'MANAGER') return res.status(403).json({ error: "Unauthorized - You can't do that." });

        const q = `select * from utilisateurs where id = ?`;
        db.query(q, [id], (err, data) => {
            if (err) {
                console.error("Error executing database query:", err);
                return res.status(500).send({error: "Internal Server Error"});
            }
            const {mdp, ...info} = data;
            return res.status(200).json(info);
        });
    } catch (e) {
        console.error("An unexpected error occurred:", e);
        return res.status(500).send({error: "Internal Server Error"});
    }
};

export const getParticipants = (req, res) => {
    const bearerToken = req.headers.authorization;
    try {
        if (!bearerToken) return res.status(401).json({ error: "Unauthorized - Token not provided." });
        const token = bearerToken.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SEC_KEY);
        if (!decodedToken && decodedToken.role !== 'EMPLOYE' && decodedToken.role !== 'MANAGER') return res.status(403).json({ error: "Manager access required." });

        const q = `SELECT u.id, u.prenom, u.nom, u.email, u.genre, u.dateNaissance, u.role, u.inscription, u.cree, u.compte, b.*
                    from utilisateurs u
                    LEFT join billets b
                    on u.id = b.clientId
                    where b.id != ? AND b.statut = ?`;
        db.query(q, [0, 1], (err, data) => {
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

export const ajouterUtilisateur = (req, res) => {
    const bearerToken = req.headers.authorization;
    const dataBody = req.body;
    try {
        if (!bearerToken) return res.status(401).json({ error: "Unauthorized - Token not provided." });
        const token = bearerToken.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SEC_KEY);
        if (!decodedToken || decodedToken.role !== 'MANAGER') return res.status(403).json({ error: "Manager access required." });

        const q = "SELECT * FROM utilisateurs WHERE email = ?";
        db.query(q, [dataBody.email], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.length > 0) return res.status(400).json("Email already exists. Please choose a different email.");

            var key = process.env.PASS_SEC;
            const encryptedPassword = CryptoJS.AES.encrypt(dataBody.mdp, key).toString();
            const qInsert = `
                INSERT INTO utilisateurs (prenom, nom, email, genre, mdp, dateNaissance, role)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [dataBody.prenom, dataBody.nom, dataBody.email, dataBody.genre, encryptedPassword, dataBody.dateNaissance, dataBody.role];
            db.query(qInsert, values, (errInsert, dataInsert) => {
                if (errInsert) return res.status(500).send(errInsert);
                return res.status(201).json(`user has been created successfully!`);
            })
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const modifierUtilisateur = (req, res) => {
    const id = req.params.id;
    const bearerToken = req.headers.authorization;
    const dataBody = req.body;
    try {
        if (!bearerToken) return res.status(401).json({ error: "Unauthorized - Token not provided." });
        const token = bearerToken.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SEC_KEY);
        if (decodedToken.id !== id && decodedToken.role !== 'MANAGER') return res.status(403).json({ error: "Unauthorized - You can't do that." });

        const q = "SELECT * FROM utilisateurs WHERE email = ?";
        db.query(q, [dataBody.email], (err, data) => {
            if (err) return res.status(500).json(err);
            if (data.length === 0) return res.status(404).json("User not found.");

            let encryptedPassword = data[0].mdp;
            if (dataBody.mdp && dataBody.mdp !== "") {
                var key = process.env.PASS_SEC;
                encryptedPassword = CryptoJS.AES.encrypt(dataBody.mdp, key).toString();
            }
            const qUpdate = `
                UPDATE utilisateurs 
                SET prenom = ?, nom = ?, email = ?, genre = ?, mdp = ?, dateNaissance = ?, role = ? 
                WHERE id = ?
            `;
            const values = [dataBody.prenom, dataBody.nom, dataBody.email, dataBody.genre, encryptedPassword, dataBody.dateNaissance, dataBody.role, id];
            db.query(qUpdate, values, (errUpdate, dataUpdate) => {
                if (errUpdate) return res.status(500).send(errUpdate);
                const {mdp, ...info} = dataUpdate;
                return res.status(200).json(info);
            })
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const supprimerUtilisateur = (req, res) => {
    const id = req.params.id;
    const bearerToken = req.headers.authorization;
    try {
        if (!bearerToken) return res.status(401).json({ error: "Unauthorized - Token not provided." });
        const token = bearerToken.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SEC_KEY);
        if (!decodedToken || decodedToken.role !== 'MANAGER') return res.status(403).json({ error: "Manager access required." });

        const q = "DELETE FROM utilisateurs WHERE id = ?";
        db.query(q, [id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(204).json("User has been deleted successfully!");
        });
    } catch (error) {
        res.status(500).json(error);
    }
};