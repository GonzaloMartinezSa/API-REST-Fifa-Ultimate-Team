import { pool } from "../db.js";
import { getAll, get, delet } from "../crud/crud.js";

const table_name = "Pais";
const id_name = "id_pais";

export const getPaises = async (req, res) => {
  return getAll(res, table_name);
};

export const getPais = async (req, res) => {
  const { id } = req.params;
  return get(res, table_name, id_name, id);
};

export const deletePais = async (req, res) => {
  const { id } = req.params;
  return delet(res, table_name, id_name, id);
};

export const createPais = async (req, res) => {
  try {
    const { nombre_pais } = req.body;
    const [rows] = await pool.query(
      `INSERT INTO ${table_name} (nombre_pais) VALUES (?)`, [nombre_pais]
    );
    res.status(201).json({ id: rows.insertId, nombre_pais });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updatePais = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_pais } = req.body;

    const [result] = await pool.query(
      `UPDATE ${table_name} SET nombre_pais = IFNULL(?, nombre_pais) WHERE ${id_name} = ?`,
      [nombre_pais, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: `${table_name} not found` });

    const [rows] = await pool.query(`SELECT * FROM ${table_name} WHERE ${id_name} = ?`, [id]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
