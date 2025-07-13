import { useState } from "react";
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
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await addToCart(product.id);
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
        <Link href={`/produto/${product.id}`}>
          {imageError ? (
            <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
              <div className="text-center p-4">
                <div className="text-purple-600 font-bold text-lg mb-2">Kerasys</div>
                <div className="text-gray-600 text-sm">{product.volume}</div>
                <div className="text-xs text-gray-400 mt-2">Imagem indisponível</div>
              </div>
            </div>
          ) : (
            <img
              src={`/api/image-proxy?url=${encodeURIComponent(product.imageUrl)}`}
              alt={product.name}
              className="w-full h-48 object-contain bg-white p-2"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          )}
        </Link>
      </div>
      
      <div className="p-3">
        <Link href={`/produto/${product.id}`}>
          <h3 className="text-xs text-gray-700 mb-2 line-clamp-2 hover:text-black">
            {product.name}
          </h3>
        </Link>
        
        <div className="mb-2">
          {product.discountPercentage > 0 && (
            <div className="text-gray-400 line-through text-sm">
              R${product.originalPrice}
            </div>
          )}
          <div className="text-lg font-bold text-black">
            R${product.salePrice}
          </div>
        </div>
        
        <div className="text-xs text-gray-600 mb-1">
          <span className="font-medium">A vista</span> <span className="text-green-600 font-bold">R${pixPrice}</span> <span className="text-gray-500">no Pix</span>
        </div>
        
        <div className="text-xs text-gray-600 mb-3">
          Em até 12x de R${installmentPrice}
        </div>
        
        <Button
          className="w-full bg-black hover:bg-gray-800 text-white text-sm py-2 rounded-md transition-colors"
          onClick={handleAddToCart}
        >
          Comprar
        </Button>
      </div>
    </div>
  );
}
