exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('wrestlers')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('wrestlers').insert([
        { id: 1, name: 'Barry Backfist' },
        { id: 2, name: 'Phil The Destroyer' },
        { id: 3, name: 'John Carusoe' },
      ]);
    });
};
