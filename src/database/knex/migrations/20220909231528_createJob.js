exports.up = knex => knex.schema.createTable("job", table => {
  table.increments("id");
  table.string("title");
  table.string("description");
  table.integer("user_id").references("id").inTable("users");
});

exports.down = knex => knex.schema.dropTable("job");
