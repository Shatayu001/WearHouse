const mongoose = require("mongoose");

// Schema for an individual item within the cart (cartItemSchema)
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: String,
  image: String,
  price: String,
  size: String,
  color: String,
  quantity: {
    type: Number,
    default: 1,
  },
}); // Note: The first screenshot has some code that seems to be related to cartItemSchema before this snippet, but the closing parenthesis and semicolon are present here. I've only included what is clearly visible and relevant to the schema definitions.

// Schema for the overall shopping cart (cartSchema)
const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    guestId: {
      type: String,
    },
    products: [cartItemSchema], // Array of cart items using the defined schema
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

// Export the Cart model
module.exports = mongoose.model("Cart", cartSchema);
