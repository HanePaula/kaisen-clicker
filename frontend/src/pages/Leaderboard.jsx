import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LeaderboardService } from '../services/leaderboardService';
import { Button } from '../components/common/Button';

export const Leaderboard = () => {
    const navigate = useNavigate();
    const [ranking, setRanking] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRanks = async () => {
            try {
                // Pegando Top 20 Global
                const data = await LeaderboardService.getRanking(20);
                setRanking(data);
            } catch (error) {
                console.error('Falha de Comunicação / Leaderboards vazios:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchRanks();
    }, []);

    const getMedal = (index) => {
        if (index === 0) return '🥇';
        if (index === 1) return '🥈';
        if (index === 2) return '🥉';
        return `${index + 1}º`;
    };

    return (
        <main className="dashboard-page template-light" style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '900px', background: 'var(--panel-bg)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-soft)' }}>
                
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.8rem', color: 'var(--text-main)' }}>Hall da Fama (Business Metrics)</h2>
                    <Button variant="danger" onClick={() => navigate('/dashboard')}>Voltar à Fábrica</Button>
                </header>

                {loading ? (
                    <p style={{ textAlign: 'center', margin: '3rem 0', color: 'var(--text-muted)' }}>Procurando Diretores no Global...</p>
                ) : ranking.length === 0 ? (
                    <p style={{ textAlign: 'center', margin: '3rem 0', color: 'var(--text-muted)' }}>Nenhuma fábrica foi finalizada com sucesso ainda na Rede.</p>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: 'var(--bg-color)', borderBottom: '2px solid var(--border-color)' }}>
                                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 600 }}>Pos.</th>
                                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 600 }}>Diretor(a)</th>
                                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 600 }}>Caixa Financeiro</th>
                                <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 600 }}>Score OEE %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ranking.map((row, index) => (
                                <tr key={row.id || index} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }}>
                                    <td style={{ padding: '1rem', fontSize: '1.2rem' }}>{getMedal(index)}</td>
                                    <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-main)' }}>{row.username}</td>
                                    <td style={{ padding: '1rem', color: 'var(--accent-wine)', fontWeight: 700 }}>${row.score.toLocaleString()}</td>
                                    <td style={{ padding: '1rem', color: row.efficiency >= 85 ? '#10b981' : '#ef4444', fontWeight: 600 }}>{row.efficiency}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </main>
    );
};
