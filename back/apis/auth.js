import express from 'express';
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { db } from "../db.js";
import dotenv from "dotenv";
import {OAuth2Client} from "google-auth-library";
// import passport from 'passport';
// import Google from 'passport-google-oauth20';
// const GoogleStrategy = Google.Strategy;

const router = express.Router();
dotenv.config();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

// Connexion
// Route pour la connexion des utilisateurs
router.post("/connexion", async (req, res) => {
    const { email, mdp } = req.body; // Extraction de l'email et du mot de passe depuis le corps de la requête
    const q = 'select * from utilisateurs WHERE email = ? and compte = ? '; // Requête SQL pour trouver l'utilisateur
    db.query(q, [email, true], async (err, data) => { // Exécution de la requête SQL
        if (err) return res.status(500).json(err); // Gestion des erreurs de la base de données
        else if (data.length === 0) return res.status(401).json({error: "Wrong credentials!"}); // Gestion de l'erreur si aucun utilisateur n'est trouvé
        else {
            const user = data[0]; // Sélection du premier utilisateur trouvé
            const key = process.env.PASS_SEC; // Clé secrète pour le déchiffrement
            const encryptedPassword = user.mdp; // Mot de passe chiffré stocké dans la base de données
            const decryptedBytes = CryptoJS.AES.decrypt(encryptedPassword, key); // Déchiffrement du mot de passe
            const originalPassword = decryptedBytes.toString(CryptoJS.enc.Utf8); // Conversion du mot de passe déchiffré en chaîne de caractères
            if (originalPassword !== mdp) return res.status(401).json("Wrong credentials!"); // Vérification du mot de passe
            else if (!user.compte) return res.status(403).json({error: "Your account is not activated!"}); // Vérification si le compte est activé
            else {
                const accessToken = jwt.sign({ // Création du token d'accès
                    id: user.id,
                    role: user.role
                }, process.env.JWT_SEC_KEY, {
                    expiresIn: "3d" // Durée de validité du token
                });
                const {id, mdp, ...info} = user; // Exclusion de l'id et du mot de passe du payload du token
                return res.status(200).json({ info, accessToken }); // Réponse avec les informations de l'utilisateur et le token d'accès
            }
        }
    });
});

// Route pour l'inscription des utilisateurs
router.post("/inscription", (req, res) => {
    const dataBody = req.body; // Extraction des données depuis le corps de la requête
    try {
        const q = "SELECT * FROM utilisateurs WHERE email = ?"; // Requête SQL pour vérifier si l'email existe déjà
        db.query(q, [dataBody.email], (err, data) => { // Exécution de la requête SQL
            if (err) return res.status(500).json(err); // Gestion des erreurs de la base de données
            if (data.length > 0) return res.status(400).json("Email already exists. Please choose a different email."); // Gestion de l'erreur si l'email existe déjà

            var key = process.env.PASS_SEC; // Clé secrète pour le chiffrement
            const encryptedPassword = CryptoJS.AES.encrypt(dataBody.mdp, key).toString(); // Chiffrement du mot de passe
            const qInsert = `
                INSERT INTO utilisateurs (prenom, nom, email, genre, mdp, dateNaissance)
                VALUES (?, ?, ?, ?, ?, ?)
            `; // Requête SQL pour insérer le nouvel utilisateur
            const values = [dataBody.prenom, dataBody.nom, dataBody.email, dataBody.genre, encryptedPassword, dataBody.dateNaissance]; // Valeurs à insérer
            db.query(qInsert, values, (errInsert, dataInsert) => { // Exécution de la requête d'insertion
                if (err) return res.status(500).send(err); // Gestion des erreurs de la base de données
                return res.status(201).json(`user has been created successfully!`); // Réponse de succès
            })
        });
    } catch (error) {
        res.status(500).json(error); // Gestion des erreurs inattendues
    }
});

// Route Pour la connexion avec Google

function generateRandomPassword() {
    return Math.random().toString(36).slice(-8);
}

router.post('/google', async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const q = 'select * from utilisateurs WHERE email = ? and compte = ?';
        db.query(q, [payload?.email, 1], (err, data) => {
            if (err) {
                console.error('Error querying MySQL:', err);
                return res.status(500).send({ error: 'Internal server error' });
            }

            if (data.length === 0) {
                var key = process.env.PASS_SEC;
                const encryptedPassword = CryptoJS.AES.encrypt(generateRandomPassword(), key).toString();
                const values = [
                    payload?.given_name,
                    payload?.family_name,
                    payload?.email,
                    encryptedPassword,
                    'GOOGLE'
                ];
                const insertQ = `INSERT INTO utilisateurs (prenom, nom, email, mdp, inscription)
                                VALUES (?, ?, ?, ?, ?)`;
                db.query(insertQ, values, (insertErr, insertData) => {
                    if (insertErr) {
                        console.error('Error inserting user into MySQL:', insertErr);
                        return res.status(500).send({ error: 'Internal server error' });
                    }
                    const info = {
                        id: insertData.insertId,
                        prenom: payload.given_name,
                        nom: payload.family_name,
                        email: payload.email,
                    };
                    const accessToken = jwt.sign({
                        id: insertData.insertId,
                        role: 'CLIENT'
                    }, process.env.JWT_SEC_KEY, {
                        expiresIn: "3d"
                    });
                    return res.status(200).json({...info, accessToken});
                });
            } else {
                const user = data[0];
                const accessToken = jwt.sign({
                    id: user.id,
                    role: user.role
                }, process.env.JWT_SEC_KEY, {
                    expiresIn: "3d"
                });
                const {id, mdp, ...info} = user;
                return res.status(200).json({...info, accessToken});
            }
        });
    } catch (error) {
        console.error('Error verifying Google token:', error);
        res.status(401).send({ error: 'Unauthorized' });
    }
});





// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "/api/auth/google/callback"
//     },
//     function(accessToken, refreshToken, profile, cb) {
//         console.log(profile)
//         return
//         try {
//             const q = 'select * from utilisateurs WHERE email = ? and compte = ?'; // Requête SQL pour trouver l'utilisateur
//             db.query(q, [profile.email, true], async (err, data) => {
//                 if(err) throw err;
//                 const hashedPassword = await bcrypt.hash(generateRandomPassword(), 10);
//                 if (results.length === 0) {
//                     const values = [
//                         profile.name.givenName,
//                         profile.name.familyName,
//                         profile.email,
//                         hashedPassword,
//                         'GOOGLE'
//                     ];
//                     const insertQ = `INSERT INTO utilisateurs (prenom, nom, email, mdp, inscription)
//                                     VALUES (?, ?, ?, ?)`;
//                     db.query(insertQ, values, function(errData, insertData) {
//                         if (errData) throw errData;

//                         newUser.id = insertData.insertId;
//                         return cb(null, newUser);
//                     });
//                 } 
//                 else {
//                     return cb(null, results[0]);
//                 }
//             });
//         } catch (error) {
//             return cb(error);
//         }
//     }
// ));

// passport.serializeUser(function(user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function(obj, done) {
//     done(null, obj);
// });





export default router;