import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { createInitialFactoryState } from '../types';
import { GameEngine } from '../utils/GameEngine';

export const GameContext = createContext({});

export const GameProvider = ({ children }) => {
    const [factoryState, setFactoryState] = useState(createInitialFactoryState());

    // Mecânica de Background/Tycoon Oculta (Ativa quando compra Upgrades IoT)
    // Usamos ref para contornar Stale Closures (Atrasos e bugs de captura na Memoria com setIntervals do React) 
    const manualWorkRef = useRef(null);
    manualWorkRef.current = () => { setFactoryState(prev => GameEngine.processTick(prev)); };

    useEffect(() => {
        if (factoryState.autoClickRate > 0) {
            const timer = setInterval(() => {
                for(let i = 0; i < factoryState.autoClickRate; i++) {
                   manualWorkRef.current(); // Roda fora do context tracking state limit
                }
            }, 2000); 
            return () => clearInterval(timer);
        }
    }, [factoryState.autoClickRate]); // Regista apenas no mount da arvore se o Player adquiriu IOT nivel +1

    // Ação Real Humana
    const manualWork = () => manualWorkRef.current();


    const applyUpgrade = (upgradeId) => {
         setFactoryState(prev => GameEngine.processUpgrade(prev, upgradeId));
    };

    const resetGame = () => {
        setFactoryState(createInitialFactoryState());
    };

    return (
        <GameContext.Provider value={{ 
            factoryState, 
            setFactoryState,
            manualWork,
            applyUpgrade,
            resetGame 
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context || Object.keys(context).length === 0) {
        throw new Error('useGame context só serve dentro da arvore isolada <GameProvider>');
    }
    return context;
};
