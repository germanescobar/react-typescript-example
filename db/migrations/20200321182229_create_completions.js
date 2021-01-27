exports.up = function(knex) {
  return knex.schema
    .createTable("completions", table => {
      table.increments("id")
      table.integer("userId").unsigned().notNullable()
      table.string("sectionId", 255).notNullable()
      table.string("lessonId", 255).notNullable()
      table.dateTime("completedAt").notNullable()

      table.foreign('userId').references('id').inTable('users')
      table.index(["sectionId", "lessonId"])

      table.unique(['sectionId', 'lessonId'])
    })
}


exports.down = function(knex) {
  return knex.schema
      .dropTable("completions");
}
