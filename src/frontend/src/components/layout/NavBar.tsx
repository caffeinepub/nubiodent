import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

interface NavBarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onSearch: (query: string) => void;
}

const NAV_ITEMS = [
  { label: "Home", page: "home" },
  { label: "Products", page: "products" },
  { label: "Categories", page: "categories" },
  { label: "Services", page: "services" },
  { label: "About Us", page: "about" },
  { label: "Contact", page: "contact" },
];

export function NavBar({ currentPage, onNavigate, onSearch }: NavBarProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
    if (searchValue.trim()) {
      onNavigate("products");
    }
  };

  return (
    <nav className="nav-gradient">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-12">
        <div className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              type="button"
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                currentPage === item.page
                  ? "bg-white/20 text-white"
                  : "text-white/90 hover:bg-white/10 hover:text-white"
              }`}
              data-ocid="nav.link"
            >
              {item.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSearch} className="flex items-center">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search products..."
              className="pl-8 h-8 w-56 bg-white/95 border-0 text-sm focus-visible:ring-white/50"
              data-ocid="nav.search_input"
            />
          </div>
        </form>
      </div>
    </nav>
  );
}
