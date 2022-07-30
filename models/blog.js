const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: 60,
  },
  description: {
    type: String,
    maxlength: 1000,
  },
  imageUrl: {
    type: String,
  },
  publishDate: {
    type: Date,
  },
  categoryName: {
    type: String,
  },
});

const Blog = mongoose.model("Blog", BlogSchema);
exports.Blog = Blog;
exports.BannerSchema = BlogSchema;
