const router = require("express").Router();
const { register, login,getAllUsers ,getUser} = require("../controllers/authController");

const use = (fn) => (req, res, next) =>Promise.resolve(fn(req, res, next)).catch(next);

router.post("/register", use(register));
router.post("/login", use(login));
router.get("/users",getAllUsers)
router.get("/:id",getUser)

module.exports = router;
