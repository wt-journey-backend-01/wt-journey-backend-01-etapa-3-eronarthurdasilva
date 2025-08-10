exports.seed = function (knex) {
  return knex('casos').del() // Limpa a tabela antes de inserir os dados
    .then(function () {
      return knex('casos').insert([
        { titulo: 'Roubo de carro', descricao: 'Carro roubado no centro da cidade.', status: 'aberto', agente_id: 1 },
        { titulo: 'Assalto à mão armada', descricao: 'Assalto em uma loja de conveniência.', status: 'solucionado', agente_id: 2 },
        { titulo: 'Furto de residência', descricao: 'Residência furtada durante a noite.', status: 'arquivado', agente_id: 3 },
      ]);
    });
};