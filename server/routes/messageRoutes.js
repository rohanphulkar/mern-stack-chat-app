const { getMessages } = require("../controllers/mesasgeController");

const router = require("express").Router();

router.get("/:id", getMessages);

module.exports = router;
