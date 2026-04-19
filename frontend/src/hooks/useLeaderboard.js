import { useState, useCallback } from 'react';
import { LeaderboardService } from '../services/leaderboardService';

export const useLeaderboard = () => {
    const [ranking, setRanking] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRanking = useCallback(async (limit = 10) => {
        try {
            setLoading(true);
            setError(null); // Reseta erros de cache anteriores antes de engatilhar
            const data = await LeaderboardService.getRanking(limit);
            setRanking(data);
            return data;
        } catch (err) {
            setError(err.message || 'Falha ao buscar ranking detalhe da API...');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const submitScore = useCallback(async (scoreData) => {
        try {
            setLoading(true);
            setError(null);
            const data = await LeaderboardService.submitScore(scoreData);
            return data;
        } catch (err) {
            setError(err.message || 'Houve uma falha grave ao publicar recorde de sua Fábrica no Servidor Central.');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { ranking, loading, error, fetchRanking, submitScore };
};
