import { Router } from "express";
import {
  createEquipo,
  deleteEquipo,
  getEquipo,
  getEquipos,
  updateEquipo,
} from "../controllers/equipos.controller.js";

const router = Router();

// Equipos
router.get("/equipos", getEquipos);
router.get("/equipos/:id", getEquipo);
router.delete("/equipos/:id", deleteEquipo);
router.post("/equipos", createEquipo);
router.patch("/equipos/:id", updateEquipo);

export default router;
