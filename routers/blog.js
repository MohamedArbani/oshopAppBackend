const express = require("express");
const router = express.Router();
const { Blog } = require("../models//blog");

router.get("/", async (req, res) => {
  const blog = await Blog.find();
  res.send(blog);
});

router.post("/", async (req, res) => {
  let blog = new Blog({
    title: req.body.title,
    description: req.body.description,
    publishDate: req.body.publishDate,
    categoryName: req.body.categoryName,
    imageUrl: req.body.imageUrl,
  });
  blog = await blog.save();

  res.status(201).send(blog);
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(404).json({ message: "That type od id not found..." });
  }
  res.send(blog);
});

router.put("/:id", async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      publishDate: req.body.publishDate,
      categoryName: req.body.categoryName,
      imageUrl: req.body.imageUrl,
    },
    { new: true }
  );

  if (!blog) {
    return res.status(404).json({ message: "That type of id not found..." });
  }
  res.send(blog);
});

router.delete("/:id", async (req, res) => {
  const blog = await Blog.findByIdAndRemove(req.params.id);
  if (!blog) {
    return res.status(404).json({ message: "That type of id not   found..." });
  }
  res.send(blog);
});
module.exports = router;
