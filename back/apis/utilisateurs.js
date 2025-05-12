import express from "express";
import { ajouterUtilisateur, getAll, getOne, getParticipants, modifierUtilisateur, supprimerUtilisateur } from "../controllers/utilisateurController.js";

const router = express.Router();

router.get("/", getAll);
router.get("/participants", getParticipants);
router.get("/:id", getOne);
router.post("/ajouter", ajouterUtilisateur);
router.put("/modifier/:id", modifierUtilisateur);
router.delete("/supprimer/:id", supprimerUtilisateur);

export default router;