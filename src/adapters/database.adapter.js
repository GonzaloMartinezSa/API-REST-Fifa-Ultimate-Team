export default class DatabaseAdapter {
  constructor(driver) {
    this.driver = driver;
  }

  async query(sql, params = []) {
    // Subclasses should implement this method
  }
}
