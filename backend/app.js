const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./src/routes');

// Importando middlewares globais criados para segurança 
const errorHandler = require('./src/middlewares/errorMiddleware');

// ==========================================
// Middlewares Globais do App Express (Inbound)
// ==========================================
app.use(express.json()); // Body Parser

// Configuração Profissional CORS (Lê as origens blindadas do arquivo .env)
app.use(cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

// ==========================================
// Acoplamento da Raíz de Rotas (Controller-Service Flow)
// ==========================================
// Observação Clássica: Os middlewares granulares como validateInput() ou authMiddleware são injetados sob-medida lá dentro de src/routes/X !
app.use('/api', routes);

// ==========================================
// Middlewares Finais e Fallbacks globais de Erro
// ==========================================
// Rota inexistente (Catch 404):
app.use((req, res, next) => {
    res.status(404).json({ error: 'Página ou Método não encontrado no Servidor da API (Express 404).' });
});

// Manipulador Final Absoluto de Crash e Exceptions (Captura Global via Next):
app.use(errorHandler);

module.exports = app;
