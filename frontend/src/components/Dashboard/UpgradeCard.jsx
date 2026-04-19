import React from 'react';

/**
 * Card contendo titulo e botão indicativo pra efetuar a compra, aguardando ordens do pai Smart.
 */
export const UpgradeCard = ({ name, description, cost, isAffordable, onPurchase }) => {
    return (
        <article className="upgrade-item" aria-label={`Melhoria Kaizen: ${name}`}>
            <div className="upgrade-header">
                <h4>{name}</h4>
                <span className="price-tag" aria-label="Preço base comercializado">${cost}</span>
            </div>
            <p className="upgrade-desc">{description}</p>
            
            <button 
                type="button"
                onClick={onPurchase} 
                disabled={!isAffordable}
                className={`kaizen-btn ${isAffordable ? 'btn-primary' : 'btn-danger'}`}
                style={{ marginTop: '0.8rem' }}
            >
                {isAffordable ? 'Integrar Automação' : 'Aguardando Capital'}
            </button>
        </article>
    );
};
