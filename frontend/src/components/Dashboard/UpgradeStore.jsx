import React from 'react';
import { useGame } from '../../context/GameContext';
import { UpgradeCard } from './UpgradeCard';
import { MOCK_UPGRADES } from '../../utils/GameEngine'; // Retirando a regra do jogo da Visualização

export const UpgradeStore = () => {
    const { factoryState, applyUpgrade } = useGame();

    return (
        <section className="upgrade-store" aria-label="Loja de Melhorias Contínuas de Fábrica">
            <h3>Ferramentas de Lean/Kaizen</h3>
            <div className="upgrade-list">
                {MOCK_UPGRADES.map(upg => (
                    <UpgradeCard 
                        key={upg.id}
                        name={upg.name}
                        description={upg.description}
                        cost={upg.cost}
                        isAffordable={factoryState.points >= upg.cost}
                        onPurchase={() => applyUpgrade(upg.id)} 
                    />
                ))}
            </div>
        </section>
    );
};
