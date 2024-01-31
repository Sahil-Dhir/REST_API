const { createUser, getUsersByUserid, getAllUsers, updateUser, deleteUser, login } = require("./user.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation")

router.post("/user", createUser);
router.get("/users", checkToken, getAllUsers);
router.get("/user/:id", checkToken, getUsersByUserid);
router.patch("/user", checkToken, updateUser);
router.delete("/user", checkToken, deleteUser);
router.post("/login", login);

module.exports = router;
