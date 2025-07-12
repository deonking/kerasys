import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { CreditCard, QrCode, Receipt, Flame } from "lucide-react";
import type { Product } from "@shared/schema";

export default function Home() {
  const { data: allProductsData, isLoading } = useQuery({
    queryKey: ["/api/products"],
    queryFn: async () => {
      const response = await fetch("/api/products?limit=100");
      return response.json();
    },
  });

  const { data: kitsData } = useQuery({
    queryKey: ["/api/products", "kits-promocionais"],
    queryFn: async () => {
      const response = await fetch("/api/products?category=kits-promocionais&limit=20");
      return response.json();
    },
  });

  const products = allProductsData?.products || [];
  const kits = kitsData?.products || [];

  const featuredProduct = products.find(p => p.productId === "featured-propolis");
  const bestSellers = products.slice(0, 8);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        {/* Hero Skeleton */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <Skeleton className="h-16 w-96 mx-auto mb-6" />
              <Skeleton className="h-6 w-64 mx-auto mb-8" />
              <Skeleton className="h-12 w-48 mx-auto" />
            </div>
          </div>
        </div>

        {/* Products Skeleton */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array(8).fill(0).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-0">
                  <Skeleton className="w-full h-64 rounded-t-lg" />
                  <div className="p-4 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link href="/categoria/mais-vendidos">
              <img 
                src="https://xn--kersys-kta.com/wp-content/uploads/2025/04/COMPRA-AGORA.png" 
                alt="Compra Agora" 
                className="mx-auto max-w-sm w-full hover:opacity-90 transition-opacity cursor-pointer"
              />
            </Link>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Best Sellers */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-black text-center">Mais vendidos</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Featured Product - Propolis */}
        {featuredProduct && (
          <section className="mb-16 bg-white">
            <div className="flex flex-col lg:flex-row items-center gap-8 p-8 border border-gray-200 rounded-lg">
              <div className="lg:w-1/3">
                <img
                  src={featuredProduct.imageUrl}
                  alt={featuredProduct.name}
                  className="w-full max-w-xs mx-auto"
                />
              </div>
              <div className="lg:w-2/3 text-center lg:text-left">
                <h2 className="text-2xl font-bold text-black mb-4">
                  Kerasys Propolis Energy Shampoo 1L
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  O <strong>Kerasys Própolis</strong> é um tratamento que combate a porosidade, criando uma película protetora sobre os fios danificados. Ele ajuda a recuperar o brilho, maciez e força dos cabelos, blindando completamente a fibra capilar contra sujeiras, fungos e bactérias.
                </p>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-black">
                    R$ {featuredProduct.salePrice}
                  </span>
                </div>
                <Link href={`/produto/${featuredProduct.productId}`}>
                  <Button 
                    size="lg" 
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-none font-medium"
                  >
                    eu quero!
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Kits Section */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-black text-center">Kits e combos promocionais</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {kits.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Category Sections */}
        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-black text-center">Shampoo</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {products.filter(p => p.category === 'shampoo').slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center mb-8">
            <img 
              src="https://xn--kersys-kta.com/wp-content/uploads/2025/04/COMPRA-AGORA-1-665x800.png" 
              alt="Compra Agora" 
              className="mx-auto max-w-xs"
            />
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-black text-center">Condicionador</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {products.filter(p => p.category === 'condicionador').slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
