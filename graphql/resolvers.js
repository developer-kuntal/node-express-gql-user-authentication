import Message from '../models/message.js';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

export default {
    Mutation: {
        async createMessage(_,{messageInput: {text, username}}) {
            const newMessage = new Message({
                text: text,
                createdBy: username
            })

            const res = await newMessage.save();

            pubsub.publish('MESSAGE_CREATED', {
                messageCreated: {
                    text: text,
                    createdBy: username
                }
            })

            return {
                id: res.id,
                ...res._doc
            }
        }
    },
    Subscription: {
        messageCreated: {
            subscribe: () => pubsub.asyncIterator('MESSAGE_CREATED')
        }
    },
    Query: {
        message: (_, {ID}) => Message.findById(ID),
        messages: ( ) => Message.find({})
    }
}