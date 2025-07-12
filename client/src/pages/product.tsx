import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { ShoppingCart, Star, Truck, Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import type { Product } from "@shared/schema";

export default function ProductPage() {
  const [, params] = useRoute("/produto/:id");
  const productId = params?.id;
  const { addToCart } = useCart();
  const { toast } = useToast();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["/api/products", productId],
    enabled: !!productId,
  });

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      await addToCart(product.productId);
      toast({
        title: "Produto adicionado",
        description: `${product.name} foi adicionado ao carrinho.`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o produto ao carrinho.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="w-full h-96 rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Produto não encontrado
          </h1>
          <Link href="/">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao início
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const pixPrice = (parseFloat(product.salePrice) * 0.9).toFixed(2);
  const installmentPrice = (parseFloat(product.salePrice) / 12).toFixed(2);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link href="/" className="text-black hover:text-gray-600">
          Início
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <span className="text-muted-foreground">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative">
          {product.discountPercentage > 0 && (
            <Badge className="absolute top-4 left-4 bg-destructive text-destructive-foreground z-10">
              -{product.discountPercentage}%
            </Badge>
          )}
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {product.name}
            </h1>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex">
              {Array(5).fill(0).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < 4 ? "text-yellow-500 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">(125 avaliações)</span>
          </div>

          {/* Price */}
          <div className="space-y-2">
            {product.discountPercentage > 0 && (
              <div className="text-muted-foreground line-through">
                R$ {product.originalPrice}
              </div>
            )}
            <div className="text-4xl font-bold text-black">
              R$ {product.salePrice}
            </div>
            <div className="space-y-1 text-sm">
              <div className="text-black font-semibold">
                À vista R$ {pixPrice} no PIX (10% off)
              </div>
              <div className="text-muted-foreground">
                ou em até 12x de R$ {installmentPrice} sem juros
              </div>
            </div>
          </div>

          {/* Volume */}
          {product.volume && (
            <div className="text-sm text-muted-foreground">
              Volume: {product.volume}
            </div>
          )}

          {/* Actions */}
          <div className="space-y-4">
            <Button
              size="lg"
              className="w-full text-lg py-3 bg-black hover:bg-gray-800 text-white"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Adicionar ao Carrinho
            </Button>
            
            <Button variant="outline" size="lg" className="w-full border-black text-black hover:bg-black hover:text-white">
              Comprar Agora
            </Button>
          </div>

          {/* Benefits */}
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-black" />
                <span className="text-sm">Frete grátis acima de R$ 199</span>
              </div>
              <Separator />
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-black" />
                <span className="text-sm">Garantia de 30 dias</span>
              </div>
              <Separator />
              <div className="flex items-center space-x-3">
                <Star className="h-5 w-5 text-black" />
                <span className="text-sm">Produto original e certificado</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Descrição do Produto
        </h2>
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
            <div className="mt-6">
              <h3 className="font-semibold text-foreground mb-2">Benefícios:</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Fórmula profissional de alta qualidade</li>
                <li>Ideal para todos os tipos de cabelo</li>
                <li>Resultados visíveis desde a primeira aplicação</li>
                <li>Livre de parabenos e sulfatos agressivos</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
