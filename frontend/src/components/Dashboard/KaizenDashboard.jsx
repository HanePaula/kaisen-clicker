import React from 'react';
import { useGame } from '../../context/GameContext';
import { MetricCard } from './MetricCard';
import { Button } from '../common/Button';

/**
 * Smart Component: Dash Container primário.
 * Ele reage ativamente à cada tick/state refeito pelo `GameContext` (React Repaint Tracking)
 */
export const KaizenDashboard = () => {
    const { factoryState, manualWork, resetGame } = useGame();

    return (
        <section className="dashboard-container" aria-label="Painel Principal da Fábrica">
            <header className="dashboard-header color-wine">
                <h2>Métricas Base OEE</h2>
            </header>

            <div className="metrics-grid">
                {/* Repassagem props estritas para blocos filhos cegos */}
                <MetricCard title="Caixa Acumulado" value={factoryState.points} unit="R$" highlight={false} />
                <MetricCard title="Peças Aprovadas" value={factoryState.totalProduced} unit="Lotes" highlight={true} />
                <MetricCard title="Avarias/Refugos" value={factoryState.defects} unit="Falhas" highlight={false} />
                <MetricCard title="Eficiência do Sistema" value={Math.floor(factoryState.efficiency)} unit="%" highlight={false} />
            </div>

            <div className="action-panel">
                <Button variant="wine" onClick={manualWork} aria-label="Avançar Esteira">
                    Girar Esteira de Produção
                </Button>
                <Button variant="danger" onClick={resetGame} aria-label="Resetar Progresso">
                    Fechar Fábrica e Reiniciar
                </Button>
            </div>
        </section>
    );
};
