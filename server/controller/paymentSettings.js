const paymentSettingModel = require("../models/paymentSettings");

class PaymentSettings {
  async getPaymentSettings(req, res) {
    try {
      let settings = await paymentSettingModel.findOne({});
      if (!settings) {
        // Create default if not exists
        const newSettings = new paymentSettingModel();
        settings = await newSettings.save();
      }
      return res.json({ settings });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Server Error" });
    }
  }

  async updatePaymentSettings(req, res) {
    let { easyPaisaName, easyPaisaNumber, jazzCashName, jazzCashNumber } = req.body;
    try {
      let settings = await paymentSettingModel.findOne({});
      if (!settings) {
        settings = new paymentSettingModel();
      }
      settings.easyPaisaName = easyPaisaName;
      settings.easyPaisaNumber = easyPaisaNumber;
      settings.jazzCashName = jazzCashName;
      settings.jazzCashNumber = jazzCashNumber;
      
      await settings.save();
      return res.json({ success: "Payment settings updated successfully" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Server Error" });
    }
  }
}

const paymentSettingsController = new PaymentSettings();
module.exports = paymentSettingsController;
