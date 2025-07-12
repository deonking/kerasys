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
    <div className="group cursor-pointer bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        {product.discountPercentage > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded z-10">
            -{product.discountPercentage}%
          </div>
        )}
        <Link href={`/produto/${product.productId}`}>
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
        </Link>
      </div>
      
      <div className="p-3">
        <Link href={`/produto/${product.productId}`}>
          <h3 className="text-xs text-gray-700 mb-2 line-clamp-2 hover:text-black">
            {product.name}
          </h3>
        </Link>
        
        <div className="mb-2">
          {product.discountPercentage > 0 && (
            <div className="text-gray-400 line-through text-xs">
              R$ {product.originalPrice}
            </div>
          )}
          <div className="text-lg font-bold text-black">
            R$ {product.salePrice}
          </div>
        </div>
        
        {/* PIX Discount Card */}
        <div className="bg-green-50 border border-green-200 rounded p-2 mb-3">
          <div className="text-xs text-center">
            <div className="text-green-700 font-semibold">
              R$ {pixPrice}
            </div>
            <div className="text-green-600 text-[10px]">
              à vista no PIX
            </div>
          </div>
        </div>
        
        <div className="text-xs text-gray-600 mb-3 text-center">
          ou em até 12x de R$ {installmentPrice}
        </div>
        
        <Button
          className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xs py-2 h-8 rounded-sm"
          onClick={handleAddToCart}
        >
          COMPRAR
        </Button>
      </div>
    </div>
  );
}
