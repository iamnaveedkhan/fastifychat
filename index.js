// server.js
const fastify = require('fastify')({ logger: true });
const mongoose = require('mongoose');
const routes = require('./routes/index.js');
const { User } = require("./models/allModels");
const socketio = require('socket.io');
const { Server } = require('http');

// Connect to MongoDB
mongoose.connect('mongodb+srv://naveed78603:kashaf2016@cluster0.pzjqmxn.mongodb.net/chat', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Register routes
fastify.register(routes);

// JWT authentication
fastify.register(require('@fastify/jwt'), {
  secret: 'supersecret'
});

fastify.decorate("authenticate", async function (request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

// Require the user routes
fastify.register(require('./routes/userRoutes'), { prefix: '/api/user' });

const httpServer = Server(fastify.server);
const io = socketio(httpServer, {
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', async (msg) => {
    console.log('message: ' + msg);
    try {
      const chat = new chat(msg);
      await chat.save();
      const populatedChat = await chat.populate('sender').populate('receiver').execPopulate();
      io.emit('chat message', populatedChat);
    } catch (err) {
      console.error(err);
    }
  });
});

// Run the server
const start = async () => {
  try {
    await fastify.listen(3000, '0.0.0.0');
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
