import { pool } from "../db.js";
import { getAll, get, delet } from "../crud/crud.js";

const table_name = "Tipo";
const id_name = "id_tipo";

export const getTipos = async (req, res) => {
  return getAll(res, table_name);
};

export const getTipo = async (req, res) => {
  const { id } = req.params;
  return get(res, table_name, id_name, id);
};

export const deleteTipo = async (req, res) => {
  const { id } = req.params;
  return delet(res, table_name, id_name, id);
};

export const createTipo = async (req, res) => {
  try {
    const { tipo } = req.body;
    const [rows] = await pool.query(
      `INSERT INTO ${table_name} (tipo) VALUES (?)`, [tipo]
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
      `UPDATE ${table_name} SET tipo = IFNULL(?, tipo) WHERE ${id_name} = ?`,
      [tipo, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: `${table_name} not found` });

    const [rows] = await pool.query(`SELECT * FROM ${table_name} WHERE ${id_name} = ?`, [id]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
