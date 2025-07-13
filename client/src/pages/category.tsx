import { useQuery } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { ProductCard } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@shared/schema";

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface ProductsResponse {
  products: Product[];
  pagination: PaginationData;
}

const categoryNames: Record<string, string> = {
  kits: "Kits e Combos",
  "kits-promocionais": "Kits e Combos",
  shampoo: "Shampoos",
  condicionador: "Condicionadores",
  tratamento: "Tratamentos Capilares",
};

export default function Category() {
  const [, params] = useRoute("/categoria/:category");
  const [location, setLocation] = useLocation();
  const category = params?.category;
  
  // Get current page from URL params and state
  const [currentPage, setCurrentPage] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('page') || '1', 10);
  });

  // Update page when location changes
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageFromUrl = parseInt(urlParams.get('page') || '1', 10);
    setCurrentPage(pageFromUrl);
  }, [location]);

  const { data, isLoading } = useQuery<ProductsResponse>({
    queryKey: ["/api/products", category, currentPage],
    queryFn: async () => {
      const response = await fetch(`/api/products?category=${category}&page=${currentPage}&limit=12`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    },
    enabled: !!category,
  });

  const products = data?.products || [];
  const pagination = data?.pagination;

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
          {pagination?.totalProducts || 0} produtos encontrados
          {pagination && pagination.totalPages > 1 && (
            <span className="ml-2">
              (Página {pagination.currentPage} de {pagination.totalPages})
            </span>
          )}
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
      
      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center mt-12 space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const newPage = currentPage - 1;
              const newUrl = `/categoria/${category}?page=${newPage}`;
              setCurrentPage(newPage);
              setLocation(newUrl);
            }}
            disabled={!pagination.hasPreviousPage}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Anterior
          </Button>
          
          <div className="flex space-x-1">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  const newUrl = `/categoria/${category}?page=${page}`;
                  setCurrentPage(page);
                  setLocation(newUrl);
                }}
                className={page === currentPage ? "bg-black text-white" : ""}
              >
                {page}
              </Button>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const newPage = currentPage + 1;
              const newUrl = `/categoria/${category}?page=${newPage}`;
              setCurrentPage(newPage);
              setLocation(newUrl);
            }}
            disabled={!pagination.hasNextPage}
          >
            Próxima
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}
    </main>
  );
}
