import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import type { Product } from "../../backend.d";
import { StarRating } from "./StarRating";

interface ProductCardProps {
  product: Product;
  index: number;
  isInWishlist: boolean;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
}

export function ProductCard({
  product,
  index,
  isInWishlist,
  onViewDetails,
  onAddToCart,
  onToggleWishlist,
}: ProductCardProps) {
  const priceDisplay =
    product.price === 0
      ? "Contact for price"
      : `\u20B9${product.price.toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;

  return (
    <div
      className="bg-white rounded-lg border border-border shadow-card overflow-hidden group hover:shadow-md transition-shadow"
      data-ocid={`products.item.${index}`}
    >
      <div className="relative bg-muted aspect-square overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Badge
              variant="secondary"
              className="bg-white text-foreground font-semibold"
            >
              Out of Stock
            </Badge>
          </div>
        )}
        <button
          type="button"
          onClick={() => onToggleWishlist(product)}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-colors ${
            isInWishlist
              ? "bg-primary text-primary-foreground"
              : "bg-white/90 text-muted-foreground hover:text-primary hover:bg-white"
          }`}
          data-ocid={`products.toggle.${index}`}
        >
          <Heart
            className="w-4 h-4"
            fill={isInWishlist ? "currentColor" : "none"}
          />
        </button>
      </div>

      <div className="p-3">
        <div className="text-[11px] text-primary font-medium mb-1 uppercase tracking-wide">
          {product.category}
        </div>
        <h3 className="font-semibold text-sm text-foreground leading-snug mb-2 line-clamp-2">
          {product.name}
        </h3>
        <StarRating rating={product.rating} />
        <div className="mt-2 mb-3">
          <span
            className={`font-bold ${
              product.price === 0
                ? "text-sm text-primary"
                : "text-lg text-foreground"
            }`}
          >
            {priceDisplay}
          </span>
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="flex-1 text-xs h-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() => onViewDetails(product)}
            data-ocid={`products.secondary_button.${index}`}
          >
            <Eye className="w-3.5 h-3.5 mr-1" />
            Details
          </Button>
          <Button
            type="button"
            size="sm"
            className="flex-1 text-xs h-8 bg-primary hover:bg-primary/90"
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            data-ocid={`products.primary_button.${index}`}
          >
            <ShoppingCart className="w-3.5 h-3.5 mr-1" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
