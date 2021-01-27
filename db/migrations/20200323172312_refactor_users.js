exports.up = function(knex) {
  return knex.schema
    .table("users", table => {
      table.string("lastName", 100)
      table.boolean("admin").defaultTo(false).notNullable()
      table.dateTime("createdAt").defaultTo(knex.fn.now()).notNullable()
      table.renameColumn("name", "firstName")
    })
}

exports.down = function(knex) {
  return knex.schema
    .table("users", table => {
      table.renameColumn("firstName", "name")
      table.dropColumn("admin")
      table.dropColumn("createdAt")
      table.dropColumn("lastName")
    })
}
