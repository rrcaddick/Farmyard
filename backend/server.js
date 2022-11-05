const dotenv = require("dotenv").config();
const colors = require("colors");
const { createServer: createHttpServer } = require("http");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { schema, executor, dataSources, formatError } = require("./graphql");
const PORT = process.env.PORT || 5000;

// Express app and middleware
const app = express();
app.use(express.urlencoded({ extended: false }), express.json());

// GraphQL
const apolloServer = new ApolloServer({
  schema,
  executor,
  dataSources,
  formatError,
});

// HTTP Server
const httpServer = createHttpServer(app);

(async () => {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/graphql" });

  httpServer.listen(PORT, () => {
    console.log(`HTTP Server started on port ${PORT}`.bgWhite.black);
  });
})();
