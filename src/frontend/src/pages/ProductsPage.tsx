import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import type { Product } from "../backend.d";
import { ProductCard } from "../components/products/ProductCard";
import { CATEGORIES, SAMPLE_PRODUCTS } from "../data/sampleProducts";

interface ProductsPageProps {
  products: Product[];
  wishlistIds: bigint[];
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  initialSearch?: string;
}

export function ProductsPage({
  products,
  wishlistIds,
  onViewDetails,
  onAddToCart,
  onToggleWishlist,
  initialSearch = "",
}: ProductsPageProps) {
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<
    "name" | "price-asc" | "price-desc" | "rating"
  >("name");

  const allProducts = products.length > 0 ? products : SAMPLE_PRODUCTS;

  const filtered = useMemo(() => {
    let result = allProducts;
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }
    switch (sortBy) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      default:
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }
    return result;
  }, [allProducts, selectedCategory, search, sortBy]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-56 flex-shrink-0">
          <div className="bg-white rounded-lg border border-border p-4 sticky top-4">
            <h3 className="font-display font-bold text-sm uppercase tracking-wide text-foreground mb-3 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-primary" /> Categories
            </h3>
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setSelectedCategory(null)}
                className={`w-full text-left text-sm px-2 py-1.5 rounded transition-colors ${
                  !selectedCategory
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-foreground hover:bg-muted"
                }`}
                data-ocid="products.tab"
              >
                All Categories
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat.name}
                  onClick={() =>
                    setSelectedCategory(
                      cat.name === selectedCategory ? null : cat.name,
                    )
                  }
                  className={`w-full text-left text-sm px-2 py-1.5 rounded transition-colors flex items-center justify-between ${
                    selectedCategory === cat.name
                      ? "bg-primary text-primary-foreground font-medium"
                      : "text-foreground hover:bg-muted"
                  }`}
                  data-ocid="products.tab"
                >
                  <span>{cat.name}</span>
                  <span className="text-[11px] opacity-70">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2">
              <h1 className="font-display font-bold text-xl text-foreground">
                {selectedCategory || "All Products"}
              </h1>
              <Badge variant="secondary" className="text-primary">
                {filtered.length}
              </Badge>
              {selectedCategory && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="pl-8 h-8 w-48 text-sm"
                  data-ocid="products.search_input"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="h-8 text-sm border border-input rounded-md px-2 bg-background text-foreground"
                data-ocid="products.select"
              >
                <option value="name">Sort: Name</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16" data-ocid="products.empty_state">
              <p className="text-muted-foreground">
                No products found matching your criteria.
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-3"
                onClick={() => {
                  setSearch("");
                  setSelectedCategory(null);
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((product, i) => (
                <motion.div
                  key={String(product.id)}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.3) }}
                >
                  <ProductCard
                    product={product}
                    index={i + 1}
                    isInWishlist={wishlistIds.includes(product.id)}
                    onViewDetails={onViewDetails}
                    onAddToCart={onAddToCart}
                    onToggleWishlist={onToggleWishlist}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
