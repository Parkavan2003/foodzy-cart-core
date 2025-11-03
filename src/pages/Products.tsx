import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Products = () => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = ['Vegetables', 'Fruits', 'Dairy', 'Snacks'];

  const filteredProducts = products.filter((product) => {
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    return matchesPrice && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-card border rounded-lg p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-6">Filters</h3>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Product Category</h4>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCategories([...selectedCategories, category]);
                          } else {
                            setSelectedCategories(selectedCategories.filter((c) => c !== category));
                          }
                        }}
                      />
                      <Label htmlFor={category} className="cursor-pointer">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Price Range</h4>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Product Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {['Organic', 'Fresh', 'Sale', 'New'].map((tag) => (
                    <Button key={tag} variant="outline" size="sm">
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>

              <Button className="w-full" onClick={() => {
                setPriceRange([0, 100]);
                setSelectedCategories([]);
              }}>
                Reset Filters
              </Button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} of {products.length} products
              </p>
              <Select defaultValue="default">
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default sorting</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products found. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
