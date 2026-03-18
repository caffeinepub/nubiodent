import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Stethoscope, User } from "lucide-react";

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onCartClick: () => void;
  onWishlistClick: () => void;
  onLogoClick: () => void;
}

export function Header({
  cartCount,
  wishlistCount,
  onCartClick,
  onWishlistClick,
  onLogoClick,
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-border py-3 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          onClick={onLogoClick}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          data-ocid="header.link"
        >
          <div className="w-9 h-9 rounded-lg nav-gradient flex items-center justify-center">
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-display font-bold text-lg text-foreground leading-tight">
              Nubiodent
            </div>
            <div className="text-[10px] text-muted-foreground leading-none">
              Professional Dental Equipment
            </div>
          </div>
        </button>

        {/* Header Icons */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-0.5 h-auto py-1.5 px-3 text-muted-foreground hover:text-primary"
            data-ocid="header.link"
          >
            <User className="w-5 h-5" />
            <span className="text-[10px]">My Account</span>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-0.5 h-auto py-1.5 px-3 text-muted-foreground hover:text-primary relative"
            onClick={onWishlistClick}
            data-ocid="header.link"
          >
            <div className="relative">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-[9px] bg-primary text-primary-foreground rounded-full">
                  {wishlistCount}
                </Badge>
              )}
            </div>
            <span className="text-[10px]">Wishlist</span>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="flex flex-col items-center gap-0.5 h-auto py-1.5 px-3 text-muted-foreground hover:text-primary relative"
            onClick={onCartClick}
            data-ocid="header.open_modal_button"
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-[9px] bg-primary text-primary-foreground rounded-full">
                  {cartCount}
                </Badge>
              )}
            </div>
            <span className="text-[10px]">Cart</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
