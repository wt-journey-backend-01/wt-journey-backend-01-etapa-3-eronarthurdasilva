exports.seed = function (knex) {
  return knex('agentes').del() // Limpa a tabela antes de inserir os dados
    .then(function () {
      return knex('agentes').insert([
        { nome: 'João Silva', dataDeIncorporacao: '2020-01-15', cargo: 'Investigador' },
        { nome: 'Maria Oliveira', dataDeIncorporacao: '2018-05-20', cargo: 'Delegado' },
        { nome: 'Carlos Souza', dataDeIncorporacao: '2019-11-10', cargo: 'Escrivão' },
      ]);
    });
};