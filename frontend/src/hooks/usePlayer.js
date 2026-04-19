import { useState, useCallback } from 'react';
import { PlayerService } from '../services/playerService';

export const usePlayer = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateProfile = useCallback(async (id, data) => {
        try {
            setLoading(true);
            setError(null);
            const res = await PlayerService.update(id, data);
            return res;
        } catch (err) {
            setError(err.message || 'Falha misteriosa ao tentar alterar o nome/perfil do Jogador local.');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteProfile = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const res = await PlayerService.delete(id);
            return res;
        } catch (err) {
            setError(err.message || 'Tratamento impossível. Não deletado.');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, error, updateProfile, deleteProfile };
};
