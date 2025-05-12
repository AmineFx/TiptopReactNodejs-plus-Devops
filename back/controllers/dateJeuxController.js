import { db } from "../db.js";

export const getDateJeux = (req, res) => {
    try {
        const q = `select * from datejeux`;
        db.query(q, (err, data) => {
            if (err) {
                console.error("Error executing database query:", err);
                return res.status(500).send({error: "Internal Server Error"});
            }
            return res.status(200).json(data[0]);
        });
    } catch (error) {
        console.error("An unexpected error occurred:", error);
        return res.status(500).send({error: "Internal Server Error"});
    }
};