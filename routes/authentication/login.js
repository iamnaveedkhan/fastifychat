const { User } = require("../../models/allModels");
async function loginUser(fastify, options) {
  fastify.post("/moblogin", async (request, reply) => {
    const { mob } = request.body;
    let status;
    
    if (!mob) {
      return { err: "Field cannot be empty" };
    }
    
    try {
      const existingUser = await User.findOne({ $and: [{ mobile: mob , isActive: 1}] });
      if (existingUser) {
        console.log(mob);
        const token = fastify.jwt.sign({ userId: existingUser });
        status = "success";
        reply.send({ token, status });
      } else {
        status = "fail";
        return reply.status(404).send({ error: "User not found...", status });
      }
    } catch (error) {
      console.error("Error during login:", error);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  });
}


module.exports = loginUser;
