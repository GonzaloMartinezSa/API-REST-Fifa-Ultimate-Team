import { pool } from "../db.js";

export const getAll = async (res, table_name) => {
  try {
    const [rows] = await pool.query("SELECT * FROM " + table_name);
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }   
};

export const get = async (res, table_name, id_name, id_value) => {
  try {
    const [rows] = await pool.query("SELECT * FROM " + table_name + " WHERE " + id_name + " = ?", [id_value]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: table_name + " not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }  
};

export const delet = async (res, table_name, id_name, id_value) => {
  try {
    const [rows] = await pool.query("DELETE FROM " + table_name + " WHERE " + id_name + " = ?", [id_value]);
    
    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: table_name + " not found" });
    }
    
    res.json({table: table_name, id: id_value, message: "Deleted succesfully"});
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};