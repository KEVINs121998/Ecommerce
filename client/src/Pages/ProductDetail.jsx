import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart,  decreaseQuantity } from "../features/cart/cartSlice";


const ProductDetail = () => {
  const { id } = useParams(); // Get product ID from URL params
  const [product, setProduct] = useState(null); // State to hold product details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const dispatch = useDispatch(); // Dispatch actions to Redux store

  // Get cart items from the Redux store
  const cartItems = useSelector((state) => state.cart.items);

  // Find the product in the cart and get the quantity
  const cartProduct = cartItems.find((item) => item.id === parseInt(id));
  const productQuantity = cartProduct ? cartProduct.quantity : 0;

  // Fetch product details from API
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch product details");
        setLoading(false);
      }
    };
  
    fetchProductDetails();
  }, [id]);
  

  // Loading and error handling UI
  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl">{error}</div>;
  }

  if (!product) {
    return <div className="text-center text-xl">Product not found</div>;
  }

  // Add product to cart
  const handleAddToCart = async () => {
    if (!product) {
      console.error("Product is not available.");
      return;
    }
  
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch("http://localhost:5000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product.id, quantity: 1 }), // Use productId instead of product.id
      });
  
      if (!response.ok) {
        throw new Error(`Error adding to cart: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log(data, "Cart data");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  
  
  
   
  
  

  // Decrease the quantity of the product in the cart
const handleDecreaseQuantity = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please log in to update your cart.");
    return;
  }

  // Update the Redux store
  dispatch(decreaseQuantity(id));

  // Send DELETE or PATCH request to the backend to update the cart
  try {
    const response = await fetch("http://localhost:5000/cart/update", {
      method: "PATCH", // Use "DELETE" or "PATCH" if required by backend
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ productId: product.id }), // Pass the product ID to be updated
    });

    if (!response.ok) {
      throw new Error("Failed to decrease item quantity.");
    }

    const data = await response.json();
    console.log("Cart item quantity decreased:", data);
  } catch (error) {
    console.error("Error decreasing cart item quantity:", error.message);
  }
};

  
  const handleIncreaseQuantity = async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("Please log in to update your cart.");
      return;
    }
  
    // Update Redux store
    dispatch(addToCart({ ...product, quantity: 1 }));
  
    // Send POST request to backend
    try {
      const response = await fetch("http://localhost:5000/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update item quantity.");
      }
  
      const data = await response.json();
      console.log("Cart updated successfully:", data);
    } catch (error) {
      console.error("Error updating cart:", error.message);
    }
  };
  

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="w-full md:w-1/3">
        <img
  src={product.image}
  alt={product.title}
  className="w-2/4 sm:w-2/3 md:w-1/2 mx-auto h-auto rounded-lg shadow-lg object-contain"
/>

        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 flex flex-col">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">{product.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{product.description}</p>

          <div className="flex items-center space-x-2 mb-6">
            <span className="text-xl font-semibold text-blue-600">${product.price}</span>
            <div className="flex items-center">
              <FaStar className="text-yellow-500" />
              <span className="ml-1 text-sm">{product.rating.rate} / 5</span>
            </div>
          </div>

          {/* Add to Cart or Quantity Control */}
          {productQuantity > 0 ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={handleDecreaseQuantity}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
              >
                -
              </button>
              <span className="text-xl font-semibold">{productQuantity}</span>
              <button
                onClick={handleIncreaseQuantity}
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>

      {/* Optional: Product Specifications or Reviews */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-800">Product Details</h2>
        <ul className="list-disc ml-6 mt-4 text-gray-600">
          <li>Category: {product.category}</li>
          <li>Rating: {product.rating.count} reviews</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDetail;
