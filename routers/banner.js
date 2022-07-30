const express = require("express");
const router = express.Router();
const { Banner } = require("../models/banner");

router.get("/", async (req, res) => {
  const banner = await Banner.find();
  res.send(banner);
});

router.post("/", async (req, res) => {
  let banner = new Banner({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
  });
  banner = await banner.save();

  res.status(201).send(banner);
});

router.get("/:id", async (req, res) => {
  const banner = await Banner.findById(req.params.id);
  if (!banner) {
    return res.status(404).send("That type od id not found...");
  }
  res.send(banner);
});

router.put("/:id", async (req, res) => {
  const banner = await Banner.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
    },
    { new: true }
  );

  if (!banner) {
    return res.status(404).json({ message: "That type of id not found..." });
  }
  res.send(banner);
});

router.delete("/:id", async (req, res) => {
  const banner = await Banner.findByIdAndRemove(req.params.id);
  if (!banner) {
    return res.status(404).json({ message: "That type of id not   found..." });
  }
  res.send(banner);
});
module.exports = router;
