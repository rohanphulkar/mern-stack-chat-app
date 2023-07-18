const Chat = require("../models/chatModel");
const Message = require("../models/messageModel");

const getMessages = async (req, res, next) => {
  const { id } = req.params;
  try {
    const chat = await Chat.findById(id);
    const messages = await Message.find({ chat });
    res.status(200).json(messages);
  } catch {
    res.status(400).json({ error: "something went wrong!" });
  }
};

module.exports = {
  getMessages,
};
