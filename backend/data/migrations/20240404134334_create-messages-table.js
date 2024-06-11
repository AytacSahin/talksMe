/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('messages', tbl => {
        tbl.increments('message_id').primary();
        tbl.integer('user_id').notNullable().unsigned(); // unsigned -> pozitif sayı almasını sağlar.
        tbl.integer('chat_id').notNullable().unsigned();
        tbl.string('type', 20);
        tbl.text('content').notNullable();
        tbl.timestamp('send_at').defaultTo(knex.fn.now());
        tbl.datetime('delivered_at');
        tbl.datetime('seen_at');
        // Foreign keys
        tbl.foreign('user_id').references('user_id').inTable('users');
        tbl.foreign('chat_id').references('chat_id').inTable('chats');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('messages')
};
