// routes/index.js
const userRoutes = require('./userRoutes');
const chatRoutes = require('./chatRoutes');

async function routes(fastify, options) {
  fastify.register(userRoutes, { prefix: '/api/users' });
  fastify.register(chatRoutes, { prefix: '/api/chat' });
}

module.exports = routes;