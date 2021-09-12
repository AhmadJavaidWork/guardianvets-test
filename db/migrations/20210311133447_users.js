exports.up = async (knex) => {
  await knex.schema.createTable('users', async (table) => {
    table.increments('id').primary();
    table.string('email', 255).notNullable();
    table.unique('email');
    table.text('password').notNullable();
    table.timestamps(false, true);
  });
  await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON users
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('users');
};
