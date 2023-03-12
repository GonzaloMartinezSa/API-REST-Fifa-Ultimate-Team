import { pool } from "../db.js";

export const getTipos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM tipo");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getTipo = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM tipo WHERE id_tipo = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Tipo not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteTipo = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM tipo WHERE id_tipo = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Tipo not found" });
    }

    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createTipo = async (req, res) => {
  try {
    const { tipo } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO Tipo (tipo) VALUES (?)", [tipo]
    );
    res.status(201).json({ id: rows.insertId, tipo });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateTipo = async (req, res) => {
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
