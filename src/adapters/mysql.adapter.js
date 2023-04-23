import DatabaseAdapter from './database.adapter.js'

export default class MysqlAdapter extends DatabaseAdapter {
  async query(sql, params = []) {
    return await this.driver.query(sql, params);
  }
}