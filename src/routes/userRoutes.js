const express = require("express");
const router = express.Router();

const controller = require("../controllers/userControllers");
const authController = require("../controllers/authControllers");

router.get("/", controller.getAll); //lista os usuários
router.post("/", controller.createUser); //cria novo usuário
router.post("/login", authController.login); //realiza login e gera token

module.exports = router;