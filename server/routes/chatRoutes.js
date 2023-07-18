const {
  getAllChats,
  createChat,
  findChat,
} = require("../controllers/chatController");

var router = require("express").Router();
const use = (fn) => (req, res, next) =>Promise.resolve(fn(req, res, next)).catch(next);

router.get("/", use(getAllChats));
router.get("/:id", use(findChat));
router.post("/create", use(createChat));

module.exports = router;
