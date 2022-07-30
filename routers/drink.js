const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const { Drink } = require("../models/drinks");

router.get("/", async (req, res) => {
  const drinks = await Drink.find();
  if (!drinks) {
    return res.status(404).send("Drinks Empty");
  }
  res.send(drinks);
});

router.post("/", auth, async (req, res) => {
  let drink = new Drink({
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    rating: req.body.rating,
    categoryName: req.body.categoryName,
    newBadge: req.body.newBadge,
    saleBadge: req.body.saleBadge,
    oldPrice: req.body.oldPrice,
    newPrice: req.body.newPrice,
    qtyTotal: req.body.qtyTotal,
    total: req.body.total,
  });
  drink = await drink.save();

  res.status(201).send(drink);
});

router.get("/:id", async (req, res) => {
  const drink = await Drink.findById(req.params.id);
  if (!drink) {
    return res.status(404).send("That type of id not found");
  }
  res.send(drink);
});

router.put("/:id", async (req, res) => {
  const drink = await Drink.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      rating: req.body.rating,
      categoryName: req.body.categoryName,
      newBadge: req.body.newBadge,
      saleBadge: req.body.saleBadge,
      oldPrice: req.body.oldPrice,
      newPrice: req.body.newPrice,
      qtyTotal: req.body.qtyTotal,
      Total: req.body.Total,
    },
    {
      new: true,
    }
  );
  if (!drink) {
    return res.status(404).send("That type of id not found");
  }

  res.status(201).send(drink);
});

router.delete("/:id", async (req, res) => {
  const drink = await Drink.findByIdAndRemove(req.params.id);
  if (!drink) {
    return res.status(404).send("That type of id not found...");
  }
  res.send(drink);
});
module.exports = router;
