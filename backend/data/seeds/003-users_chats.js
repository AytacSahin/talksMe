const defaultUserChatRelations = [
  { user_id: 1, chat_id: 1 },
  { user_id: 2, chat_id: 1 },
  { user_id: 3, chat_id: 2 },
  { user_id: 4, chat_id: 2 },
  { user_id: 1, chat_id: 3 },
  { user_id: 3, chat_id: 3 },
  { user_id: 1, chat_id: 4 },
  { user_id: 2, chat_id: 4 },
  { user_id: 3, chat_id: 4 },
  { user_id: 4, chat_id: 4 }
];

exports.seed = async function (knex) {
  await knex('users_chats').truncate();
  await knex('users_chats').insert(defaultUserChatRelations);
};
