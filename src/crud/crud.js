import { pool } from "../db.js";

export const d = async (table, id_name, id, res) => {
  try {
    const [rows] = await pool.query("DELETE FROM " + table + " WHERE " + id_name + " = ?", [id]);

    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: table + " not found" });
    }

    res.status(204);
  } catch (error) {
    return res.status(500).json({ message: table + " " + id_name + " " + id });
  }
}

export const get = async (res, table) => {
  try {
    const [rows] = await pool.query("SELECT * FROM " + table);
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }   
};