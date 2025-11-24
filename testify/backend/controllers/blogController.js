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

// UPDATE BLOG
const updateBlog = async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        content: req.body.content,
      },
      { new: true }
    );

    res.send({ message: "Blog updated", blog: updated });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// DELETE BLOG
const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.send({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};


module.exports = { getBlogs, createBlog , updateBlog, deleteBlog};
