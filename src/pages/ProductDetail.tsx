import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/cartStore';
import { products } from '@/data/products';
import { Heart, Minus, Plus, ShoppingCart, Star, Truck } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  if (!product) {
    navigate('/products');
    return null;
  }

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast.success(`${quantity} ${product.name} added to cart`);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="relative">
            {discount > 0 && (
              <Badge className="absolute top-4 left-4 bg-primary z-10">
                Sale {discount}%
              </Badge>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-square object-cover rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < product.rating!
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">4 Review</span>
                </div>
              )}
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">Brand:</span>
                <span className="text-muted-foreground">Farmacy</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">Weight:</span>
                <span className="text-muted-foreground">{product.weight}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">Stock:</span>
                <Badge variant={product.stock > 0 ? 'default' : 'destructive'}>
                  {product.stock > 0 ? `${product.stock} In Stock` : 'Out of Stock'}
                </Badge>
              </div>
            </div>

            <p className="text-muted-foreground mb-6">
              {product.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fresh organic vegetables picked at their peak, delivering maximum flavor and nutrition.'}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>

              <Button size="lg" variant="outline">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Truck className="h-5 w-5" />
              <span>Free delivery on orders over $50</span>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="information">Information</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-6">
            <h3 className="font-bold text-lg mb-4">Product Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed sem vel ex congue venenatis. 
              Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
              Vivamus tincidunt metus et augue finibus, in bibendum sapien tincidunt.
            </p>
          </TabsContent>
          <TabsContent value="information" className="py-6">
            <h3 className="font-bold text-lg mb-4">Packaging & Delivery</h3>
            <div className="space-y-2 text-muted-foreground">
              <p><strong>Weight:</strong> {product.weight}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Stock:</strong> {product.stock} units</p>
              <p><strong>Storage:</strong> Keep refrigerated</p>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-6">
            <h3 className="font-bold text-lg mb-4">Customer Reviews</h3>
            <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
