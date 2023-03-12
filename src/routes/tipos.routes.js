import { Router } from "express";
import {
  createTipo,
  deleteTipo,
  getTipo,
  getTipos,
  updateTipo,
} from "../controllers/tipos.controller.js";

const router = Router();

// Tipos
router.get("/tipos", getTipos);
router.get("/tipos/:id", getTipo);
router.delete("/tipos/:id", deleteTipo);
router.post("/tipos", createTipo);
router.patch("/tipos/:id", updateTipo);

export default router;
