// routes/chatRoutes.js
const {Chat} = require('../models/ChatModel');

async function chatRoutes(fastify, options) {
  fastify.get('/', async (request, reply) => {
    try {
      const chats = await Chat.find().populate('sender').populate('receiver');
      reply.send(chats);
    } catch (err) {
      reply.status(500).send(err);
    }
  });

  fastify.post('/', async (request, reply) => {
    try {
      const chat = new Chat(request.body);
      await chat.save();
      // const populatedChat = await chat.populate('sender').populate('receiver').execPopulate();
      reply.send(chat);
    } catch (err) {
      reply.status(500).send(err);
    }
  });
}

module.exports = chatRoutes;
