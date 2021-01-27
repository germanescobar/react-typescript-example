exports.up = function(knex) {
  return knex.schema
    .createTable("invitations", table => {
      table.increments("id")
      table.string("email", 100).notNullable()
      table.string("token", 255).notNullable()
      table.dateTime("createdAt").defaultTo(knex.fn.now()).notNullable()

      table.index('token')

      table.unique(['email'])
      table.unique(['token'])
    })
}

exports.down = function(knex) {
  return knex.schema
    .dropTable("invitations")
}
