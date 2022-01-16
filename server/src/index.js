const express = require("express");
const jwt = require("jsonwebtoken");
const { ApolloServer } = require("apollo-server-express");

const helmet = require("helmet");
const cors = require("cors");
const depthLimit = require("graphql-depth-limit");
const { createComplexityLimitRule } = require("graphql-validation-complexity");

require("dotenv").config();

const db = require("./db");
const resolvers = require("./resolvers");
const typeDefs = require("./schema");
const models = require("./models");

const port = process.env.PORT || 4000;
const grapghQLURL = "/api";

const DB_HOST = process.env.DB_HOST;
db.connect(DB_HOST);

const app = express();
app.use(helmet());
app.use(cors());

const getUser = (token) => {
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      new Error("Session invalid");
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
  context: ({ req }) => {
    const token = req.headers.authorization;
    const user = getUser(token);
    return { models, user };
  },
});

const corsOptions = {
  origin: "*",
  credentials: true,
};

const startServer = async () => {
  await server.start();
  server.applyMiddleware({
    app,
    path: grapghQLURL,
    cors: corsOptions,
  });
};

startServer();

app.listen(
  {
    port,
  },
  () => {
    console.log(
      "\x1b[34m",
      `GraphQL Server running at http://localhost:${port}${grapghQLURL}`,
      "\x1b[37m"
    );
  }
);
