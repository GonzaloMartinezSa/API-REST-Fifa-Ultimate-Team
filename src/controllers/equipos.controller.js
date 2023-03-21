import { pool } from "../db.js";
import { getAll, get, delet } from "../crud/crud.js";

const table_name = "Equipo";
const id_name = "id_equipo";

export const getEquipos = async (req, res) => {
  return getAll(res, table_name);
};

export const getEquipo = async (req, res) => {
  const { id } = req.params;
  return get(res, table_name, id_name, id);
};

export const deleteEquipo = async (req, res) => {
  const { id } = req.params;
  return delet(res, table_name, id_name, id);
};

export const createEquipo = async (req, res) => {
  try {
    const { id_liga, nombre_equipo } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO Equipo (id_liga, nombre_equipo) VALUES (?,?)", [id_liga, nombre_equipo]
    );
    res.status(201).json({ id: rows.insertId, id_liga, nombre_equipo });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateEquipo = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_liga, nombre_equipo } = req.body;

    const [result] = await pool.query(
      "UPDATE equipo SET id_liga = IFNULL(?, id_liga), nombre_equipo = IFNULL(?, nombre_equipo) WHERE id_equipo = ?",
      [id_liga, nombre_equipo, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Equipo not found" });

    const [rows] = await pool.query("SELECT * FROM equipo WHERE id_equipo = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
