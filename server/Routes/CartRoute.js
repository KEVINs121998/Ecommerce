const express = require("express");
const router = express.Router();
const verifyToken  = require("../middleware/authMiddleware");
const Cart = require("../models/Cart"); // Assuming a Cart model exists
const mongoose = require("mongoose");

// Add or update cart item
router.post("/add", verifyToken, async (req, res) => {
  console.log("Request body:", req.body); // Log the request body to check data

  const { productId, quantity } = req.body;
  const userId = req.user.id;

  try {
    // Validate productId and convert to ObjectId
    if (!productId || typeof productId !== "string" || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid productId" });
    }
    const productObjectId = new mongoose.Types.ObjectId(productId); // Convert to ObjectId

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ productId: productObjectId, quantity }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productObjectId.toString()
      );
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId: productObjectId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Cart updated successfully", cart });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});




router.patch("/update", verifyToken, async (req, res) => {
  const { productId, quantity } = req.body; // Quantity can be positive (add) or negative (remove)
  const userId = req.user.id;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const existingItem = cart.items.find((item) => item.productId.toString() === productId);

    if (!existingItem) {
      return res.status(404).json({ message: "Product not found in the cart" });
    }

    // Update the quantity or remove the item if quantity becomes 0
    existingItem.quantity += quantity;
    if (existingItem.quantity <= 0) {
      cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
    }

    await cart.save();
    res.status(200).json({ message: "Cart updated successfully", cart });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get cart data
const fetchCartData = async () => {
  try {
    const response = await fetch("http://localhost:5000/cart/get-cart", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (response.ok) {
      const cartData = await response.json();
      if (Array.isArray(cartData.items)) {
        dispatch(loadCartFromServer(cartData.items));  // Dispatch only if items is an array
      } else {
        console.error("Invalid cart data received:", cartData);
      }
    } else {
      console.log("No cart found or failed to fetch");
    }
  } catch (error) {
    console.error("Error fetching cart data:", error);
  }
};



module.exports = router;
