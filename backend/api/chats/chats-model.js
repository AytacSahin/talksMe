const db = require('../../data/db-config')

function getAllChatsVisions() {
    return db('messages').select('*');
}

module.exports = {
    getAllChatsVisions
};