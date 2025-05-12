import Express from "express";
import cors from "cors";
import auth from "./apis/auth.js";
import utilisateurs from "./apis/utilisateurs.js";
import billets from "./apis/billets.js";
import newsletter from "./apis/newsletters.js";
import gainType from "./apis/gainsType.js";
import dateJeux from "./apis/dateJeux.js";
import passport from "passport";
import crypto from "crypto";
import { db } from "./db.js";

const app = Express();

app.use(Express.json());
app.use(cors());


app.use("/api/auth/", auth);
app.use("/api/utilisateurs/", utilisateurs);
app.use("/api/billets/", billets);
app.use("/api/newsletters/", newsletter);
app.use("/api/gains-type/", gainType);
app.use("/api/date-jeux/", dateJeux);

app.get("/api/test", (req, res) => {
    return res.send("Hello world!");
});

// app.get('/api/auth/google',
//     passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// app.get('/api/auth/google/callback', 
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     function(req, res) {
//     // Successful authentication, redirect home.
//     res.send(`Welcome, ${req.user.nom}!`);
// });

// function generateTicketCode() {
//     return crypto.randomBytes(5).toString('hex').toUpperCase();
// }

// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
// }

// function createPrizeDistribution() {
//     const distribution = [];
//     for (let i = 0; i < 300000; i++) distribution.push(1); // 60%
//     for (let i = 0; i < 100000; i++) distribution.push(2); // 20%
//     for (let i = 0; i < 50000; i++) distribution.push(3); // 10%
//     for (let i = 0; i < 30000; i++) distribution.push(4); // 6%
//     for (let i = 0; i < 20000; i++) distribution.push(5); // 4%
//     return shuffleArray(distribution);
// }

// app.get('/api/generate/tickets', (req, res) => {
//     let tickets = [];
//     const prizeDistribution = createPrizeDistribution();

//     for (let i = 0; i < prizeDistribution.length; i++) {
//         let code = generateTicketCode();
//         let gainTypeId = prizeDistribution[i];

//         const q = `INSERT INTO billets (code, gainTypeId) VALUES (?, ?)`;

//         db.query(q, [code, gainTypeId], (error, results) => {
//             if (error) {
//                 console.log(error);
//                 return res.status(500).json({ message: 'error', error });
//             }
//             console.log(i)
//         });
//     }
//     return res.status(200).json({ message: 'success' });
// });


app.listen(9009, () => {
    console.log("Server is running");
});
