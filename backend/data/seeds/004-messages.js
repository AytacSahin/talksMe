const defaultMessages = [
  {
    user_id: 1, chat_id: 1, type: 'text', content: "Hi test2!, it's test1.",
    send_at: '2024-03-26 15:25:55', delivered_at: '2024-03-26 15:25:55', seen_at: '2024-03-26 15:25:55'
  },
  {
    user_id: 2, chat_id: 1, type: 'text', content: "Hi test1!, nice to meet you, i'm test2.",
    send_at: '2024-03-26 16:25:55', delivered_at: '2024-03-26 15:25:55', seen_at: '2024-03-26 15:25:55'
  },
  {
    user_id: 3, chat_id: 2, type: 'text', content: "Hi test4!, it's test3.",
    send_at: '2024-03-26 15:25:55', delivered_at: '2024-03-26 15:25:55', seen_at: '2024-03-26 15:25:55'
  },
  {
    user_id: 4, chat_id: 2, type: 'text', content: "Hi test3!, nice to meet you, i'm test4.",
    send_at: '2024-03-26 16:25:55', delivered_at: '2024-03-26 15:25:55', seen_at: '2024-03-26 15:25:55'
  },
  {
    user_id: 1, chat_id: 3, type: 'text', content: "Hi test3!, it's test1.",
    send_at: '2024-03-26 10:25:55', delivered_at: '2024-03-26 15:25:55', seen_at: '2024-03-26 15:25:55'
  },
  {
    user_id: 1, chat_id: 3, type: 'text', content: "Are you there ? it's test1!!!",
    send_at: '2024-03-26 16:25:55', delivered_at: '2024-03-26 15:25:55', seen_at: '2024-03-26 15:25:55'
  },
  {
    user_id: 1, chat_id: 3, type: 'text', content: "I'm still waiting for you…",
    send_at: '2024-03-26 17:25:55', delivered_at: '2024-03-26 15:25:55', seen_at: '2024-03-26 15:25:55'
  },
  {
    user_id: 1, chat_id: 4, type: 'text', content: "Hi everyone, i'm test1.",
    send_at: '2024-03-26 15:25:55', delivered_at: '2024-03-26 15:25:55', seen_at: '2024-03-26 15:25:55'
  },
  {
    user_id: 2, chat_id: 4, type: 'text', content: "Hi test1, test3 and test4, i'm test2.",
    send_at: '2024-03-26 16:25:55', delivered_at: '2024-03-26 15:25:55', seen_at: '2024-03-26 15:25:55'
  },
];

exports.seed = async function (knex) {
  await knex('messages').truncate();
  await knex('messages').insert(defaultMessages);
};
