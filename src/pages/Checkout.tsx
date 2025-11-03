import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';

const Checkout = () => {
  const { items, getTotal, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');

  const subtotal = getTotal();
  const shipping = subtotal > 50 ? 0 : 5;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Order placed successfully!');
    clearCart();
    navigate('/');
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <div className="bg-card border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4">Customer Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" required placeholder="your@email.com" />
                  </div>
                </div>
              </div>

              {/* Billing Details */}
              <div className="bg-card border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4">Billing Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" required />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input id="address" required />
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" required />
                  </div>
                  <div>
                    <Label htmlFor="state">State / Region *</Label>
                    <Input id="state" required />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP / Postal Code *</Label>
                    <Input id="zip" required />
                  </div>
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Input id="country" required defaultValue="United States" />
                  </div>
                </div>
              </div>

              {/* Delivery Method */}
              <div className="bg-card border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4">Delivery Method</h3>
                <RadioGroup defaultValue="standard">
                  <div className="flex items-center space-x-2 p-3 border rounded-lg mb-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="flex-1 cursor-pointer">
                      <div className="flex justify-between">
                        <span>Free Shipping (5-7 days)</span>
                        <span className="font-medium">$0.00</span>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="flex-1 cursor-pointer">
                      <div className="flex justify-between">
                        <span>Express Shipping (2-3 days)</span>
                        <span className="font-medium">$15.00</span>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Payment Method */}
              <div className="bg-card border rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4">Payment Method</h3>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg mb-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="cursor-pointer">
                      Cash on Delivery
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="cursor-pointer">
                      PayPal
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border rounded-lg p-6 sticky top-24">
                <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between mb-6">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-lg text-primary">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
