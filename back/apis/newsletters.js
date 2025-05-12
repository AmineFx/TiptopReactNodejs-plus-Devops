import express from "express";
import { ajouterNewsletter, getAll, modifierNewsletter, supprimerNewsletter } from "../controllers/newsletterController.js";

const router = express.Router();

router.get("/", getAll);
router.post("/ajouter", ajouterNewsletter);
router.put("/modifier", modifierNewsletter);
router.delete("/supprimer/:id", supprimerNewsletter);

export default router;