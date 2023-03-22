import { pool } from "../db.js";
import { getAll, get, delet } from "../crud/crud.js";

const table_name = "Player";
const id_name = "id_player";

export const getPlayers = async (req, res) => {
  return getAll(res, table_name);
};

export const getPlayer = async (req, res) => {
  const { id } = req.params;
  return get(res, table_name, id_name, id);
};

export const deletePlayer = async (req, res) => {
  const { id } = req.params;
  return delet(res, table_name, id_name, id);
};

export const createPlayer = async (req, res) => {
  try {
    const { first_name, last_name } = req.body;
    const [rows] = await pool.query(
      `INSERT INTO ${table_name} (first_name, last_name) VALUES (?, ?)`,
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
      `UPDATE ${table_name} SET first_name = IFNULL(?, first_name), last_name = IFNULL(?, last_name) WHERE ${id_name} = ?`,
      [first_name, last_name, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: `${table_name} not found` });

    const [rows] = await pool.query(`SELECT * FROM ${table_name} WHERE ${id_name} = ?`, [id]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
