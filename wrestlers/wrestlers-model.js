const db = require('../data/config');

function find() {
  return db('wrestlers');
}

function findById(id) {
  return db('wrestlers').where({ id }).first();
}

async function create(data) {
  const [id] = await db('wrestlers').insert(data);
  return findById(id);
}

async function update(id, data) {
  await db('wrestlers').where({ id }).update(data);
  return findById(id);
}

function remove(id) {
  return db('wrestlers').where({ id }).del();
}

module.exports = {
  find,
  findById,
  create,
  update,
  remove,
};
