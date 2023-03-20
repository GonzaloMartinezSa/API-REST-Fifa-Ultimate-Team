import { Router } from "express";
import {
  createPais,
  deletePais,
  getPais,
  getPaises,
  updatePais,
} from "../controllers/paises.controller.js";

const router = Router();

// Paises
router.get("/paises", getPaises);
router.get("/paises/:id", getPais);
router.delete("/paises/:id", deletePais);
router.post("/paises", createPais);
router.patch("/paises/:id", updatePais);

export default router;
