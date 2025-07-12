import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
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

  const pixPrice = (parseFloat(product.salePrice) * 0.9).toFixed(2);
  const installmentPrice = (parseFloat(product.salePrice) / 12).toFixed(2);

  return (
    <Link href={`/produto/${product.productId}`}>
      <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          <div className="relative overflow-hidden rounded-t-lg">
            {product.discountPercentage > 0 && (
              <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground z-10">
                -{product.discountPercentage}%
              </Badge>
            )}
            {product.category === "kits" && (
              <Badge className="absolute top-3 right-3 bg-blue-500 text-white z-10">
                KIT
              </Badge>
            )}
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
              {product.name}
            </h3>
            
            <div className="flex items-center space-x-2 mb-3">
              {product.discountPercentage > 0 && (
                <span className="text-muted-foreground line-through text-sm">
                  R$ {product.originalPrice}
                </span>
              )}
              <span className="text-2xl font-bold text-primary">
                R$ {product.salePrice}
              </span>
            </div>
            
            <div className="text-sm text-muted-foreground mb-4">
              <div>
                À vista{" "}
                <span className="font-semibold text-primary">
                  R$ {pixPrice}
                </span>{" "}
                no Pix
              </div>
              <div>
                Em até 12x de{" "}
                <span className="font-semibold">R$ {installmentPrice}</span>
              </div>
            </div>
            
            <Button
              className="w-full"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Comprar
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
