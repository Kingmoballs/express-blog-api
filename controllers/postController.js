const {readPosts, writePosts} = require("../utils/fileHelper")

exports.getAllPosts = (req, res) => {
    const { title } = req.query;
    const posts = readPosts();

    if (title) {
        const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(title.toLowerCase())
        );
        return res.json(filtered);
    }

    res.json(posts);
};

exports.createPost = (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: "Title and Content required" })
    };

    const newPost = {
        id: Date.now(),
        title,
        content
    };

    const posts = readPosts();
    posts.push(newPost);
    writePosts(posts)


    res.status(201).json({ 
        message: "Post created successfully",
        post: newPost
     })
};

exports.deletePost = (req, res) => {
    const id = parseInt(req.params.id);
    const posts = readPosts();
    const filteredPosts = posts.filter(post => post.id !== id);

    if (posts.length === filteredPosts.length) {
        return res.status(404).json({ message: "post not found!" })
    }

    writePosts(filteredPosts);
    
    res.json({message: "Post deleted Successfully!"})

};

exports.updatePost = (req, res) => {
    const id = parseInt(req.params.id);
    const {title, content} = req.body;

    if (!title || !content) {
       return res.status(400).json({ message: "Title and content are required" });
    }

    const posts = readPosts();
    const postIndex = posts.findIndex(post => post.id === id);

    if (postIndex === -1) {
        return res.status(404).json({ message: "Post not found" });
    }

    //Update the posts
    posts [postIndex] = {
        ...posts[postIndex],
        title,
        content
    };

    writePosts(posts);

    res.json({ message: "Post updated successfully", post: posts[postIndex] });

}