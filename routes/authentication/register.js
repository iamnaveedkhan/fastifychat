const models = require("../../models/allModels");
const User = models.User;
const bcrypt = require('bcrypt');

async function registerUser(fastify, options) {
  fastify.post("/register_user", async (request, reply) => {
    try {
      const { mobile , name , role , isActive} = request.body;
    
      // Check if a user with the provided email or username already exists
      const existingUser = await User.findOne({ mobile });

      if (existingUser) {
        // User already exists, send a conflict response
        return reply.status(409).send({ error: "User already registered" });
      }

      // Hash and salt the password
      // const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new instance of the User model
      const user = new User({
        name,
        mobile,
        role,
      });
      // Save the user to the database
      const savedUser = await user.save();
      console.log(savedUser._id);
      const token = fastify.jwt.sign({ userId: savedUser._id });
      var status = "success";

      return reply.send({ token, status });
    } catch (error) {
      console.error(error);
      reply.status(500).send({ error: "Internal Server Error" });
    }
  });
}

module.exports = registerUser;