exports.seed = async function(knex) {
  await knex('casos').del();
  await knex('casos').insert([
    { titulo: 'Roubo no Centro', descricao: 'Assalto a uma joalheria', status: 'aberto', agente_id: 1 },
    { titulo: 'Desaparecimento Misterioso', descricao: 'Pessoa desaparecida no parque', status: 'solucionado', agente_id: 2 }
  ]);
};
