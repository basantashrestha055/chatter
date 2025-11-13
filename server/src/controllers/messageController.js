import Message from '../models/Message.js';
import User from '../models/User.js';
import { io, getReceiverSocketId } from '../lib/socket.js';

export const getContacts = async (req, res) => {
  try {
    const myId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: myId },
    }).select('-password');

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log('Error in getContacts controller: ', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [{ senderId: myId }, { receiverId: myId }],
    });

    const chatPartnerIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === myId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      ),
    ];

    const chatPartners = await User.find({
      _id: { $in: chatPartnerIds },
    }).select('-password');

    res.status(200).json(chatPartners);
  } catch {
    console.log('Error in getChatPartners controller: ', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log('Error in getMessagesByUserId controller: ', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const senderId = req.user._id;
    const { id: receiverId } = req.params;

    if (!text) return;

    if (senderId.equals(receiverId)) {
      return res
        .status(400)
        .json({ message: 'You cannot send a message to yourself' });
    }

    const receiverExists = await User.exists({ _id: receiverId });
    if (!receiverExists) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
    });

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log('Error in sendMessage controller: ', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
