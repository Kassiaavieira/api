exports.up = knex => knex.schema.createTable("tags", table => {
  table.increments("id");
  table.integer("job_id").references("id").inTable("job").onDelete("CASCADE");
  table.integer("user_id").references("id").inTable("users");
  table.text("name");
});

exports.down = knex => knex.schema.dropTable("tags");
