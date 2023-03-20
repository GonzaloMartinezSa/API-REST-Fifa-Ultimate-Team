import { Router } from "express";
import {
  createUsuario,
  deleteUsuario,
  getUsuario,
  getUsuarios,
  updateUsuario,
} from "../controllers/usuarios.controller.js";

const router = Router();

// Usuarios
router.get("/usuarios", getUsuarios);
router.get("/usuarios/:id", getUsuario);
router.delete("/usuarios/:id", deleteUsuario);
router.post("/usuarios", createUsuario);
router.patch("/usuarios/:id", updateUsuario);

export default router;
