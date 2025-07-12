import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { ProductCard } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@shared/schema";

const categoryNames: Record<string, string> = {
  kits: "Kits e Combos",
  shampoo: "Shampoos",
  condicionador: "Condicionadores",
  tratamento: "Tratamentos Capilares",
};

export default function Category() {
  const [, params] = useRoute("/categoria/:category");
  const category = params?.category;

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", { category }],
    enabled: !!category,
  });

  if (!category) {
    return <div>Categoria não encontrada</div>;
  }

  const categoryName = categoryNames[category] || category;

  if (isLoading) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
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
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">{categoryName}</h1>
        <p className="text-muted-foreground">
          {products.length} produtos encontrados
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Nenhum produto encontrado
          </h2>
          <p className="text-muted-foreground">
            Não encontramos produtos nesta categoria no momento.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
