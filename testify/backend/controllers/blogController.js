const Blog = require("../models/blog");

// Public: Get all blogs
const getBlogs = async (req, res) => {
  try {
    // Sort by newest first
    const blogs = await Blog.find().sort({ createdAt: -1 }).populate("author", "username");
    res.send(blogs);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Admin Only: Create a blog
const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newBlog = new Blog({
      title,
      content,
      author: req.user.id // id comes from the JWT token
    });
    const savedBlog = await newBlog.save();
    res.send({ message: "Blog posted successfully", blog: savedBlog });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = { getBlogs, createBlog };