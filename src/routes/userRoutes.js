const express = require("express");
const router = express.Router();

const controller = require("../controllers/userControllers");
const authController = require("../controllers/authControllers");
const postController = require("../Controllers/postControllers");

router.get("/", controller.getAll); //lista os usuários
router.post("/", controller.createUser); //cria novo usuário
router.post("/login", authController.login); //realiza login e gera token
router.patch("/:id", controller.updateUserById)
router.get("/:id/posts", postController.getAllPosts); //lista posts
router.post("/:id/posts", postController.createPost);

module.exports = router;