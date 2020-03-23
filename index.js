const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./src/generated/prisma-client');
const Query = require('./src/resolvers/Query')
const Mutation = require('./src/resolvers/Mutation')
const Subscription = require('./src/resolvers/Subscription')
const User = require('./src/resolvers/User')
const Link = require('./src/resolvers/Link');
const Vote = require('./src/resolvers/Vote');

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Subscription,
        Link,
        Vote,
        User
    },
    context: request => {
        return {
            ...request,
            prisma
        }
    }
})
server.start(() => console.log(`Server is running on http://localhost:4000`));

