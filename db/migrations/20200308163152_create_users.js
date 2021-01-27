exports.up = function(knex) {
  return knex.schema
    .createTable("users", table => {
      table.increments("id");
      table.string("email", 100).notNullable();
      table.string("password", 255).notNullable();
      table.string("name", 100).notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema
      .dropTable("users");
};
