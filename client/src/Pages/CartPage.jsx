import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa"; // Trash icon for removing items
import { removeFromCart, decreaseQuantity } from "../features/cart/cartSlice"; // Actions for cart
import { addToCart } from "../features/cart/cartSlice"; 
import { useEffect } from "react";
import { loadCartFromServer } from "../features/cart/cartSlice"; // Redux action to load cart

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items || []);  // Default to an empty array

const totalAmount = Array.isArray(cartItems)
  ? cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  : 0; // If cartItems is not an array, set totalAmount to 0

console.log(totalAmount);


  // Remove item from cart
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  // Decrease item quantity
  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  // Navigate to the checkout page
  const handleCheckout = () => {
    navigate("/checkout");
  };


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
      dispatch(loadCartFromServer(cartData.items)); 
    } else {
      console.log("No cart found or failed to fetch");
    }
  } catch (error) {
    console.error("Error fetching cart data:", error);
  }
};

useEffect(() => {
  if (localStorage.getItem("token")) {
    fetchCartData();
  }
}, []);



  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Cart Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Shopping Cart</h1>

        {/* Cart Items */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500">Your cart is empty.</div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-4 border-b border-gray-300">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-md" />
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-sm text-gray-500">${item.price}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Quantity control */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDecrease(item.id)}
                      className="bg-gray-300 text-white px-2 py-1 rounded-md"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      className="w-12 text-center border border-gray-300 rounded-md"
                      readOnly
                    />
                    <button
                      onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))}
                      className="bg-gray-300 text-white px-2 py-1 rounded-md"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Item */}
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt className="text-xl" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Summary */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between text-lg font-semibold text-gray-800 mb-4">
            <span>Total:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
