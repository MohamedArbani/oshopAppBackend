const express = require("express");
const router = express.Router();
const { DrinkCategory } = require("../models/drinks-category");

router.get("/", async (req, res) => {
  const drinkCategories = await DrinkCategory.find();
  res.send(drinkCategories);
});

router.post("/", async (req, res) => {
  let drinkCategory = new DrinkCategory({
    name: req.body.name,
  });
  drinkCategory = await drinkCategory.save();

  res.status(201).send(drinkCategory);
});

router.get("/:id", async (req, res) => {
  const drinkCategory = await DrinkCategory.findById(req.params.id);
  if (!drinkCategory) {
    return res.status(404).send("That type od id not found...");
  }
  res.send(drinkCategory);
});

router.put("/:id", async (req, res) => {
  const drinkCategory = await DrinkCategory.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );

  if (!drinkCategory) {
    return res.status(404).send("That type of id not found...");
  }
  res.send(drinkCategory);
});

router.delete("/:id", async (req, res) => {
  const drinkCategory = await DrinkCategory.findByIdAndRemove(req.params.id);
  if (!drinkCategory) {
    return res.status(404).send("That type of id not found...");
  }
  res.send(drinkCategory);
});
module.exports = router;
