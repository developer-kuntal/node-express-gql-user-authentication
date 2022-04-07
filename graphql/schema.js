// Import required stuff from graphql
const { GraphQLSchema, GraphQLObjectType } = require("graphql")

// Import queries
const { 
  users, 
  user, 
  posts, 
  post, 
  comments, 
  comment 
} = require("./queries")

// Import mutations
const {
  register,
  login,
  addPost,
  addComment,
  updatePost,
  deletePost,
  updateComment,
  deleteComment,
} = require("./mutations")

// Import Subscription
const {
  newPostSubscription
} = require('./subscriptions')

// Define QueryType
const QueryType = new GraphQLObjectType({
  name: "QueryType",
  description: "Queries",
  fields: { users, user, posts, post, comments, comment },
})

// Define MutationType
const MutationType = new GraphQLObjectType({
  name: "MutationType",
  description: "Mutations",
  fields: {
    register,
    login,
    addPost,
    addComment,
    updatePost,
    deletePost,
    updateComment,
    deleteComment,
  },
})

// Define SubscriptionType
const SubscriptionType = new GraphQLObjectType({
  name: "SubscriptionType",
  description: "Subscriptions",
  fields: {
    newPostSubscription,
  },
})

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
  subscription: SubscriptionType
})
