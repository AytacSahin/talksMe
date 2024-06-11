/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('users_chats', tbl => {
        tbl.integer('user_id').unsigned().notNullable();
        tbl.integer('chat_id').unsigned().notNullable();

        // Foreign key constraints
        tbl.foreign('user_id').references('user_id').inTable('users');
        tbl.foreign('chat_id').references('chat_id').inTable('chats');

        // primary key: user_id ve chat_id birlikte eşsiz ve unique olmasını sağlayan ifade:
        // bu ifade aynı user_id ve chat_id'li iki kayıt olmayacağını garanti ediyor
        tbl.primary(['user_id', 'chat_id']);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users_chats');
};

