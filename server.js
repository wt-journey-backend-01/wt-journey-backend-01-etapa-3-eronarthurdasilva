require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Dados em memória para demonstração
const agentes = [
  { id: 1, nome: "João Silva", data_incorporacao: "2020-05-15", cargo: "inspetor" },
  { id: 2, nome: "Maria Oliveira", data_incorporacao: "2021-03-10", cargo: "detetive" },
  { id: 3, nome: "Carlos Santos", data_incorporacao: "2019-11-22", cargo: "delegado" }
];

const casos = [
  { id: 1, titulo: "Roubo na Avenida Central", descricao: "Estabelecimento comercial foi roubado durante a madrugada", data_abertura: "2023-01-15", status: "aberto", agente_id: 1 },
  { id: 2, titulo: "Desaparecimento", descricao: "Pessoa desaparecida há 3 dias", data_abertura: "2023-02-20", status: "em_andamento", agente_id: 2 },
  { id: 3, titulo: "Fraude Bancária", descricao: "Suspeita de fraude em transações bancárias", data_abertura: "2023-03-05", status: "fechado", agente_id: 3 }
];

// Rotas da API
app.get('/agentes', (req, res) => {
  res.json(agentes);
});

app.get('/agentes/:id', (req, res) => {
  const agente = agentes.find(a => a.id === parseInt(req.params.id));
  if (!agente) return res.status(404).json({ message: "Agente não encontrado" });
  res.json(agente);
});

app.post('/agentes', (req, res) => {
  const { nome, data_incorporacao, cargo } = req.body;
  const novoAgente = { id: agentes.length + 1, nome, data_incorporacao, cargo };
  agentes.push(novoAgente);
  res.status(201).json(novoAgente);
});

app.delete('/agentes/:id', (req, res) => {
  const index = agentes.findIndex(a => a.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Agente não encontrado" });
  agentes.splice(index, 1);
  res.status(204).end();
});

app.get('/casos', (req, res) => {
  const { status, agente_id } = req.query;
  let resultado = [...casos];
  
  if (status) {
    resultado = resultado.filter(c => c.status === status);
  }
  
  if (agente_id) {
    resultado = resultado.filter(c => c.agente_id === parseInt(agente_id));
  }
  
  res.json(resultado);
});

app.get('/casos/:id', (req, res) => {
  const caso = casos.find(c => c.id === parseInt(req.params.id));
  if (!caso) return res.status(404).json({ message: "Caso não encontrado" });
  res.json(caso);
});

app.post('/casos', (req, res) => {
  const { titulo, descricao, agente_id } = req.body;
  const novoCaso = { 
    id: casos.length + 1, 
    titulo, 
    descricao, 
    data_abertura: new Date().toISOString().split('T')[0],
    status: "aberto",
    agente_id: parseInt(agente_id)
  };
  casos.push(novoCaso);
  res.status(201).json(novoCaso);
});

app.patch('/casos/:id/status', (req, res) => {
  const { status } = req.body;
  const caso = casos.find(c => c.id === parseInt(req.params.id));
  if (!caso) return res.status(404).json({ message: "Caso não encontrado" });
  caso.status = status;
  res.json(caso);
});

app.delete('/casos/:id', (req, res) => {
  const index = casos.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Caso não encontrado" });
  casos.splice(index, 1);
  res.status(204).end();
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT} (Modo de demonstração com banco em memória)`);
});