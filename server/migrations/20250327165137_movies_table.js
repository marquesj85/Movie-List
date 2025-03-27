/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('movies_table', table => {
    table.increments('id'); // adds an auto incrementing PK column
    table.string('title').notNullable(); // equivalent of varchar(255)
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('movies_table');
};
