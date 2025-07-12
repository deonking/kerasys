import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { CreditCard, QrCode, Receipt, Flame } from "lucide-react";
import type { Product } from "@shared/schema";

export default function Home() {
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: kits = [] } = useQuery<Product[]>({
    queryKey: ["/api/products", { category: "kits" }],
  });

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
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">COMPRA AGORA</h2>
            <p className="text-xl mb-8 opacity-90">
              Produtos profissionais para o seu cabelo
            </p>
            <Button variant="secondary" size="lg" className="text-lg px-8 py-4">
              Ver Mais Vendidos
            </Button>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Best Sellers */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Mais Vendidos</h2>
            <a href="#" className="text-primary hover:text-primary/80 font-medium">
              Ver todos
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Featured Product */}
        {featuredProduct && (
          <section className="mb-16">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <img
                    src={featuredProduct.imageUrl}
                    alt={featuredProduct.name}
                    className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">
                    {featuredProduct.name}
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {featuredProduct.description}
                  </p>
                  <div className="flex items-center space-x-4 mb-6">
                    <span className="text-3xl font-bold text-primary">
                      R$ {featuredProduct.salePrice}
                    </span>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      <Flame className="h-3 w-3 mr-1" />
                      Produto em destaque
                    </Badge>
                  </div>
                  <Button size="lg" className="text-lg px-8 py-3">
                    EU QUERO!
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Kits Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">
              Kits e Combos Promocionais
            </h2>
            <a href="#" className="text-primary hover:text-primary/80 font-medium">
              Ver todos
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {kits.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Payment Methods */}
        <section className="mb-16">
          <div className="bg-card rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
              Formas de Pagamento
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-primary/10 rounded-lg">
                <QrCode className="h-8 w-8 text-primary mx-auto mb-4" />
                <h4 className="font-bold text-foreground mb-2">PIX</h4>
                <p className="text-sm text-muted-foreground">
                  10% de desconto à vista
                </p>
              </div>
              <div className="text-center p-6 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <CreditCard className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <h4 className="font-bold text-foreground mb-2">Cartão de Crédito</h4>
                <p className="text-sm text-muted-foreground">
                  Em até 12x sem juros
                </p>
              </div>
              <div className="text-center p-6 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                <Receipt className="h-8 w-8 text-yellow-600 mx-auto mb-4" />
                <h4 className="font-bold text-foreground mb-2">Boleto</h4>
                <p className="text-sm text-muted-foreground">
                  5% de desconto à vista
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
