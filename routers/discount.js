const express = require("express");
const router = express.Router();
const { Discount } = require("../models//discounts");

router.get("/", async (req, res) => {
  const discount = await Discount.find();
  res.send(discount);
});

router.post("/", async (req, res) => {
  let discount = new Discount({
    title: req.body.title,
    toDate: req.body.toDate,
    discount: req.body.discount,
    oldPrice: req.body.oldPrice,
    discountPrice: req.body.discountPrice,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
  });
  discount = await discount.save();

  res.status(201).send(discount);
});

router.get("/:id", async (req, res) => {
  const discount = await Discount.findById(req.params.id);
  if (!discount) {
    return res.status(404).send("That type od id not found...");
  }
  res.send(discount);
});

router.put("/:id", async (req, res) => {
  const discount = await Discount.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      toDate: req.body.toDate,
      discount: req.body.discount,
      oldPrice: req.body.oldPrice,
      discountPrice: req.body.discountPrice,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
    },
    { new: true }
  );

  if (!discount) {
    return res.status(404).send("That type of id not found...");
  }
  res.send(discount);
});

router.delete("/:id", async (req, res) => {
  const discount = await Discount.findByIdAndRemove(req.params.id);
  if (!discount) {
    return res.status(404).send("That type of id not   found...");
  }
  res.send(discount);
});
module.exports = router;
