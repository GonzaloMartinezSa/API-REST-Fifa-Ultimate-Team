import config_prod from "./configs/config.prod.js";
import config_dev from "./configs/config.dev.js";
import config_test from "./configs/config.test.js";
import { createPool } from "mysql2/promise";
import sqlite3 from "sqlite3";
import MysqlAdapter from './adapters/mysql.adapter.js'
import SqliteAdapter from './adapters/sqlite3.adapter.js'

// import {
//   DB_DATABASE,
//   DB_HOST,
//   DB_PASSWORD,
//   DB_PORT,
//   DB_USER,
// } from "./config.js";

const env = process.env.NODE_ENV || 'dev';

let config;

switch (env) {
  case 'prod':
    config = config_prod;
    break;
  case 'test':
    config = config_test;
    break;
  default:
    config = config_dev;
    break;
}

let pool_exp;

switch (config.driver) {
  case 'mysql2':
    pool_exp = createPool({
      host: config.host,
      user: config.user,
      password: config.password,
      port: config.port,
      database: config.database,
    });
    pool_exp = new MysqlAdapter(pool_exp);
    break;
  case 'sqlite3':
    pool_exp = new sqlite3.Database(config.filename);
    pool_exp = new SqliteAdapter(pool_exp);
    break;
  default:
    throw new Error(`Unsupported database driver: ${config.driver}`);
}

export const pool = pool_exp;
