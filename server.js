require('dotenv').config();
const express = require('express');
const db = require('./db/db');

const agentesRoutes = require('./routes/agentesRoutes');
const casosRoutes = require('./routes/casosRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

async function testDbConnection() {
    try {
        await db.raw('SELECT 1+1 as result');
        console.log('✅ Conexão com o banco de dados estabelecida com sucesso.');
    } catch (error) {
        console.error('❌ FATAL: Não foi possível conectar ao banco de dados.');
        console.error('Verifique se o container do Docker está rodando com `docker-compose up -d`.');
        console.error('Verifique também as variáveis de ambiente no arquivo .env.');
        console.error('Detalhes do erro:', error.message);
        process.exit(1); // Encerra a aplicação se não conseguir conectar
    }
}

app.use(express.json());
app.use('/api', agentesRoutes);
app.use('/api', casosRoutes);

app.get('/', (req, res) => {
    res.send('API do Departamento de Polícia está no ar!');
});

testDbConnection().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
});