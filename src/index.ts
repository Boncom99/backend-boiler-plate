import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import http from 'http';
import express from 'express';
import { globalTypeDefs } from './schemas/schema';
import { resolvers } from './resolvers/resolvers';
import admin from 'firebase-admin';
import { config } from '../config.env';
import { logger } from './utils/logger';
import { errorHandler } from './middlewares/error';
import { GraphQLError } from 'graphql/error';

admin.initializeApp();

interface MyContext {
  token?: string;
}

const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer<MyContext>({
  typeDefs: globalTypeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
// Ensure we wait for our server to start
await server.start();

app.use(express.urlencoded({ extended: true }));
app.use(cors<cors.CorsRequest>({ origin: ['http://localhost:3000'] }));
app.use(errorHandler);
app.use('/graphql', (req, res, next) => {
  logger.info('Request received');
  return next();
});

app.use(
  '/graphql',
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      logger.info(`Request received: ${req.method} ${req.url}`);
      const token = req.headers.authorization || '';
      if (!token) {
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      }
      const userId = await admin
        .auth()
        .verifyIdToken(token)
        .then((decodedToken) => {
          return decodedToken.uid;
        });
      if (!userId) {
        throw new GraphQLError('User is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 },
          },
        });
      }
      return { userId };
    },
  }),
);

// Modified server startup
await new Promise<void>((resolve) =>
  httpServer.listen({ port: config.server_port }, resolve),
);
logger.info(
  `🚀 Server ready at http://localhost:${config.server_port}/graphql`,
);
