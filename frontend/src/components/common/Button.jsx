import React from 'react';

/**
 * Componente Burro (Dumb/Presentational)
 * Exclusivamente focado em renderização acessível e flexível baseada em props.
 */
export const Button = ({ children, onClick, disabled = false, variant = 'primary', type = 'button', ...props }) => {
    return (
        <button 
            type={type}
            onClick={onClick} 
            disabled={disabled}
            className={`kaizen-btn btn-${variant}`}
            aria-disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};
