const mongoose = require("mongoose");

const mainCategorySchema = new mongoose.Schema(
  {
    mName: {
      type: String,
      required: true,
    },
    mDescription: {
      type: String,
      required: true,
    },
    mImage: {
      type: String,
    },
    mStatus: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const mainCategoryModel = mongoose.model("mainCategories", mainCategorySchema);
module.exports = mainCategoryModel;
