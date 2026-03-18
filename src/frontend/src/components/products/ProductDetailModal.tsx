import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, Heart, ShoppingCart, X, XCircle } from "lucide-react";
import type { Product } from "../../backend.d";
import { StarRating } from "./StarRating";

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  isInWishlist: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
}

export function ProductDetailModal({
  product,
  isOpen,
  isInWishlist,
  onClose,
  onAddToCart,
  onToggleWishlist,
}: ProductDetailModalProps) {
  if (!product) return null;

  const priceDisplay =
    product.price === 0
      ? "Contact for price"
      : `\u20B9${product.price.toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl" data-ocid="product.dialog">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-muted rounded-lg overflow-hidden aspect-square">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-3">
            <Badge variant="secondary" className="w-fit text-primary">
              {product.category}
            </Badge>

            <StarRating rating={product.rating} size="md" />

            <div className="flex items-center gap-2">
              {product.inStock ? (
                <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                  <CheckCircle className="w-4 h-4" /> In Stock
                </span>
              ) : (
                <span className="flex items-center gap-1 text-destructive text-sm font-medium">
                  <XCircle className="w-4 h-4" /> Out of Stock
                </span>
              )}
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed">
              {product.description}
            </p>

            <div className="mt-auto">
              <div
                className={`font-bold mb-4 ${
                  product.price === 0
                    ? "text-lg text-primary"
                    : "text-2xl text-foreground"
                }`}
              >
                {priceDisplay}
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  className="flex-1 bg-primary hover:bg-primary/90"
                  onClick={() => onAddToCart(product)}
                  disabled={!product.inStock}
                  data-ocid="product.primary_button"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => onToggleWishlist(product)}
                  className={isInWishlist ? "border-primary text-primary" : ""}
                  data-ocid="product.toggle"
                >
                  <Heart
                    className="w-4 h-4"
                    fill={isInWishlist ? "currentColor" : "none"}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1 hover:bg-muted transition-colors"
          data-ocid="product.close_button"
        >
          <X className="w-4 h-4" />
        </button>
      </DialogContent>
    </Dialog>
  );
}
