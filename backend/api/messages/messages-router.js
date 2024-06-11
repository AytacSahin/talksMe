const router = require('express').Router();
const MessageModel = require('./messages-model');

router.get('/', async (req, res) => {
    const allMessages = await MessageModel.getAllMessages();
    res.json(allMessages);
})

// Belirli bir kullanıcıya ait ana ekran mesajlarını almak için endpoint:
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const conversations = await MessageModel.getConversationsByUserId(userId);
        res.json(conversations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/chats/:chatId', async (req, res) => {
    const { chatId } = req.params;

    try {
        const messages = await MessageModel.getChatByChatId(chatId);
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/send', async (req, res) => {
    try {
        const { chatId, userId, content, type } = req.body;

        // TODO: Middleware'lar yazarak kullanıcı var mı, sohbet var mı kontrol edicem.
        const newMessage = await MessageModel.createMessage(chatId, userId, content, type);

        res.status(201).json({ message: 'Message sent successfully!', newMessage });
    } catch (error) {
        res.status(500).json({ message: 'Error sending message: ' + error.message });
    }
});

module.exports = router;