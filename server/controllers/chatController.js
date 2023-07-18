const Chat = require("../models/chatModel");

const getAllChats = async (req, res, next) => {
  const chats = await Chat.find();
  res.status(200).json(chats);
};

const findChat = async (req, res,next) => {
  const { id } = req.params;
  const chat = await Chat.findById(id);
  res.status(200).json(chat);
};

const createChat = async (req, res, next) => {
  const { user, member } = req.body;

  try {
    let chat = await Chat.findOne({ members: { $all: [user, member] } });
    
    if (chat) {
      res.status(200).json(chat);
    } else {
      chat = await Chat.create({ members: [user, member] });
      res.status(201).json(chat);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports = {
  getAllChats,
  createChat,
  findChat,
};
