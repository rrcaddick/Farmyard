const path = require("path");
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

// Serve react app
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "build")));
  app.get("*", (req, res, next) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

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
