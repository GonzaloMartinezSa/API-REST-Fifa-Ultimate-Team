import { pool } from "../db.js";

export const getPlayers = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM player");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getPlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM player WHERE id_player = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deletePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM player WHERE id_player = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createPlayer = async (req, res) => {
  try {
    const { first_name, last_name } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO player (first_name, last_name) VALUES (?, ?)",
      [first_name, last_name]
    );
    res.status(201).json({ id: rows.insertId, first_name, last_name });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updatePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name } = req.body;

    const [result] = await pool.query(
      "UPDATE player SET first_name = IFNULL(?, first_name), last_name = IFNULL(?, last_name) WHERE id_player = ?",
      [first_name, last_name, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Player not found" });

    const [rows] = await pool.query("SELECT * FROM player WHERE id_player = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
