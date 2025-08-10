const db = require('../db/db');

const findAll = () => {
    return db('casos').select('*');
};

const findById = (id) => {
    return db('casos').where({ id }).first();
};

const create = (caso) => {
    return db('casos').insert(caso).returning('*');
};

const update = (id, caso) => {
    return db('casos').where({ id }).update(caso).returning('*');
};

const partialUpdate = (id, caso) => {
    return db('casos').where({ id }).update(caso).returning('*');
};

const remove = (id) => {
    return db('casos').where({ id }).del();
};

// Bônus: Listar casos por agente
const findByAgenteId = (agente_id) => {
    return db('casos').where({ agente_id });
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    partialUpdate,
    remove,
    findByAgenteId
};
