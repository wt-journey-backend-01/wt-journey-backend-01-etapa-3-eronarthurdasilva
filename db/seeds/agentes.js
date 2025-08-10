exports.seed = async function(knex) {
  // Apaga dados existentes
  await knex('agentes').del();
  // Insere dados novos
  await knex('agentes').insert([
    { nome: 'João Silva', dataDeIncorporacao: '2020-05-12', cargo: 'Detetive' },
    { nome: 'Maria Souza', dataDeIncorporacao: '2018-03-10', cargo: 'Investigadora' }
  ]);
};
