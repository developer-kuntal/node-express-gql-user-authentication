const mongoose = require("mongoose")
// const uuid = require("uuid").v4()

const userSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: String,
    //   default:
    // },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // match: [
      //   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      //   "Please enter a valid email",
      // ],
    },
    displayName: {
      type: String,
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("user", userSchema)
