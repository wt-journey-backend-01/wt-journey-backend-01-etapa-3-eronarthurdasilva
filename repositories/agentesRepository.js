const db = require('../db/db');

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

const partialUpdate = (id, agente) => {
    return db('agentes').where({ id }).update(agente).returning('*');
};

const remove = (id) => {
    return db('agentes').where({ id }).del();
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    partialUpdate,
    remove
};