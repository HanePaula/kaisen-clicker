/**
 * Tipos de Dados da Aplicação e Contratos (JSDoc)
 * 
 * Este arquivo concentra as "interfaces" de dados, permitindo que IDEs 
 * forneçam IntelliSense baseado no espelhamento do backend e no domínio do front-end.
 */

/**
 * Entidade espelhada do Backend.
 * @typedef {Object} Player
 * @property {string} id - UUID gerado no backend.
 * @property {string} username - Nome do jogador usado no Leaderboard.
 * @property {Date|string} createdAt - Data de cadastro na API.
 */

/**
 * Entidade espelhada do Ranking do Backend.
 * @typedef {Object} LeaderboardEntry
 * @property {string} id - UUID da entrada.
 * @property {string} playerId - UUID do Player correspondente.
 * @property {number} score - Pontuação ou Peças submetidas.
 * @property {number} efficiency - Eficiência de produção calculada.
 * @property {Date|string} updatedAt - Data do recorde.
 */

/**
 * Entidade Front-end - Representa o momento atual da Fábrica no Jogo (Game State).
 * @typedef {Object} FactoryState
 * @property {number} points - Quantia de dinheiro/pontos que a fábrica possui (para comprar melhorias).
 * @property {number} totalProduced - Contador absoluto de peças feitas.
 * @property {number} defects - Peças refutadas/perdidas.
 * @property {number} productionRate - Multiplicador de peças geradas por segundo.
 * @property {number} defectRate - Probabilidade base (%) de uma peça dar defeito.
 * @property {number} efficiency - OEE ou Eficiência geral calculada (%).
 */

/**
 * Entidade Front-end - Representa a estrutura de uma Melhoria comprável (Upgrade).
 * @typedef {Object} Upgrade
 * @property {string} id - Chave (ex: '5s', 'pokayoke').
 * @property {string} name - Nome de exibição na loja.
 * @property {string} description - Texto explicativo do upgrade e seus efeitos.
 * @property {number} baseCost - O custo no Level 0.
 * @property {number} costMultiplier - Taxa exponencial de custo a cada nível.
 * @property {number} currentLevel - O nível já adquirido no State.
 */

// ==========================================
// FUNÇÕES UTILITÁRIAS (Factories para inicializar objetos desses tipos)
// ==========================================

/**
 * Gera um estado inicial limpo para a Factory.
 * @returns {FactoryState}
 */
export const createInitialFactoryState = () => ({
  points: 0,
  totalProduced: 0,
  defects: 0,
  productionRate: 1, 
  defectRate: 15.0, 
  efficiency: 85.0,
  autoClickRate: 0,
  history: [
    { time: 0, points: 0, efficiency: 85.0 }
  ],
  totalPointsEarned: 0,
  upgradeDistribution: {
    '5s': 0,
    'kanban': 0,
    'iot': 0,
    'tpm': 0
  }
});

/**
 * Cria instâncias em branco em memória para o Player do front-end, antes de enviar a API.
 * @param {string} username 
 * @returns {Player}
 */
export const createLocalPlayer = (username) => ({
    id: `local-${Date.now()}`, // Fallback até ter backend
    username,
    createdAt: new Date().toISOString()
});
