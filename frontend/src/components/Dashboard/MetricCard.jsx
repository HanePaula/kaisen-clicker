import React from 'react';

/**
 * Cartão de apresentação pura de Métricas para o Dashboard do App
 */
export const MetricCard = ({ title, value, unit = '', highlight = false }) => {
    return (
        <article className={`metric-card ${highlight ? 'highlight-wine' : ''}`} aria-labelledby={`title-${title.replace(/\s+/g, '-')}`}>
            <h3 id={`title-${title.replace(/\s+/g, '-')}`}>{title}</h3>
            
            <p aria-label={`Valor de ${title}`}>
                {value} {unit}
            </p>
            
            {/* Renderização Condicional Limpa: Sem if/else brutal, apenas ternário inline JSX */}
            {highlight && <span role="status" className="badge-excellence">Padrão Ouro!</span>}
        </article>
    );
};
