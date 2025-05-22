const Post = require("../models/post");
const logger = require("../utils/logger")


exports.getAllPosts = async (req, res) => {
    const { title } = req.query;
    
    try {
        const filter = title
        ? { title: { $regex: title, $options: "i" } }
        : {};

        const posts = await Post.find(filter).populate("author", "name email")

        logger.info(`Fetched ${posts.length} post(s)${title ? ` with title containing: '${title}'` : ''}`);
        res.json(posts);
    }
    catch (error) {
        logger.error("Error fetching posts", { error: error.message });
        res.status(500).json({ message: "Error fetching post", error: error.message })
    }

    
};

exports.getPostById = async (req, res) => {
    const { id } = req.params;

    try{
        const post = await Post.findById(id).populate("author", "name email");
        if (!post) {
            logger.warn(`Post with ID ${id} not found`);
            return res.status(404).json({ message: "post not found" });
        }

        logger.info(`Fetched post with ID ${id}`);
        res.json(post);
    }
    catch (error) {
        logger.error(`Error fetching post with ID ${id}`, { error: error.message });
        res.status(500).json({ message: "Error fetching post", error: error.message })
    }

}

exports.createPost = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.id;

    if (!title || !content) {
        logger.warn("Missing title or content")
        return res.status(400).json({ message: "Title and Content required" })
    }
    try {
        const newPost = new Post({ title, content, author: userId });
        const savedPost = await newPost.save()

        logger.info(`Post created by user ${userId}`)
        res.status(201).json({
            message: "post created successfully",
            post: savedPost
        })
    } catch (error) {
        logger.error("Error creating post", error)
        res.status(500).json({ message: "Error creating post", error: error.message })
    }

};

exports.deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);

        if (!post) {
            logger.warn(`Delete failed: Post with ID ${id} not found`);
            return res.status(404).json({ message: "Post not found" });
        }

        // Authorization check
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to delete this post" });
        }

        await post.deleteOne();
        logger.info(`Post with ID ${id} deleted by user ${req.user.id}`);
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        logger.error(`Error deleting post with ID ${id}`, error);
        res.status(500).json({ message: "Error deleting post", error: error.message });
    }
};


exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    if (!title || !content) {
        logger.warn("Update Failed: Missing title or content")
        return res.status(400).json({ message: "Title and content are required" });
    }

    try {
        const post = await Post.findById(id);

        if (!post) {
            logger.warn(`Update failed: Post with ID ${id} not found`);
            return res.status(404).json({ message: "Post not found" });
        }

        // Authorization check
        if (post.author.toString() !== req.user.id) {
            logger.warn(`Unauthorized update attempt by user ${req.user.id} on post ${id}`);
            return res.status(403).json({ message: "You are not authorized to update this post" });
        }

        // Update only after passing the check
        post.title = title;
        post.content = content;
        const updatedPost = await post.save();

        logger.info(`Post with ID ${id} updated successfully by user ${req.user.id}`);
        res.json({ message: "Post updated successfully", post: updatedPost });
    } catch (error) {
        logger.error(`Error updating post with ID ${id}`, error);
        res.status(500).json({ message: "Error updating post", error: error.message });
    }
};
