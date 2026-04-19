import api from './api';

/**
 * Endpoints estritamente comunicativos focados na interface de Player (/api/players) do back-end.
 */
export const PlayerService = {
  /** Puxar todos os players já cadastrados com id */
  getAll: () => api.get('/players'),
  
  /** Buscar info de um Player passando só UUID */
  getById: (id) => api.get(`/players/${id}`),
  
  /** Cadastra jogador local no DB da rede repassando o payload "username" etc */
  create: (playerData) => api.post('/players', playerData),
  
  /** Troca informacoes isoladas (como seu Username) */
  update: (id, playerData) => api.put(`/players/${id}`, playerData),
  
  /** Força o encerramento do vínculo (Hard delete) */
  delete: (id) => api.delete(`/players/${id}`)
};
