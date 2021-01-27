exports.up = function(knex) {
  return knex.schema.
    table("users", table => {
      table.string("resetPasswordToken")
      table.dateTime("resetPasswordTokenSentAt")
    })
}

exports.down = function(knex) {
  return knex.schema.
    table("users", table => {
      table.dropColumn("resetPasswordToken")
      table.dropColumn("resetPasswordTokenSentAt")
    })
}
