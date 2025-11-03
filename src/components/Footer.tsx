import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-2xl">🥬</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">Foodzy</h3>
                <p className="text-xs text-muted-foreground">Organic Shop</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Fresh & Organic grocery products delivered to your doorstep daily.
            </p>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2">
                📞 <span>(219) 555-0114</span>
              </p>
              <p className="flex items-center gap-2">
                ✉️ <span>support@foodzy.com</span>
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Delivery Information</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Category</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Fruits & Vegetables</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Dairy & Eggs</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Snacks & Beverages</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Chicken & Meat</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Fresh Fish</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Subscribe Our Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get updates on special offers and fresh arrivals
            </p>
            <div className="flex gap-2 mb-4">
              <Input placeholder="Your email address" className="flex-1" />
              <Button>Subscribe</Button>
            </div>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Foodzy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
