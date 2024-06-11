/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('users', table => {
        table.increments('user_id').primary();
        table.string('name', 128).notNullable();
        table.string('phone', 15).notNullable().unique().collate('nocase'); // unique ile benzersiz, collate nocase ile de büyük char küçük char garanti altına aldım
        table.string('role').defaultTo('user');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
};
