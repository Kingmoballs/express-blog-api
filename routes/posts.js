const express = require('express');
const router = express.Router();
const postController = require("../controllers/postController")

//Get all Posts
router.get("/", postController.getAllPosts);

//Get a post
router.get("/:id", postController.getPostById)

//Post a new Post
router.post("/", postController.createPost);

//Delete a post
router.delete("/:id", postController.deletePost)

//Update a post
router.put("/:id", postController.updatePost)

module.exports = router