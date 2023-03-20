import { pool } from "../db.js";
import { get } from "../crud/crud.js";

export const getCartas = async (req, res) => {
  return get(res, "Pais");
};

export const getCarta = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM carta WHERE id_carta = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Carta not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getCartasDeTipo = async (req, res) => {
  try {
    const { tipo } = req.params;
    const [rows] = await pool.query("SELECT * FROM carta c JOIN tipo t ON c.id_tipo = t_id_tipo " 
    + "WHERE tipo = ?", [
      tipo,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Carta not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteCarta = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM carta WHERE id_carta = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Carta not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// TODO

export const createCarta = async (req, res) => {
  try {
    const { tipo } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO Carta (tipo) VALUES (?)", [tipo]
    );
    res.status(201).json({ id: rows.insertId, tipo });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateCarta = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo } = req.body;

    const [result] = await pool.query(
      "UPDATE tipo SET tipo = IFNULL(?, tipo) WHERE id_tipo = ?",
      [tipo, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Tipo not found" });

    const [rows] = await pool.query("SELECT * FROM tipo WHERE id_tipo = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
