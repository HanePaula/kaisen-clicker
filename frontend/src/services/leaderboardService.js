import api from './api';

export const LeaderboardService = {
  // Puxar a fila de ranks baseada ou limitada nos melhores top players globais
  getRanking: (limit = 10) => api.get(`/leaderboard?limit=${limit}`),
  
  // POST Request injetando UUID e Scores cruciais salvos e processados na cache local
  submitScore: (payload) => api.post('/leaderboard', payload)
};
