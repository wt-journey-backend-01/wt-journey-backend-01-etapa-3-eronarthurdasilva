/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('agentes').del()
  await knex('agentes').insert([
    { nome: 'João Silva', dataDeIncorporacao: '2020-05-15', cargo: 'Inspetor' },
    { nome: 'Maria Oliveira', dataDeIncorporacao: '2018-11-20', cargo: 'Delegada' }
  ]);
};