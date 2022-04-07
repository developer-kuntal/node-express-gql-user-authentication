// const gql = require('graphql-tag')
// const { makeExecutableSchema } = require('graphql-tools')


// const typeDefs = gql`
//     type Query {
//         newposts:[post]
//     }

//     type post {
//         id: ID
//         title: String
//         body: String
//     }

//     type Subscription {
//         newPost: post
//     }
// `

// const resolvers = {
//     Subscription: {
//         newPost: {
//             subscribe: (parent, args, { pubsub }, info) => pubsub.asyncIterator('newPost')
//         }
//     }
// }

// exports.schema = makeExecutableSchema({typeDefs:typeDefs,resolvers:resolvers})

const { PostType, CommentType } = require("./types")
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

// const { User, Post, Comment } = require("../models")

const newPostSubscription = {
    type: PostType,
    description: "Subscribe New post",
    subscribe: () => pubsub.asyncIterator('newPostSubscription')
}

module.exports = {
    newPostSubscription
}
