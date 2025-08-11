exports.seed = function (knex) {
  return knex('casos').del() // Limpa a tabela antes de inserir os dados
    .then(function () {
      const dataAtual = new Date().toISOString().split('T')[0];
      return knex('casos').insert([
        { titulo: 'Roubo de carro', descricao: 'Carro roubado no centro da cidade.', status: 'aberto', data_abertura: dataAtual, agente_id: 1 },
        { titulo: 'Assalto à mão armada', descricao: 'Assalto em uma loja de conveniência.', status: 'solucionado', data_abertura: dataAtual, agente_id: 2 },
        { titulo: 'Furto de residência', descricao: 'Residência furtada durante a noite.', status: 'arquivado', data_abertura: dataAtual, agente_id: 3 },
      ]);
    });
};