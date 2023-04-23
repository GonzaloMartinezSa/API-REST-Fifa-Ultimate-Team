import fs from 'fs';
import path from 'path';
import { pool } from '../src/db.js'

const createTablesScript = `
  CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE
  );

  CREATE TABLE posts (
    id INTEGER PRIMARY KEY,
    title TEXT,
    content TEXT,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`;

const dropTablesScript = `
  DROP TABLE IF EXISTS posts;
  DROP TABLE IF EXISTS users;
`;

export async function readSQLfILE() {
  //console.log('Empiezo a imprimir lo del .sql!');
  // var filePath = path.join(__dirname, '..', 'db', 'database.sql');
  //const filePath = '../db/database.sql';
  //const {pathname: filePath} = new URL('../db/database.sql', import.meta.url)
  const filePath = 'C:\\Users\\gonza\\OneDrive\\Documentos\\Code\\Node\\node-api-rest-fifa\\db\\database_sqlite.sql'
  //const filePath = '../db/database.sql'
  //console.log(`Esta es la URL: ${filePath} !`);
  const fileExtension = path.extname(filePath);

  if (fs.existsSync(filePath)) {
    if (fileExtension === '.sql') {

      // Read the file as text
      const text = fs.readFileSync(filePath).toString();
      const dataArr = text.toString().split(");");

      const db = pool.get();

      // db.serialize ensures that your queries are one after the other depending on which one came first in your `dataArr`
      await db.serialize(async () => {
        // db.run runs your SQL query against the DB
        await db.run("PRAGMA foreign_keys=OFF;");
        await db.run("BEGIN TRANSACTION");
        // Loop through the `dataArr` and db.run each query
        dataArr.forEach(async query => {
          if (query) {
            // Add the delimiter back to each query before you run them
            // In my case the it was `);`
            query += ");";
            console.log(`This is the query: 
            ${query}`);
            if(query != ");") {
              await db.run(query, err => {
                if (err) console.error(err.message);
              });
            }
          }
        });
        await db.run("COMMIT");
        console.log("COMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMITED CREAAAAAAAAAAAAAAAAAAATE");
      });

      //console.log(`Este es el contenido: ${text}`);
    
    } else {
      console.log('File is not a SQL file');
    }
  } else {
    console.log('File does not exist');
  }
}

export async function dropTablesScript2() {
  //console.log('Empiezo a imprimir lo del .sql!');
  // var filePath = path.join(__dirname, '..', 'db', 'database.sql');
  //const filePath = '../db/database.sql';
  //const {pathname: filePath} = new URL('../db/database.sql', import.meta.url)
  const filePath = 'C:\\Users\\gonza\\OneDrive\\Documentos\\Code\\Node\\node-api-rest-fifa\\db\\database_drop_sqlite.sql'
  //const filePath = '../db/database.sql'
  //console.log(`Esta es la URL: ${filePath} !`);
  const fileExtension = path.extname(filePath);

  if (fs.existsSync(filePath)) {
    if (fileExtension === '.sql') {

      // Read the file as text
      const text = fs.readFileSync(filePath).toString();
      const dataArr = text.toString().split(";");

      const db = pool.get();

      // db.serialize ensures that your queries are one after the other depending on which one came first in your `dataArr`
      await db.serialize(async () => {
        // db.run runs your SQL query against the DB
        await db.run("PRAGMA foreign_keys=OFF;");
        await db.run("BEGIN TRANSACTION");
        // Loop through the `dataArr` and db.run each query
        dataArr.forEach(async query => {
          if (query) {
            // Add the delimiter back to each query before you run them
            // In my case the it was `);`
            query += ";";
            console.log(`This is the query: 
            ${query}`);
            if(query != ";") {
              await db.run(query, err => {
                if (err) console.error(err.message);
              });
            }
          }
        });
        await db.run("COMMIT");
        console.log("COMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMITED DROOOOOOOOOOOOOOOOOOOP");
      });

      //console.log(`Este es el contenido: ${text}`);
    
    } else {
      console.log('File is not a SQL file');
    }
  } else {
    console.log('File does not exist');
  }
}

export async function setupTest() {
  return new Promise((resolve, reject) => {
    pool.serialize(() => {
      pool.exec(createTablesScript, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}

export async function teardownTest() {
  return new Promise((resolve, reject) => {
    pool.serialize(() => {
      pool.exec(dropTablesScript, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}
