const mongoose = require("mongoose")

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  // console.log(`MongoDB connected to local instance`)
  // const conn_atlas = await mongoose.createConnection(process.env.MONGO_ATLAS_URI, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  //   useCreateIndex: true,
  //   useFindAndModify: false

  // })
  // console.log(`MongoDB connected to cloude atlas`)
  return conn;
}

module.exports = { connectDB }
