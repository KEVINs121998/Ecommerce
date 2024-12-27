import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa"; // Back icon

const CheckoutPage = () => {
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // State for user details form
  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    email: "",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle form submission (this could be integrated with a payment service)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (userDetails.name && userDetails.address && userDetails.email) {
      // Normally, you would send this data to an API for processing the order
      console.log("Order Submitted", userDetails);
      // Navigate to an order confirmation page
      navigate("/order-confirmation");
    } else {
      alert("Please fill in all the fields.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Checkout Header */}
        <div className="flex items-center space-x-2 mb-6">
          <button
            onClick={() => navigate("/cart")}
            className="text-gray-600 hover:text-blue-500"
          >
            <FaChevronLeft size={20} />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
        </div>

        {/* Cart Items Summary */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Order Summary
          </h2>
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500">Your cart is empty.</div>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between py-4 border-b border-gray-300">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-500">${item.price}</p>
                    </div>
                  </div>
                  <div className="text-gray-700">
                    <span>{item.quantity} x ${item.price}</span>
                  </div>
                </div>
              ))}
              <div className="flex justify-between text-lg font-semibold text-gray-800 mt-4">
                <span>Total:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>

        {/* User Details Form */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Shipping Information
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-600">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userDetails.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-gray-600">
                  Shipping Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={userDetails.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-600">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userDetails.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md mt-6 hover:bg-blue-700"
            >
              Complete Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
