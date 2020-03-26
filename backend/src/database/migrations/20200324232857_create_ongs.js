
exports.up = function(knex) {
  return knex.schema.createTable('tab_ongs', function(table) {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  });
};

//if we have some problem to create our table
exports.down = function(knex) {
  return knex.schema.dropTable('tab_ongs');
};
