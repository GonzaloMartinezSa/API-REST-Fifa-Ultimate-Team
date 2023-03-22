import { pool } from "../db.js";
import { getAll, get, delet } from "../crud/crud.js";

const table_name = "Liga";
const id_name = "id_liga";

export const getLigas = async (req, res) => {
  return getAll(res, table_name);
};

export const getLiga = async (req, res) => {
  const { id } = req.params;
  return get(res, table_name, id_name, id);
};

export const deleteLiga = async (req, res) => {
  const { id } = req.params;
  return delet(res, table_name, id_name, id);
};

export const createLiga = async (req, res) => {
  try {
    const { nombre_liga } = req.body;
    const [rows] = await pool.query(
      `INSERT INTO ${table_name} (nombre_liga) VALUES (?)`, [nombre_liga]
    );
    res.status(201).json({ id: rows.insertId, nombre_liga });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateLiga = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_liga } = req.body;

    const [result] = await pool.query(
      `UPDATE ${table_name} SET nombre_liga = IFNULL(?, nombre_liga) WHERE ${id_name} = ?`,
      [nombre_liga, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: `${table_name} not found` });

    const [rows] = await pool.query(`SELECT * FROM ${table_name} WHERE ${id_name} = ?`, [id]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
