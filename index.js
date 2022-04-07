import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { makeExecutableSchema } from 'graphql-tools';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageDisabled } from 'apollo-server-core';
import mongoose from 'mongoose';

import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers.js';

(async function(){
    const app = express();
    dotenv.config();
    app.use(cors());

    const httpServer = createServer(app);

    const schema = makeExecutableSchema({
        typeDefs,
        resolvers
    });

    const subscriptionServer = SubscriptionServer.create(
        { schema, execute, subscribe },
        { server: httpServer, path: '/graphql' }
    );
    
    const server = new ApolloServer({
        schema,
        plugins: [
            // ApolloServerPluginLandingPageDisabled(),
            ApolloServerPluginLandingPageGraphQLPlayground(
                // options
            ),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            subscriptionServer.close();
                        }
                    }
                }
            }
        ]
    });

    await server.start();
    server.applyMiddleware({ app });

    const MONGO_URI = process.env.MONGO_URI;

    await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })

    console.log(`MongoDB connected to local instance`);

    const PORT = process.env.PORT;

    httpServer.listen(PORT, () => {
        console.log(`Http Server is now running on http://localhost/${PORT}`);
    })

})();
