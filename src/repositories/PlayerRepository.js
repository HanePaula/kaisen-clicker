const getDbConnection = require('../config/database');

class PlayerRepository {
  async findAll() {
    const query = `
      SELECT id, username, created_at as "createdAt"
      FROM players
      ORDER BY created_at DESC;
    `;
    const db = await getDbConnection();
    return await db.all(query);
  }

  async findById(id) {
    const query = `
      SELECT id, username, created_at as "createdAt"
      FROM players
      WHERE id = ?;
    `;
    const db = await getDbConnection();
    return await db.get(query, [id]) || null;
  }

  async create(playerData) {
    const query = `
      INSERT INTO players (id, username, created_at)
      VALUES (?, ?, ?)
    `;
    const values = [
      playerData.id,
      playerData.username,
      playerData.createdAt || new Date().toISOString()
    ];
    const db = await getDbConnection();
    await db.run(query, values);
    
    // Devolve espelho limpo da tabela preenchida internamente
    return await this.findById(playerData.id);
  }

  async update(id, updateData) {
    const query = `
      UPDATE players
      SET username = ?
      WHERE id = ?
    `;
    const values = [
      updateData.username,
      id
    ];
    const db = await getDbConnection();
    await db.run(query, values);
    return await this.findById(id);
  }

  async delete(id) {
    const query = `
      DELETE FROM players
      WHERE id = ?
    `;
    const db = await getDbConnection();
    const result = await db.run(query, [id]);
    return result.changes > 0;
  }
}

module.exports = PlayerRepository;
