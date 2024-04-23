
async function productsRoutes(fastify, options) {
    fastify.register(require("./update"))
  }
  module.exports = productsRoutes;