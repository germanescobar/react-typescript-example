exports.up = function(knex) {
  return knex.schema
    .dropTable("lessons")
    .dropTable("sections")
}

exports.down = function(knex) {
  return knex.schema
    .createTable("sections", table => {
      table.increments("id");
      table.string("name", 255).notNullable();
    })
    .createTable("lessons", table => {
      table.increments("id");
      table.integer("sectionId").unsigned().notNullable();
      table.string("name", 255).notNullable();
      table.integer("position").notNullable();
      table.text("content");

      table.foreign('sectionId').references('id').inTable('sections');
    })
}
