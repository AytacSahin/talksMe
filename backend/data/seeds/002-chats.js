const defaultChats = [
  { chat_name: 'test1-test2', type: 'person' },
  { chat_name: 'test3-test4', type: 'person' },
  { chat_name: 'test1-test3', type: 'person' },
  { chat_name: 'test1-test2-test3-test4', type: 'group' }
];

/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.seed = async function (knex) {
  await knex('chats').truncate(); // önce var olanları siler
  await knex('chats').insert(defaultChats); // sonra istenenleri ekler
};
