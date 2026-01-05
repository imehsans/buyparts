const express = require("express");
const router = express.Router();
const ordersController = require("../controller/orders");
const multer = require("multer");

var storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, "public/uploads/orders");
   },
   filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname);
   },
});

const upload = multer({ storage: storage });

router.get("/get-all-orders", ordersController.getAllOrders);
router.post("/order-by-user", ordersController.getOrderByUser);

router.post("/create-order", upload.any(), ordersController.postCreateOrder);
router.post("/update-order", ordersController.postUpdateOrder);
router.post("/delete-order", ordersController.postDeleteOrder);

module.exports = router;
