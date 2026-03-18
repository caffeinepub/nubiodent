import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "./backend.d";
import { CartSheet } from "./components/CartSheet";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { NavBar } from "./components/layout/NavBar";
import { TopBar } from "./components/layout/TopBar";
import { ProductDetailModal } from "./components/products/ProductDetailModal";
import { SAMPLE_PRODUCTS } from "./data/sampleProducts";
import {
  useAddToCart,
  useAddToWishlist,
  useAllProducts,
  useCart,
  useClearCart,
  useFeaturedProducts,
  useRemoveFromCart,
  useRemoveFromWishlist,
  useWishlist,
} from "./hooks/useQueries";
import { AboutPage } from "./pages/AboutPage";
import { AdminPage } from "./pages/AdminPage";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";

const queryClient = new QueryClient();

type Page =
  | "home"
  | "products"
  | "categories"
  | "services"
  | "about"
  | "contact"
  | "admin";

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: allProducts = [] } = useAllProducts();
  const { data: featuredProducts = [] } = useFeaturedProducts();
  const { data: cartItems = [], isLoading: cartLoading } = useCart();
  const { data: wishlistIds = [] } = useWishlist();

  const addToCartMutation = useAddToCart();
  const removeFromCartMutation = useRemoveFromCart();
  const clearCartMutation = useClearCart();
  const addToWishlistMutation = useAddToWishlist();
  const removeFromWishlistMutation = useRemoveFromWishlist();

  const cartCount = cartItems.reduce(
    (sum, item) => sum + Number(item.quantity),
    0,
  );
  const wishlistCount = wishlistIds.length;

  const products = allProducts.length > 0 ? allProducts : SAMPLE_PRODUCTS;

  const handleAddToCart = (product: Product) => {
    addToCartMutation.mutate(
      { productId: product.id, quantity: 1n },
      {
        onSuccess: () => toast.success(`${product.name} added to cart`),
        onError: () => toast.error("Failed to add to cart"),
      },
    );
  };

  const handleToggleWishlist = (product: Product) => {
    const inWishlist = wishlistIds.includes(product.id);
    if (inWishlist) {
      removeFromWishlistMutation.mutate(product.id, {
        onSuccess: () => toast.success(`${product.name} removed from wishlist`),
      });
    } else {
      addToWishlistMutation.mutate(product.id, {
        onSuccess: () => toast.success(`${product.name} added to wishlist`),
      });
    }
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const renderPage = () => {
    if (currentPage === "admin") {
      return <AdminPage />;
    }

    switch (currentPage) {
      case "home":
        return (
          <HomePage
            featuredProducts={featuredProducts}
            wishlistIds={wishlistIds}
            onViewDetails={setSelectedProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onNavigate={handleNavigate}
          />
        );
      case "products":
      case "categories":
        return (
          <ProductsPage
            products={products}
            wishlistIds={wishlistIds}
            onViewDetails={setSelectedProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            initialSearch={searchQuery}
          />
        );
      case "about":
        return <AboutPage />;
      default:
        return (
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <h1 className="font-display font-bold text-3xl text-foreground mb-4 capitalize">
              {currentPage}
            </h1>
            <p className="text-muted-foreground">
              This section is coming soon.{" "}
              <button
                type="button"
                onClick={() => handleNavigate("home")}
                className="text-primary underline"
              >
                Return home
              </button>
            </p>
          </div>
        );
    }
  };

  const isAdminPage = currentPage === "admin";

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminPage && <TopBar />}
      {!isAdminPage && (
        <Header
          cartCount={cartCount}
          wishlistCount={wishlistCount}
          onCartClick={() => setIsCartOpen(true)}
          onWishlistClick={() => setCurrentPage("products")}
          onLogoClick={() => handleNavigate("home")}
        />
      )}
      {!isAdminPage && (
        <NavBar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onSearch={handleSearch}
        />
      )}

      <div className="flex-1">{renderPage()}</div>

      {!isAdminPage && <Footer onNavigate={handleNavigate} />}

      {!isAdminPage && (
        <CartSheet
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          products={products}
          onRemoveItem={(id) => removeFromCartMutation.mutate(id)}
          onClearCart={() => clearCartMutation.mutate()}
          isLoading={cartLoading}
        />
      )}

      {!isAdminPage && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          isInWishlist={
            selectedProduct ? wishlistIds.includes(selectedProduct.id) : false
          }
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      {!isAdminPage && <WhatsAppButton />}

      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
