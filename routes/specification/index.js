async function specRoutes(fastify, options) {
    fastify.register(require("./specification"))
  }
  module.exports = specRoutes;