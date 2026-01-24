const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const typeDefs = require('./src/graphql/typeDefs');
const resolvers = require('./src/graphql/resolvers');

async function startServer() {
    const app = express();
    app.use(cors());

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        formatError: (err) => {
            return { message: err.message };
        }
    });

    await server.start();
    server.applyMiddleware({ app });

    const MONGO_URI = process.env.MONGO_URI;
    
    mongoose.connect(MONGO_URI)
        .then(() => {
            console.log(`MongoDB connected successfully`);
            
            const PORT = process.env.PORT || 4000;
            app.listen(PORT, () => {
                console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
            });
        })
        .catch(err => {
            console.error('MongoDB connection error:', err.message);
        });
}

startServer();