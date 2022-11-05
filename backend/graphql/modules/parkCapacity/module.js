const { createModule } = require("graphql-modules");
const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");

const parkCapacityModule = createModule({
  id: "parkCapacity-module",
  dirname: __dirname,
  typeDefs,
  resolvers,
});

module.exports = {
  parkCapacityModule,
};
