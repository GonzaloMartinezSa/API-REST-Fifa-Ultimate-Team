import DatabaseAdapter from './database.adapter.js'

export default class SqliteAdapter extends DatabaseAdapter {
  async query(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.driver.run(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  get() {
    return this.driver;
  }

}