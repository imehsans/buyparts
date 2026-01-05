const mongoose = require("mongoose");

const paymentSettingSchema = new mongoose.Schema(
  {
    easyPaisaName: {
      type: String,
      default: "Default Name",
    },
    easyPaisaNumber: {
      type: String,
      default: "0000-0000000",
    },
    jazzCashName: {
      type: String,
      default: "Default Name",
    },
    jazzCashNumber: {
      type: String,
      default: "0000-0000000",
    },
  },
  { timestamps: true }
);

const paymentSettingModel = mongoose.model("paymentSettings", paymentSettingSchema);
module.exports = paymentSettingModel;
