import { Router } from "express";
import {
  createCarta,
  deleteCarta,
  getCarta,
  getCartas,
  getCartasDeTipo,
  updateCarta,
} from "../controllers/cartas.controller.js";

const router = Router();

// Cartas
router.get("/cartas", getCartas);
router.get("/cartas/:id", getCarta);
router.get("/cartas/:tipo", getCartasDeTipo)
router.delete("/cartas/:id", deleteCarta);
router.post("/cartas/:tipo/:player", createCarta);
router.patch("/tipos/:id", updateCarta);

export default router;
