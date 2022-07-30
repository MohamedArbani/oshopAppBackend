const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 2,
    max: 50,
    required: [true, "Please Include the product name"],
  },
  description: {
    type: String,
    min: 5,
    maxlength: 1000,
    required: [true, "Please Include the product description"],
  },
  imageUrl: {
    type: String,
    required: [true, "Please Include the product imageUrl"],
  },
  price: {
    type: Number,
    max: 255,
  },
  rating: {
    type: Number,
    default: 0,
  },
  categoryName: {
    type: String,
  },
  newBadge: {
    type: Boolean,
    default: false,
  },
  saleBadge: {
    type: Boolean,
    default: false,
  },
  oldPrice: {
    type: Number,
    default: 0,
  },
  newPrice: {
    type: Number,
    default: false,
  },
  qtyTotal: {
    type: Number,
    default: 1,
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

const Food = mongoose.model("Food", foodSchema);
exports.Food = Food;
exports.foodSchema = foodSchema;
