import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const CategoryPage = () => {
  const { category } = useParams(); // Get the category from the URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products based on the category
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        const filteredProducts = response.data.filter(
          (product) => product.category.toLowerCase() === category.toLowerCase()
        );
        setProducts(filteredProducts);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false); // Set loading to false once the request is done (success or failure)
      }
    };

    fetchCategoryProducts();
  }, [category]);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl">{error}</div>;
  }

  if (products.length === 0) {
    return <div className="text-center text-xl">No products found in this category.</div>;
  }

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-8">{category} Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="transform transition duration-300 hover:scale-105"
          >
            <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl cursor-pointer">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain rounded-t-md"
              />
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                <p className="text-gray-600 mt-2">{product.description.substring(0, 100)}...</p>
                <p className="mt-2 font-semibold text-xl">${product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
