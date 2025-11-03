import { Search, ShoppingCart, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/store/cartStore';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Header = () => {
  const itemCount = useCartStore((state) => state.getItemCount());
  const navigate = useNavigate();

  return (
    <header className="border-b sticky top-0 bg-background z-50">
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <p>100% Organic Vegetables</p>
          <div className="flex gap-4">
            <span>📞 +123 456 7890</span>
            <span>📧 support@foodzy.com</span>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
              <span className="text-2xl">🥬</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Foodzy</h1>
              <p className="text-xs text-muted-foreground">Organic Shop</p>
            </div>
          </Link>

          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search for products..."
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>My Account</DropdownMenuItem>
                <DropdownMenuItem>Orders</DropdownMenuItem>
                <DropdownMenuItem>Wishlist</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {itemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      <nav className="border-t">
        <div className="container mx-auto px-4">
          <ul className="flex gap-8 py-3 text-sm font-medium">
            <li>
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-primary transition-colors">
                Products
              </Link>
            </li>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="hover:text-primary transition-colors cursor-pointer">
                  Categories
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Fruits & Vegetables</DropdownMenuItem>
                  <DropdownMenuItem>Dairy & Eggs</DropdownMenuItem>
                  <DropdownMenuItem>Snacks & Beverages</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            <li>
              <Link to="#" className="hover:text-primary transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-primary transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-primary transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
