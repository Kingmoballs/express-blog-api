const fs = require("fs");
const path = require("path");

//path to post.json
const postsFile = path.join(__dirname, "../posts.json");

//Helper to read post
function readPosts() {
    const data = fs.readFileSync(postsFile, "utf8");
    return JSON.parse(data)
};

//Helper to write post
function writePosts(posts) {
    fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2))
};

module.exports = { readPosts, writePosts }