exports.up = function(knex) {
  return knex.schema
    .table("completions", table => {
      table.dropUnique(['sectionId', 'lessonId'])
      table.unique(['userId', 'sectionId', 'lessonId'])
    })
}

exports.down = function(knex) {
  return knex.schema
    .table("completions", table => {
      table.unique(['sectionId', 'lessonId'])
    })
}
