const defaultUsers = [
  { name: 'test1', phone: '0555 555 55 55' },
  { name: 'test2', phone: '0555 555 55 56' },
  { name: 'test3', phone: '0555 555 55 57' },
  { name: 'test4', phone: '0555 555 55 58' }
];

exports.seed = async function (knex) {
  await knex('users').truncate() // önce var olanları siler
  await knex('users').insert(defaultUsers); // sonra istenenleri ekler
}; 
