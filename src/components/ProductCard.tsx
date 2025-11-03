import { ShoppingCart, Heart, Eye, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/store/cartStore';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div 
      className="group bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative overflow-hidden aspect-square bg-muted">
        {discount > 0 && (
          <Badge className="absolute top-2 left-2 bg-primary z-10">
            Sale {discount}%
          </Badge>
        )}
        
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              toast.success('Added to wishlist');
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product.id}`);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            className="rounded-full"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
        <h3 className="font-medium mb-2 line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
        
        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < product.rating!
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <Button 
          className="w-full" 
          size="sm"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};
