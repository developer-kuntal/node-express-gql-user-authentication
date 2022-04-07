// import { model, Schema } from 'mongoose';
import pkg from 'mongoose';
const { model, Schema } = pkg;

const messageSchema = new Schema({
    text: String,
    createdBy: String
})

// module.exports = model('Message', messageSchema);
export default model('Message', messageSchema);