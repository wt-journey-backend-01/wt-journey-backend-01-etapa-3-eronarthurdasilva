require('dotenv').config();
const express = require('express');
const agentesRoutes = require('./routes/agentesRoutes');
const casosRoutes = require('./routes/casosRoutes');
const errorHandler = require('./utils/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Rotas da API
app.use('/agentes', agentesRoutes);
app.use('/casos', casosRoutes);

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});