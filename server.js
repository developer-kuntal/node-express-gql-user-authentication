const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const { graphqlHTTP } = require("express-graphql")
const schema = require("./graphql/schema")
// const { schema: subscriptionSchema } = require('./graphql/subscriptions')
const {SubscriptionServer} = require('subscriptions-transport-ws')
const { PubSub } = require('graphql-subscriptions')
const {execute,subscribe} = require('graphql')
const {createServer} = require('http')
// const { user } = require("./graphql/queries")
const jwt = require("jsonwebtoken")
const { connectDB } = require("./db")
const { authenticate } = require("./middleware/auth")
const { makeExecutableSchema } = require('graphql-tools')

const pubsub = new PubSub()

const app = express()
dotenv.config()
connectDB()

// const { authenticate } = require("./middleware/auth")
app.use(authenticate)

app.use(cors())

const ws = createServer((req,res)=>{
  res.writeHead(400)
  res.end()
})

ws.listen(process.env.WS_PORT, () => {
  console.log(`Websocket listening on port ${process.env.WS_PORT}`)
})

const subscriptionServer = SubscriptionServer.create({
  schema: schema,
  execute,
  subscribe,
  onConnect:()=>console.log('Client Connected')
}, { server:ws, path:'/graphql'})

app.get("/", (req, res) => {
  res.json({ msg: "Welcome! Go to /graphql" })
})

app.use(
  "/graphql",
  graphqlHTTP({
    // context: ({request}) => {
      // const user = user(request.headers['auth'])
      // if (user == null) {
      //   throw new Error('Invalid User')
      // }
      // console.log("UCAuthH: ",request.headers['auth']);
      // return {user};
      // const token = request.headers.authorization?.split(" ")[1]

  
      // try {
      //   const verified = jwt.verify(token, process.env.JWT_SECRET)
      //   const decoded = jwt.decode(token, process.env.JWT_SECRET)
      //   // request.verifiedUser = verified.user
      //   // request.verifiedUser =  "test"
      //   console.log("Verification success!", verified)
      //   // next()
      //   return "decoded.user"
      // } catch (err) {
      //   console.log("Verification failed!", err)
      //   // next()
      //   return null;
      // }

    // },
    // typeDefs: typeDefs,
    // resolvers: resolvers,
    // context(request) {
    //   // const token = request.headers.authorization?.split(" ")[1]
    //   // const verified = jwt.verify(token, process.env.JWT_SECRET)
    //   // console.log("Verification success!", verified)
    //   // const verifiedUser = verified.user
    //   // request.verifiedUser = verified.user
    //   return {
    //     // verifiedUser,
    //     request,
    //     pubsub,
    //   }
    // },
    schema,
    graphiql: true,
    debug: false
  })
)

app.listen(process.env.PORT, () => {
  console.log(`App running on PORT ${process.env.PORT}`)
})



