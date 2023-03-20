import { Router } from "express";
import {
  createLiga,
  deleteLiga,
  getLiga,
  getLigas,
  updateLiga,
} from "../controllers/ligas.controller.js";

const router = Router();

// Ligas
router.get("/ligas", getLigas);
router.get("/ligas/:id", getLiga);
router.delete("/ligas/:id", deleteLiga);
router.post("/ligas", createLiga);
router.patch("/ligas/:id", updateLiga);

export default router;
