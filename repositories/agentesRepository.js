const db = require('../db/db');
const agentesRepository = require('../repositories/agentesRepository');

test('Deve retornar todos os agentes', async () => {
  const agentes = await agentesRepository.findAll();
  expect(agentes).toBeInstanceOf(Array);
});

const findAll = () => {
    return db('agentes').select('*');
};

const findById = (id) => {
    return db('agentes').where({ id }).first();
};

const create = (agente) => {
    return db('agentes').insert(agente).returning('*');
};

const update = (id, agente) => {
    return db('agentes').where({ id }).update(agente).returning('*');
};

const remove = (id) => {
    return db('agentes').where({ id }).del();
};

const findByCargo = (cargo) => {
  return db('agentes').whereRaw('LOWER(cargo) = ?', [cargo.toLowerCase()]);
};

const findSortedByDate = (sortOrder = 'asc') => {
  return db('agentes').orderBy('dataDeIncorporacao', sortOrder);
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};