export const MOCK_UPGRADES = [
    { id: '5s', name: 'Metodologia 5S', description: 'Reduz a taxa base de defeitos/lixo garantindo 2% menos acidentes.', cost: 500, effect: (p) => ({ ...p, defectRate: Math.max(0, p.defectRate - 2.0) }) },
    { id: 'kanban', name: 'Sistema Kanban Pull', description: 'Otimiza estoques intermedíarios. Aumenta lucro do ganho base + $50 por clique.', cost: 3500, effect: (p) => ({ ...p, pointsPerTick: (p.pointsPerTick || 50) + 50 }) },
    { id: 'iot', name: 'Automação IoT', description: 'Gira a esteira automaticamente sem intervenção humana (+1 Giro a cada tick).', cost: 7000, effect: (p) => ({ ...p, autoClickRate: (p.autoClickRate || 0) + 1 }) },
    { id: 'tpm', name: 'Manutenção TPM', description: 'Garante que os botões corram lisos, diminuindo falhas grotescas na raiz elétrica -15% avarias.', cost: 15000, effect: (p) => ({ ...p, defectRate: Math.max(0, p.defectRate - 15.0) }) }
];

/**
 * Engenharia Matemática Pura: 
 * Classe isolada agnóstica para manipulação dos tiques do clicker. 
 * Resolveu o problema do React (Front) cuidando de cálculos. Pode inclusive ser portada pro BackEnd Native Node!
 */
export class GameEngine {
    static processTick(currentState) {
        const defectChance = currentState.defectRate || 15;
        const hasDefect = Math.random() * 100 < defectChance;
        const ptsEarned = currentState.pointsPerTick || 50;
        
        const nextProduced = currentState.totalProduced + 1;
        const nextDefects = hasDefect ? currentState.defects + 1 : currentState.defects;
        const nextPoints = hasDefect ? currentState.points : currentState.points + ptsEarned;
        const nextEfficiency = Math.floor(100 - (nextDefects / nextProduced) * 100) || 100;
        
        const nextTime = (currentState.history[currentState.history.length - 1]?.time || 0) + 1;
        
        // Histórico Capado (Max 25 pts visiveis ao msm tempo no chart pra evitar leak de RAM na tela e lentidão via DOM Nodes infinito)
        const updatedHistory = [...currentState.history, {
            time: nextTime,
            points: nextPoints,
            efficiency: nextEfficiency 
        }].slice(-25);

        return {
            ...currentState,
            totalProduced: nextProduced,
            defects: nextDefects,
            points: nextPoints,
            efficiency: nextEfficiency,
            history: updatedHistory,
            totalPointsEarned: hasDefect ? currentState.totalPointsEarned : (currentState.totalPointsEarned || 0) + ptsEarned
        };
    }

    static processUpgrade(currentState, upgradeId) {
        const upgrade = MOCK_UPGRADES.find(u => u.id === upgradeId);
        // Regra barrando pobre e invasão null pointer de id fake
        if (!upgrade || currentState.points < upgrade.cost) {
            return currentState;
        }

        const nextState = upgrade.effect(currentState);
        
        // Cópia Segura do Dicionário de Distribuições Incrementado
        const nextDistribution = { ...(nextState.upgradeDistribution || {}) };
        nextDistribution[upgradeId] = (nextDistribution[upgradeId] || 0) + 1;

        return {
            ...nextState,
            points: nextState.points - upgrade.cost,
            upgradeDistribution: nextDistribution
        };
    }
}
