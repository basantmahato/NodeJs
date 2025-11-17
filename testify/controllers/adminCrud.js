const User = require("../models/user");
const Post = require("../models/post");

const adminCrud = {
  // USERS
  getAllUsers: async (req, res) => {
    const users = await User.find().select("-password");
    res.json(users);
  },

  deleteUser: async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  },

  // POSTS
  createPost: async (req, res) => {
    const post = new Post(req.body);
    await post.save();
    res.json({ message: "Post created", post });
  },

  updatePost: async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(post);
  },

  deletePost: async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
  },

  getPosts: async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
  },

  // ANALYTICS
  analytics: async (req, res) => {
    const totalUsers = await User.countDocuments();
    const totalPosts = await Post.countDocuments();

    res.json({ totalUsers, totalPosts });
  }
};

module.exports = adminCrud;
