import { Router } from "express";
import {
  createPlayer,
  deletePlayer,
  getPlayer,
  getPlayers,
  updatePlayer,
} from "../controllers/players.controller.js";

const router = Router();

// Players
router.get("/players", getPlayers);
router.get("/players/:id", getPlayer);
router.delete("/players/:id", deletePlayer);
router.post("/players", createPlayer);
router.patch("/players/:id", updatePlayer);

export default router;
