const db = require('../../data/db-config')

function getAllMessages() {
    return db('messages').select('*');
}

// tek bir kullanıcının ekranındaki mesajları almak için:
async function getConversationsByUserId(userId) {
    try {
        // Kullanıcının katıldığı sohbetlerin chat_id'lerini al
        const chatIds = await db('users_chats')
            .where('user_id', userId)
            .pluck('chat_id');

        // Her bir sohbet için en son atılan mesajı al ve istenen formatta bir dizi oluştur
        const conversations = [];
        for (const chatId of chatIds) {
            const lastMessage = await db('messages')
                .select('messages.*', 'users.name as sender', 'chats.chat_name', 'users.name as sender_name', 'chats.type', 'messages.user_id as sender_id')
                .join('users', 'messages.user_id', 'users.user_id')
                .join('chats', 'messages.chat_id', 'chats.chat_id')
                .where('messages.chat_id', chatId)
                .orderBy('messages.send_at', 'desc')
                .first();

            // Kullanıcıyla ilgili olmayan kişinin adını bulmak için sohbetin diğer katılımcılarını al
            const otherParticipants = await db('users_chats')
                .select('users.name')
                .join('users', 'users_chats.user_id', 'users.user_id')
                .where('users_chats.chat_id', chatId)
                .andWhere('users_chats.user_id', '!=', userId);

            const otherParticipantName = otherParticipants.length > 0 ? otherParticipants[0].name : 'Unknown';

            const conversation = {
                chat_id: chatId.toString(),
                name: lastMessage ? (lastMessage.type === 'group' ? lastMessage.chat_name : otherParticipantName) : 'Unnamed Chat',
                type: lastMessage.type,
                lastMessage: lastMessage
                    ? {
                        sender_id: lastMessage.sender_id,
                        sender_name: lastMessage.sender_name,
                        text: lastMessage.content,
                    }
                    : { text: '', sender: '', type: '', sender_id: null }
            };

            conversations.push(conversation);
        }

        return conversations;
    } catch (error) {
        throw new Error('Error fetching conversations: ' + error.message);
    }
}


// Belirli bir chat_id'ye sahip konuşma geçmişini almak için
async function getChatByChatId(chatId) {
    try {
        const messages = await db('messages')
            .select('messages.message_id', 'messages.content as text', 'users.name as sender_name', 'users.user_id as sender_id')
            .join('users', 'messages.user_id', 'users.user_id')
            .where('messages.chat_id', chatId)
            .orderBy('messages.send_at', 'asc');
        return messages;
    } catch (error) {
        throw new Error('Error fetching messages: ' + error.message);
    }
}

async function createMessage(chatId, userId, content, type) {
    try {
        const [messageId] = await db('messages').insert({ chat_id: chatId, user_id: userId, content, type });
        const newMessage = await db('messages')
            .select('messages.message_id', 'messages.content as text', 'users.name as sender_name', 'users.user_id as sender_id')
            .join('users', 'messages.user_id', 'users.user_id')
            .where('messages.message_id', messageId)
            .first();
        return newMessage;
    } catch (error) {
        throw new Error('Error creating message: ' + error.message);
    }
}

module.exports = {
    getAllMessages,
    getConversationsByUserId,
    getChatByChatId,
    createMessage
};