const mongoose = require("mongoose");

const DiscountSchema = new mongoose.Schema({
  title: {
    type: String,
    max: 60,
  },
  toDate: {
    type: Date,
  },
  discount: {
    type: Number,
  },
  oldPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
  },
  description: {
    type: String,
    maxlength: 1000,
  },
  imageUrl: {
    type: String,
  },
});

const Discount = mongoose.model("Discount", DiscountSchema);
exports.Discount = Discount;
exports.DiscountSchema = DiscountSchema;
