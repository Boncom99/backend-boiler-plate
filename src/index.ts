import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import http from 'http';
import express from 'express';
import {globalTypeDefs} from "./schemas/schema";
import {resolvers} from "./resolvers/resolvers";
import admin from 'firebase-admin';
import {GraphQLError} from "graphql/error";


admin.initializeApp();

interface MyContext {
    token?: string;
}

const app = express();

const httpServer = http.createServer(app);


const server = new ApolloServer<MyContext>({
    typeDefs:globalTypeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
    
],
});
// Ensure we wait for our server to start
await server.start();

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.
app.use(
    '/',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
        context: async ({ req, res }) => {
            const token = req.headers.authorization || '';
            const userId= await admin.auth()
                .verifyIdToken(token)
                .then((decodedToken) => {
                    return decodedToken.uid;
                })
            if(!userId) {
                throw new GraphQLError('User is not authenticated', {
                    extensions: {
                        code: 'UNAUTHENTICATED',
                        http: { status: 401 },
                    },
                });
            }
            return {  userId };
        },
    }),
);

// Modified server startup
await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);