const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Departamento de Polícia',
            version: '1.0.0',
            description: 'API para gerenciamento de agentes e casos policiais',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor local'
            },
        ],
    },
    apis: ['./routes/*.js'], // Caminho para os arquivos de rotas
};

const specs = swaggerJsdoc(options);

module.exports = specs;