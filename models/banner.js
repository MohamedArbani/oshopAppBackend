const mongoose = require("mongoose");

const BannerSchema = new mongoose.Schema({
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
});

const Banner = mongoose.model("Banner", BannerSchema);
exports.Banner = Banner;
exports.BannerSchema = BannerSchema;
