import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";

const selectedProduct = {
  name: "Stylish Jacket",
  price: 120,
  originalPrice: 150,
  description: "This is a stylish jacket perfect for any occasion",
  brand: "FashionBrand",
  material: "Leather",
  sizes: ["S", "M", "L", "XL"],
  colors: ["Red", "Black"],
  images: [
    {
      url: "https://picsum.photos/500/500/?random=9",
      altText: "Stylish Jacket 1",
    },
    {
      url: "https://picsum.photos/500/500/?random=2",
      altText: "Stylish Jacket 2",
    },
  ],
};

const similarProducts = [
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
];

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState(
    selectedProduct.images[0]?.url || ""
  );
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Add state for button disable

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/500?text=Image+Not+Found";
  };

  const handleAddToCart = () => {
    console.log("Add to Cart clicked", {
      selectedSize,
      selectedColor,
      quantity,
    }); // Debug log
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and color before adding to cart.", {
        position: "top-right",
        duration: 1000,
      });
      return;
    }

    setIsButtonDisabled(true);
    setTimeout(() => {
      toast.success(`${selectedProduct.name} added to cart!`, {
        position: "top-right",
        duration: 3000,
        description: `Size: ${selectedSize}, Color: ${selectedColor}, Quantity: ${quantity}`,
      });
      setIsButtonDisabled(false);
    }, 500);
  };

  const testToast = () => {
    console.log("Test Toast clicked"); // Debug log
    toast.success("Test toast working!", {
      position: "top-right",
      duration: 3000,
    });
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url
                    ? "border-black border-2"
                    : "border-gray-300"
                }`}
                onClick={() => setMainImage(image.url)}
                onError={handleImageError}
                draggable="false"
              />
            ))}
          </div>
          <div className="md:w-1/2">
            <div className="mb-4">
              <img
                src={
                  mainImage || "https://via.placeholder.com/500?text=No+Image"
                }
                alt="Main Product"
                className="w-full h-[500px] object-cover rounded-lg"
                onError={handleImageError}
                draggable="false"
              />
            </div>
          </div>
          <div className="md:hidden flex overscroll-x-scroll space-x-4 mb-4">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.altText || `Thumbnail ${index}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === image.url
                    ? "border-black border-2"
                    : "border-gray-300"
                }`}
                onClick={() => setMainImage(image.url)}
                onError={handleImageError}
                draggable="false"
              />
            ))}
          </div>
          <div className="md:w-1/2 md:ml-10">
            <h1 className="text-2xl md:text-3xl font-semibold mb-2">
              {selectedProduct.name}
            </h1>
            <p className="text-lg text-gray-600 mb-1 line-through">
              ${selectedProduct.originalPrice}
            </p>
            <p className="text-xl text-gray-500 mb-2">
              ${selectedProduct.price}
            </p>
            <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
            <div className="mb-4">
              <p className="text-gray-700">Color:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border ${
                      selectedColor === color
                        ? "border-blue-500 border-2"
                        : "border-gray-300"
                    }`}
                    style={{
                      backgroundColor: color.toLowerCase(),
                      filter:
                        selectedColor === color
                          ? "brightness(1)"
                          : "brightness(0.5)",
                    }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
            <div className="mb-4">
              <p className="text-gray-700">Size:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 rounded border ${
                      selectedSize === size
                        ? "bg-black text-white border-blue-500"
                        : "bg-white text-black border-gray-300"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-6">
              <p className="text-gray-700">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button
                  className="px-2 py-1 bg-gray-200 rounded text-lg"
                  onClick={handleDecrement}
                  disabled={isButtonDisabled}
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded text-lg"
                  onClick={handleIncrement}
                  disabled={isButtonDisabled}
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${
                isButtonDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-900"
              }`}
              // disabled={isButtonDisabled}
            >
              {isButtonDisabled ? "Adding..." : "ADD TO CART"}
            </button>
            <div className="mt-10 text-gray-700">
              <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1">Brand:</td>
                    <td className="py-1">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1">Material:</td>
                    <td className="py-1">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-20">
          <h2 className="text-2xl text-center font-medium mb-4">
            You May Also Like
          </h2>
          <ProductGrid products={similarProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
