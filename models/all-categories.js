const mongoose = require("mongoose");

const AllCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Include the product name"],
    min: 2,
    max: 50,
  },
});

const allCategories = mongoose.model("AllCategory", AllCategorySchema);
exports.AllCategory = allCategories;
exports.AllCategorySchema = AllCategorySchema;
