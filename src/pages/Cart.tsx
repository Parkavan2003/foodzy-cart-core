import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const Cart = () => {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();
  const navigate = useNavigate();

  const subtotal = getTotal();
  const shipping = subtotal > 50 ? 0 : 5;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added anything to your cart yet
            </p>
            <Button onClick={() => navigate('/products')}>
              Continue Shopping
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-card border rounded-lg overflow-hidden">
              {items.map((item) => (
                <div key={item.id} className="p-6 border-b last:border-b-0">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <div className="flex justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.category}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-primary">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border rounded-lg p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Free shipping on orders over $50
                  </p>
                )}
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between mb-6">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-lg text-primary">
                  ${total.toFixed(2)}
                </span>
              </div>

              <Button 
                className="w-full mb-3" 
                size="lg"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/products')}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
