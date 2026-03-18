import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Loader2, ShoppingCart, Trash2 } from "lucide-react";
import type { CartItem, Product } from "../backend.d";

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  products: Product[];
  onRemoveItem: (productId: bigint) => void;
  onClearCart: () => void;
  isLoading?: boolean;
}

export function CartSheet({
  isOpen,
  onClose,
  cartItems,
  products,
  onRemoveItem,
  onClearCart,
  isLoading,
}: CartSheetProps) {
  const getProduct = (productId: bigint) =>
    products.find((p) => p.id === productId);

  const total = cartItems.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return sum + (product ? product.price * Number(item.quantity) : 0);
  }, 0);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md" data-ocid="cart.sheet">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            Shopping Cart
            {cartItems.length > 0 && (
              <span className="text-sm font-normal text-muted-foreground">
                ({cartItems.length} items)
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {isLoading ? (
          <div
            className="flex items-center justify-center py-20"
            data-ocid="cart.loading_state"
          >
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : cartItems.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-20 text-center"
            data-ocid="cart.empty_state"
          >
            <ShoppingCart className="w-12 h-12 text-muted-foreground mb-3" />
            <p className="text-muted-foreground">Your cart is empty</p>
            <p className="text-sm text-muted-foreground/70">
              Add products to get started
            </p>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {cartItems.map((item, idx) => {
                const product = getProduct(item.productId);
                if (!product) return null;
                return (
                  <div
                    key={String(item.productId)}
                    className="flex gap-3 p-2 rounded-lg border border-border"
                    data-ocid={`cart.item.${idx + 1}`}
                  >
                    <div className="w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground line-clamp-1">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {product.category}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm font-bold text-foreground">
                          $
                          {product.price.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Qty: {String(item.quantity)}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.productId)}
                      className="p-1 rounded hover:bg-muted text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                      data-ocid={`cart.delete_button.${idx + 1}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-xl font-bold text-primary">
                  ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <Button
                type="button"
                className="w-full bg-primary hover:bg-primary/90 mb-2"
                data-ocid="cart.primary_button"
              >
                Proceed to Checkout
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full text-destructive hover:text-destructive"
                onClick={onClearCart}
                data-ocid="cart.delete_button"
              >
                Clear Cart
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
