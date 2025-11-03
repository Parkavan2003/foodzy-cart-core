import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { products } from '@/data/products';
import { ArrowRight, Truck, Leaf, RefreshCcw, Headphones } from 'lucide-react';

const Home = () => {
  const featuredProducts = products.slice(0, 4);
  const bestSellers = products.slice(4, 8);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-secondary/10 via-background to-primary/5 py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium mb-4">
                  100% Organic Vegetables
                </span>
                <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  The best way to
                  <br />
                  <span className="text-primary">stuff your wallet.</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Fresh organic produce delivered straight to your door.
                  <br />
                  Healthy choices for your family.
                </p>
                <div className="flex gap-4">
                  <Button size="lg" className="px-8">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&h=600&fit=crop"
                  alt="Fresh vegetables"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 border-y bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Truck className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">Free delivery</h3>
                <p className="text-sm text-muted-foreground">On orders over $50</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Leaf className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">100% Organic</h3>
                <p className="text-sm text-muted-foreground">Certified products</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <RefreshCcw className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">Easy returns</h3>
                <p className="text-sm text-muted-foreground">30-day guarantee</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Headphones className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="font-semibold mb-2">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">Always here to help</p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">Popular Products</h2>
              <p className="text-muted-foreground">
                Fresh picks from our most-loved organic vegetables
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Daily Best Sells */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Daily Best Sells</h2>
              <div className="flex gap-2">
                <Button variant="ghost">Featured</Button>
                <Button variant="ghost">Popular</Button>
                <Button variant="ghost">New added</Button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-20 bg-gradient-to-r from-secondary/20 to-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Stay home & get your daily needs from our shop
              </h2>
              <p className="text-muted-foreground mb-8">
                Start your daily shopping with Foodzy
              </p>
              <div className="flex gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-3 rounded-lg border bg-background"
                />
                <Button size="lg">Subscribe</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
