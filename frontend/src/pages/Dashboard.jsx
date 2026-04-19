import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GameProvider, useGame } from '../context/GameContext';
import { KaizenDashboard } from '../components/Dashboard/KaizenDashboard';
import { UpgradeStore } from '../components/Dashboard/UpgradeStore';
import { KaizenChart } from '../components/Dashboard/KaizenChart';
import { Button } from '../components/common/Button';

import { QualityPieChart } from '../components/Dashboard/charts/QualityPieChart';
import { RatesBarChart } from '../components/Dashboard/charts/RatesBarChart';
import { UpgradesRadarChart } from '../components/Dashboard/charts/UpgradesRadarChart';
import { FinancialBarChart } from '../components/Dashboard/charts/FinancialBarChart';
import { LeaderboardService } from '../services/leaderboardService';

const ActiveWorkspace = () => {
    const { factoryState } = useGame();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const submitAndLogout = async () => {
        try {
            await LeaderboardService.submitScore({
                id: `entry-${Date.now()}`,
                playerId: user.id,
                score: factoryState.points,
                efficiency: factoryState.efficiency
            });
        } catch (error) {
            console.error('Falha de POST Leaderboard', error);
        } finally {
            logout();
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <nav className="top-nav">
                <h2>Módulo Gestão eKaizen</h2>
                <div className="user-profile">
                    <span aria-label="Analista Atual">📋 Executivo(a): {user?.username} </span>
                    <Button variant="primary" onClick={() => navigate('/ranking')}>Ranking Global</Button>
                    <Button variant="danger" onClick={submitAndLogout}>Salvar Score E Sair</Button>
                </div>
            </nav>
            <div className="game-layout">
            <div className="layout-top-tier">
                <KaizenDashboard />
                <KaizenChart data={factoryState.history} />
            </div>
            
            <div className="layout-bottom-tier">
                <QualityPieChart 
                     totalProduced={factoryState.totalProduced} 
                     defects={factoryState.defects} 
                />
                
                <RatesBarChart 
                     autoclick={factoryState.autoClickRate} 
                     tickEfficiency={Math.floor(factoryState.defectRate)} 
                />
                
                <UpgradesRadarChart 
                     distribution={factoryState.upgradeDistribution || {}} 
                />
                
                <FinancialBarChart 
                     totalEarned={factoryState.totalPointsEarned || 0} 
                     currentLiquidity={factoryState.points} 
                />
            </div>
            
            <div className="layout-store-tier">
                <UpgradeStore />
            </div>
        </div>
        </div>
    );
};

export const Dashboard = () => {
    return (
        <GameProvider>
            <main className="dashboard-page template-light">
                <ActiveWorkspace />
            </main>
        </GameProvider>
    );
};
