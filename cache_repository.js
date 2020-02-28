class CacheRepository {
    constructor(dao) {
      this.dao = dao
    }
  
    createTable() {
      const sql = `CREATE TABLE crawler (id INTEGER PRIMARY KEY AUTOINCREMENT, returned_cached BLOB)`
      return this.dao.run(sql)
    }

    add(cache) {
      return this.dao.run(
        'INSERT INTO crawler (returned_cached) VALUES (?)',
        [cache])
    }

    fetchLastCache() {
      return this.dao.get(`SELECT * FROM crawler WHERE id = (select max(id) from crawler)`)
    }
  }
  
  module.exports = CacheRepository;