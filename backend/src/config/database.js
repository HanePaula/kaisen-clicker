/**
 * Responsabilidade:
 * Criar DB relacional embarcado estalando dedos (sem servidores pesados em background).
 * Resolve fricção ao compartilhar o projeto (Qualquer pessoa do front roda num duplo clique).
 */

const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

let dbInstance = null;

async function getDbConnection() {
  if (dbInstance) return dbInstance;
  
  // Fabrica/Abre o 'disco' fisico na propria pasta oculta (Backend DB)
  dbInstance = await open({
    filename: path.join(__dirname, '../../kaizen_clicker.sqlite'),
    driver: sqlite3.Database
  });

  // Habilita as cascades (Restaura o delete natural caso deite de Foreign Key)
  await dbInstance.run('PRAGMA foreign_keys = ON');

  // Auto-Migrations Automáticos de Segurança: Garante as colunas certas em instâncias virgens!
  await dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS players (
      id TEXT PRIMARY KEY, 
      username TEXT NOT NULL, 
      created_at DATETIME NOT NULL
    );
  `);
  
  await dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS leaderboard_entries (
      id TEXT PRIMARY KEY, 
      player_id TEXT NOT NULL, 
      score INTEGER NOT NULL, 
      efficiency NUMERIC NOT NULL, 
      updated_at DATETIME NOT NULL, 
      FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
    );
  `);

  return dbInstance;
}

module.exports = getDbConnection;
