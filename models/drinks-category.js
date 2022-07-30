const mongoose = require("mongoose");

const DrinkCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Include the product name"],
    maxlength: 100,
  },
});

const DrinkCategory = mongoose.model("DrinkCategory", DrinkCategorySchema);
exports.DrinkCategory = DrinkCategory;
exports.DrinkCategorySchema = DrinkCategorySchema;
