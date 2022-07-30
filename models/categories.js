const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Include the product name"],
    min: 3,
    maxlength: 50,
  },
});

const Category = mongoose.model("Category", CategorySchema);
exports.Category = Category;
exports.CategorySchema = CategorySchema;
