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
    app.use(express.json());

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        formatError: (err) => {
            return { message: err.message };
        }
    });

    await server.start();
    server.applyMiddleware({ app });

    const DB_NAME = 'comp3133__StudentID_assigment1'; 
    const MONGO_URI = process.env.MONGO_URI || `mongodb://localhost:27017/${DB_NAME}`;
    
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log(`MongoDB connecet on: ${DB_NAME}`))
    .catch(err => console.error('MongoDB connection error', err));

    const PORT = 4000;
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
    });
}

startServer();