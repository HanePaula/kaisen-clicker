require('dotenv').config();
const app = require('./app');

// Idealmente 'dotenv' é acionado via script de package.json ex: `node -r dotenv/config server.js`
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`[Kaizen Clicker] Backend API operando seguro na porta: ${PORT}`);
});
