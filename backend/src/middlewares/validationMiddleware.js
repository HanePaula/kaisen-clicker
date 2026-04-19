/**
 * HOC Validador com Defesas Inseridas Anti-NoSQL Injections e Proteção de Tipos
 */
const validateInput = (rules = []) => {
    return (req, res, next) => {
        const errors = [];
        for (const rule of rules) {
            const { field, message, location = 'body', type } = rule; // Pega o atributo Type
            
            const value = req[location] ? req[location][field] : undefined;
            
            // Garantir que a propriedade existe
            if (value === undefined || value === null || String(value).trim() === '') {
                errors.push(message || `O parâmetro obrigatório '${field}' em '${location}' não consta ou nulo.`);
                continue;
            }

            // Defesa de Castings Nativos (Exemplo: Enviar Score 10 em vez de Score "{ gt: 10 }")
            if (type && typeof value !== type) {
                errors.push(`Violação Crítica de Estrutura: O parâmetro [${field}] tentou empurrar obj <${typeof value}> onde exigimos restritamente Tipo <${type}>.`);
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors }); 
        }
        
        return next();
    };
};

module.exports = validateInput;
