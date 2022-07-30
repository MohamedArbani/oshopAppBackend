const express = require("express");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const router = express.Router();
const { FoodCategory } = require("../models/food-categories");

router.get("/", async (req, res) => {
  const foodCategories = await FoodCategory.find();
  res.send(foodCategories);
});

router.post("/", async (req, res) => {
  let foodCategory = new FoodCategory({
    name: req.body.name,
  });
  foodCategory = await foodCategory.save();

  res.status(201).send(foodCategory);
});

router.get("/:id", async (req, res) => {
  const foodCategory = await FoodCategory.findById(req.params.id);
  if (!foodCategory) {
    return res.status(404).send("That type od id not found...");
  }
  res.send(foodCategory);
});

router.put("/:id", [auth, admin], async (req, res) => {
  const foodCategory = await FoodCategory.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );

  if (!foodCategory) {
    return res.status(404).send("That type of id not found...");
  }
  res.send(foodCategory);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const foodCategory = await FoodCategory.findByIdAndRemove(req.params.id);
  if (!foodCategory) {
    return res.status(404).send("That type of id not found...");
  }
  res.send(foodCategory);
});
module.exports = router;
