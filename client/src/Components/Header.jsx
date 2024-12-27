import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../assets/images/logo.jpg";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { logoutUserAction } from "../actions/authActions";  // Import your logout action

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector(state => state.auth.token);

  const isLoggedIn = !!token;

  // Other states
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Fetch products and categories
  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const productsResponse = await axios.get("https://fakestoreapi.com/products");
        setProducts(productsResponse.data);

        const uniqueCategories = [
          ...new Set(productsResponse.data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Failed to fetch products or categories", err);
      }
    };

    fetchProductsAndCategories();
  }, []);

  // Update suggestions
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSuggestions([]);
    } else if (products.length > 0) {
      const filteredSuggestions = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSuggestions(filteredSuggestions.slice(0, 5));
    }
  }, [searchQuery, products]);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Logout function
  const handleLogout = () => {
    // Clear token from Redux
    dispatch(logoutUserAction());
    
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Redirect user to the login page
    navigate('/login');
  };
  

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
        <h1 className="text-white">{isLoggedIn ? "Logged In" : "Not Logged In"}</h1>
        <img
            src={logo}
            alt="Logo"
            className="h-10 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Login/Logout/User Icon */}
          {!isLoggedIn ? (
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Login
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              {/* <img
                src={user?.avatar || "https://via.placeholder.com/40"} // Placeholder if no avatar
                alt="User"
                className="h-10 w-10 rounded-full"
              />
              <span className="text-sm">{user?.name || "User"}</span> */}
              <button
                onClick={handleLogout}  // Call logout when button is clicked
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}

          {/* Cart Icon */}
          <button
            onClick={() => navigate("/cart")}
            className="relative text-white hover:text-blue-500"
          >
            <FaShoppingCart className="text-xl" />
            {cartItemCount > 0 && (
              <span className="absolute bottom-3 left-3 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-screen-xl mx-auto mt-4 relative">
        <form
          onSubmit={handleSearch}
          className="relative flex items-center w-full sm:w-2/3 md:w-1/2 lg:w-1/2 mx-auto"
        >
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <button type="submit" className="absolute left-3">
            <FaSearch className="text-gray-500" size={20} />
          </button>
        </form>

        {searchQuery.trim() !== "" && (
          <div className="absolute top-12 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
            {suggestions.length > 0 ? (
              <ul>
                {suggestions.map((product) => (
                  <li
                    key={product.id}
                    onClick={() => {
                      navigate(`/product/${product.id}`);
                      setSearchQuery("");
                      setSuggestions([]);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                  >
                    {product.title}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center text-gray-500 py-2">No suggestions found.</div>
            )}
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="max-w-screen-xl mx-auto flex justify-center space-x-8 mt-5">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => navigate(`/category/${category.toLowerCase()}`)}
            className="hover:text-blue-500 capitalize text-sm sm:text-base"
          >
            {category}
          </button>
        ))}
        <button
          onClick={() => navigate("/about")}
          className="text-sm sm:text-base"
        >
          About Us
        </button>
      </div>
    </header>
  );
};

export default Header;
