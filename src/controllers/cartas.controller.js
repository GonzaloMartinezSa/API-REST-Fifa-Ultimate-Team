import { pool } from "../db.js";
import { getAll, get, delet } from "../crud/crud.js";

const table_name = "Carta";
const id_name = "id_carta";

export const getCartas = async (req, res) => {
  return getAll(res, table_name);
};

export const getCarta = async (req, res) => {
  const { id } = req.params;
  return get(res, table_name, id_name, id);
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
  const { id } = req.params;
  return delet(res, table_name, id_name, id);
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
      return res.status(404).json({ message: `${table_name} not found` });

    const [rows] = await pool.query(`SELECT * FROM ${table_name} WHERE ${id_name} = ?`, [id]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
