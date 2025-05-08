const Post = require("../models/Post");


exports.getAllPosts = async (req, res) => {
    const { title } = req.query;
    
    try {
        let posts;

        if (title) {
        posts = await Post.find({
            title: { $regex: title, $options: "i" }
        });
    } else {
        posts = await Post.find()
    }

    res.json(posts);
    }
    catch (error) {
        res.status(500).json({ message: "Erroe fetching post", error: error.message })
    }

    
};

exports.getPostById = async (req, res) => {
    const { id } = req.params;

    try{
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "post not found" });
        }

        res.json(post);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching post", error: error.message })
    }

}

exports.createPost = async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: "Title and Content required" })
    }
    try {
        const newPost = new Post({ title, content });
        const savedPost = await newPost.save()

        res.status(201).json({
            message: "post created successfully",
            post: savedPost
        })
    } catch (error) {
        res.status(500).json({ message: "Error creating post", error: error.message })
    }

};

exports.deletePost = async (req, res) => {
    const { id } = req.params;

    try{
        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json({ message: "Post deleted successfully" })
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting post", error: error.message })
    }

};

exports.updatePost = async (req, res) => {
    const { id } = req.params;
    const {title, content} = req.body;

    if (!title || !content) {
       return res.status(400).json({ message: "Title and content are required" });
    }

    try{
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { title, content },
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json({ message: "Post updated successfully", post: updatedPost })
    }
    catch (error) {
        res.status(500).json({ message: "Error updating post", error: error.message })
    }

}