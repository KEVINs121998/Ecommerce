import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // For accessing and updating cart state
import { addToCart } from "../features/cart/cartSlice"; // Import addToCart from cartSlice

const Home = () => {

  const token = localStorage.getItem("token");

if (token) {
  // Proceed with authenticated logic
} else {
  console.log("User not logged in.");
}



  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 500],
    rating: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [sortBy, setSortBy] = useState("price-low-to-high");

  const cartItems = useSelector((state) => state.cart.items); // Access cart state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const applyFilters = (product) => {
    const { category, priceRange, rating } = filters;

    const isCategoryMatch = category ? product.category === category : true;
    const isPriceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    const isRatingMatch = product.rating && product.rating.rate >= rating;

    return isCategoryMatch && isPriceMatch && isRatingMatch;
  };

  const filteredProducts = products.filter(applyFilters);

  const sortProducts = (products) => {
    if (sortBy === "price-low-to-high") {
      return products.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high-to-low") {
      return products.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      return products.sort((a, b) => b.rating.rate - a.rating.rate);
    } else {
      return products;
    }
  };

  const sortedProducts = sortProducts(filteredProducts);

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  const renderActiveFilters = () => {
    const activeFilters = [];

    if (filters.category) {
      activeFilters.push(`Category: ${filters.category}`);
    }
    if (filters.priceRange[1] !== 500) {
      activeFilters.push(`Price: Up to $${filters.priceRange[1]}`);
    }
    if (filters.rating > 0) {
      activeFilters.push(`Rating: ${filters.rating} stars and above`);
    }

    return activeFilters.length ? (
      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700">
        <strong>Active Filters:</strong>
        {activeFilters.map((filter, index) => (
          <span key={index} className="bg-gray-200 px-2 py-1 rounded-full">
            {filter}
          </span>
        ))}
      </div>
    ) : null;
  };

  return (
    <div>
      {/* Main Section */}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar for Filters */}
        <div className="w-full md:w-1/4 p-6 bg-gray-100">
          <h3 className="text-lg font-bold mb-4">Filters</h3>
          {/* Filter by category */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Category</label>
            <select
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              className="w-full p-2 border rounded-md"
            >
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelry</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
            </select>
          </div>

          {/* Filter by price range */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Price Range</label>
            <input
              type="range"
              min="0"
              max="500"
              value={filters.priceRange[1]}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  priceRange: [filters.priceRange[0], e.target.value],
                })
              }
              className="w-full"
            />
            <p className="text-sm mt-1">
              Up to ${filters.priceRange[1]}
            </p>
          </div>

          {/* Filter by rating */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Rating</label>
            <input
              type="number"
              value={filters.rating}
              onChange={(e) =>
                setFilters({ ...filters, rating: parseInt(e.target.value) })
              }
              min="1"
              max="5"
              className="w-full p-2 border rounded-md"
              placeholder="Minimum Rating"
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-full md:w-3/4 p-6">
          {/* Sorting and Active Filters Section */}
          <div className="flex flex-col md:flex-row md:items-center mb-4 gap-4">
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border rounded-md"
              >
                <option value="price-low-to-high">Price: Low to High</option>
                <option value="price-high-to-low">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
            {renderActiveFilters()}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className="border p-4 rounded-lg shadow-md cursor-pointer"
                onClick={() => {
                  console.log("Product Object: ", product); // Log the entire product object
                  navigate(`/product/${product.id}`);
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h3 className="font-bold text-xl mb-2">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {product.description.slice(0, 100)}...
                </p>
                <p className="font-bold text-lg text-blue-600">${product.price}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-md mr-2 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">{`${currentPage} of ${totalPages}`}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded-md ml-2 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
