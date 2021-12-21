const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const { graphqlHTTP } = require("express-graphql")
const schema = require("./graphql/schema")
// const { user } = require("./graphql/queries")
const { connectDB } = require("./db")
const app = express()
dotenv.config()
connectDB()

const { authenticate } = require("./middleware/auth")

app.use(authenticate)
app.use(cors())

app.get("/", (req, res) => {
  res.json({ msg: "Welcome! Go to /graphql" })
})

app.use(
  "/graphql",
  graphqlHTTP({
    // context: ({request}) => {
    //   const user = user(request.headers['auth'])
    //   if (user == null) {
    //     throw new Error('Invalid User')
    //   }
    //   console.log("UCAuthH: ",request.headers['auth']);
    //   return {user};
    // },
    schema,
    graphiql: true,
    debug: false
  })
)

app.listen(process.env.PORT, () => {
  console.log(`App running on PORT ${process.env.PORT}`)
})



