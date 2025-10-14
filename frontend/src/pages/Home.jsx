import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios"; // Added: Required for the best seller fetch
import { fetchProductsByFilters } from "../redux/slices/productsSlice"; // Added: Assuming path to Redux thunk

// Component Imports
import Hero from "../components/layout/Hero";
import FeaturedCollection from "../components/products/FeaturedCollection";
import FeaturesSection from "../components/products/FeaturesSection";
import GenderCollectionSection from "../components/products/GenderCollectionSection";
import NewArrivals from "../components/products/NewArrivals";
import ProductDetails from "../components/products/ProductDetails";
import ProductGrid from "../components/products/ProductGrid";

const Home = () => {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerproduct, setBestSellerProduct] = useState(null);

  const [isBestSellerLoading, setIsBestSellerLoading] = useState(true);

  useEffect(() => {
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );

    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error("Error fetching best seller:", error);
      } finally {
        setIsBestSellerLoading(false);
      }
    };

    fetchBestSeller();
  }, [dispatch]);

  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      {/* Best Sellers */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      {isBestSellerLoading ? (
        <p className="text-center">Loading best seller product ...</p>
      ) : bestSellerproduct && bestSellerproduct._id ? (
        <ProductDetails productId={bestSellerproduct._id} />
      ) : (
        <p className="text-center">Best seller not available.</p>
      )}

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
        <FeaturedCollection />
        <FeaturesSection />
      </div>
    </div>
  );
};

export default Home;
