/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('casos').del()
  await knex('casos').insert([
    { titulo: 'Roubo a Banco', descricao: 'Assalto a mão armada no banco central.', status: 'aberto', agente_id: 1 },
    { titulo: 'Caso Encerrado', descricao: 'Investigação de fraude concluída.', status: 'solucionado', agente_id: 2 },
    { titulo: 'Desaparecimento', descricao: 'Pessoa desaparecida na região sul.', status: 'aberto', agente_id: 1 }
  ]);
};