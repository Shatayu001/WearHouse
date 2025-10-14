const express = require("express");
const Order = require("../models/Order");
const { protect, admin } = require("../middleware/authMiddleware"); //

const router = express.Router();

// @route GET /api/admin/orders
// @desc Get all orders (Admin only)
// @access Private/Admin
router.get("/", protect, admin, async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route PUT /api/admin/orders/:id
// @desc Update order status
// @access Private/Admin
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name");

    if (order) {
      // Update order status if provided in the body
      order.status = req.body.status || order.status;

      // Check if the new status is "Delivered" to update isDelivered and deliveredAt
      if (req.body.status === "Delivered") {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
      } else {
        order.isDelivered = order.isDelivered; // Keep existing value if not set to Delivered
        order.deliveredAt = order.deliveredAt; // Keep existing value
      }

      // Save the updated order document
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      // Order not found
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @route DELETE /api/admin/orders/:id
// @desc Delete an order
// @access Private/Admin
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    // Find the order by ID
    const order = await Order.findById(req.params.id);

    if (order) {
      // Delete the order document
      await order.deleteOne();
      res.json({ message: "Order removed" });
    } else {
      // Order not found
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
