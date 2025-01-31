const { BadRequestError } = require('../errors')
const Auth = require('../models/Auth')
const Messages = require('../models/Messages')
const Conversation = require('../models/Conversation')
const {io, findConnectedUser} = require('../socket/socket')

const createMessage = async (req, res) => {
    const { id: senderId } = req.user
    const { receiverId } = req.params
    const { message } = req.body
    const receiver = await Auth.findOne({ _id: receiverId })
    if (!receiver) {
        throw new BadRequestError('recevier does not exists')
    }
    const createMessage = await Messages.create({ senderId, receiverId, message })

    let conversationExists = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] } 
    })
    if (!conversationExists) {
        conversationExists = await Conversation.create({
            participants: [senderId, receiverId],
            messages: createMessage._id
        })
    } else {
        conversationExists.messages.push(createMessage._id)
    }

    await conversationExists.save()

    const onlineUser = findConnectedUser(receiverId)
    if(onlineUser){
        io.to(onlineUser).emit("newMessage", createMessage)
    }
    res.status(200).json(createMessage)
}

const getAllMessages = async (req, res) => {
    const { id: senderId } = req.user
    const { receiverId } = req.params

    const conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] }
    }).select('messages').populate({
        path: 'messages',
        select: " message receiverId senderId",
        populate:{
            path: "receiverId",
            select: "userName profileImg"
        }
    })

    if (!conversation) {
        const newConversation = new Conversation({
            participants: [senderId, receiverId],
            messages: [] 
        });
        await newConversation.save();
    
        return res.status(201).json(newConversation);
    }
    res.status(200).json(conversation)
}

const sideBarUsers = async (req, res) => {

    const { id } = req.user; 
    
    const conversations = await Conversation.find({ participants: id });

    const userIds = [];
    conversations.forEach(conversation => {
        conversation.participants.forEach(participant => {
            if (participant.toString() !== id.toString() && !userIds.includes(participant.toString())) {
                userIds.push(participant.toString());
            }
        });
    });

    const users = await Auth.find({ _id: { $in: userIds } }).select('userName profileImg')

    res.status(200).json(users);

};


module.exports = { createMessage, getAllMessages, sideBarUsers }