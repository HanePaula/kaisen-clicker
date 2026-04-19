const getDbConnection = require('../config/database');

class LeaderboardRepository {
  async findAll(limit = 10) {
    const query = `
      SELECT le.id, le.player_id as "playerId", p.username as "username", le.score, le.efficiency, le.updated_at as "updatedAt"
      FROM leaderboard_entries le
      INNER JOIN players p ON le.player_id = p.id
      ORDER BY le.score DESC, le.efficiency DESC
      LIMIT ?;
    `;
    const db = await getDbConnection();
    return await db.all(query, [limit]);
  }

  async findById(id) {
    const query = `
      SELECT id, player_id as "playerId", score, efficiency, updated_at as "updatedAt"
      FROM leaderboard_entries
      WHERE id = ?;
    `;
    const db = await getDbConnection();
    return await db.get(query, [id]) || null;
  }

  async create(entryData) {
    const query = `
      INSERT INTO leaderboard_entries (id, player_id, score, efficiency, updated_at)
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      entryData.id,
      entryData.playerId,
      entryData.score,
      entryData.efficiency,
      entryData.updatedAt || new Date().toISOString()
    ];
    const db = await getDbConnection();
    await db.run(query, values);
    return await this.findById(entryData.id);
  }

  async update(id, updateData) {
    const query = `
      UPDATE leaderboard_entries
      SET score = ?, efficiency = ?, updated_at = ?
      WHERE id = ?
    `;
    const values = [
      updateData.score,
      updateData.efficiency,
      new Date().toISOString(),
      id
    ];
    const db = await getDbConnection();
    await db.run(query, values);
    return await this.findById(id);
  }

  async delete(id) {
    const query = `
      DELETE FROM leaderboard_entries
      WHERE id = ?
    `;
    const db = await getDbConnection();
    const result = await db.run(query, [id]);
    return result.changes > 0;
  }
}

module.exports = LeaderboardRepository;
