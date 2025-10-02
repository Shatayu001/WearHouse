import Hero from "../components/layout/Hero";
import GenderCollectionSection from "../components/products/GenderCollectionSection";
import NewArrivals from "../components/products/NewArrivals";
import ProductDetails from "../components/products/ProductDetails";
import ProductGrid from "../components/products/ProductGrid";

const placeholderProducts = [
  {
    id_: 1,
    name: "product 1",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500/?random=1" }],
  },
  {
    id_: 2,
    name: "product 2",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500/?random=2" }],
  },
  {
    id_: 3,
    name: "product 3",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500/?random=3" }],
  },
  {
    id_: 4,
    name: "product 4",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500/?random=4" }],
  },
  {
    id_: 5,
    name: "product 1",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500/?random=5" }],
  },
  {
    id_: 6,
    name: "product 2",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500/?random=6" }],
  },
  {
    id_: 7,
    name: "product 3",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500/?random=7" }],
  },
  {
    id_: 8,
    name: "product 4",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500/?random=8" }],
  },
];

const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />
      {/* Best Sellers */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      <ProductDetails />
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={placeholderProducts} />
      </div>
    </div>
  );
};

export default Home;
