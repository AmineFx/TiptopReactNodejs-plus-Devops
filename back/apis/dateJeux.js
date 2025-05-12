import express from "express";
import { getDateJeux } from "../controllers/dateJeuxController.js";

const router = express.Router();

router.get("/", getDateJeux);

export default router;