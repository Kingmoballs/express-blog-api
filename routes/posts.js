const express = require('express');
const router = express.Router();
const postController = require("../controllers/postController");
const verifyToken = require("../middleware/verifyToken");

//Get all Posts
router.get("/", postController.getAllPosts);

//Get a post
router.get("/:id", postController.getPostById)

//Post a new Post
router.post("/", verifyToken, postController.createPost);

//Delete a post
router.delete("/:id", verifyToken, postController.deletePost)

//Update a post
router.put("/:id",verifyToken, postController.updatePost)

// Get posts by category
router.get("/category/:category", postController.getPostsByCategory);

module.exports = router