const express = require("express");
const router = express.Router();
const { Category } = require("../models/categories");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.send(categories);
});

router.post("/", async (req, res) => {
  let category = new Category({
    name: req.body.name,
  });
  category = await category.save();

  res.status(201).send(category);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "That type od id not found..." });
  }
  res.send(category);
});

router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );

  if (!category) {
    return res.status(404).send("That type of id not found...");
  }
  res.send(category);
});

router.delete("/:id", async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);
  if (!category) {
    return res.status(404).send("That type of id not found...");
  }
  res.send(category);
});
module.exports = router;
