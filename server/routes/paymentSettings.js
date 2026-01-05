const express = require("express");
const router = express.Router();
const paymentSettingsController = require("../controller/paymentSettings");

router.get("/get-payment-settings", paymentSettingsController.getPaymentSettings);
router.post("/update-payment-settings", paymentSettingsController.updatePaymentSettings);

module.exports = router;
