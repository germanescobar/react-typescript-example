
exports.up = function(knex) {
  return knex.schema
    .createTable("lessons", table => {
      table.increments("id");
      table.integer("sectionId").unsigned().notNullable();
      table.string("name", 255).notNullable();
      table.integer("position").notNullable();
      table.text("content");

      table.foreign('sectionId').references('id').inTable('sections');
    })
};

exports.down = function(knex) {
  return knex.schema
      .dropTable("lessons");
};
