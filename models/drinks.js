const mongoose = require("mongoose");

const drinkSchema = new mongoose.Schema({
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
    required: [true, "Please Include the product ImageUrl"],
  },
  price: {
    type: Number,
    max: 255,
  },
  rating: {
    type: Number,
  },
  categoryName: {
    type: [String],
  },
  newBadge: {
    type: Boolean,
  },
  saleBadge: {
    type: Boolean,
  },
  oldPrice: {
    type: Number,
  },
  newPrice: {
    type: Number,
  },
  qtyTotal: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Drink = mongoose.model("Drink", drinkSchema);
exports.Drink = Drink;
exports.drinkSchema = drinkSchema;
