import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { ShoppingCart, Star, Truck, Shield, ArrowLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import type { Product } from "@shared/schema";

export default function ProductPage() {
  const [, params] = useRoute("/produto/:id");
  const productId = params?.id;
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [imageError, setImageError] = useState(false);

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${productId}`],
    enabled: !!productId,
  });

  const handleAddToCart = async () => {
    if (!product) return;
    
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
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative">
          {product.discountPercentage > 0 && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-sm font-bold rounded z-10">
              -{product.discountPercentage}%
            </div>
          )}
          {imageError ? (
            <div className="w-full max-w-lg mx-auto h-96 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center rounded-lg">
              <div className="text-center p-8">
                <div className="text-purple-600 font-bold text-2xl mb-4">Kerasys</div>
                <div className="text-gray-600 text-lg">{product.volume}</div>
              </div>
            </div>
          ) : (
            <img
              src={`/api/image-proxy?url=${encodeURIComponent(product.imageUrl)}`}
              alt={product.name}
              className="w-full max-w-lg mx-auto rounded-lg object-contain bg-white p-4 h-96"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Badge */}
          <div className="flex items-center gap-2">
            <Badge className="bg-orange-500 text-white">Mais Vendido</Badge>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900">
            {product.name}
          </h1>

          {/* Price */}
          <div className="space-y-2">
            {product.discountPercentage > 0 && (
              <div className="text-gray-400 line-through text-lg">
                R${product.originalPrice}
              </div>
            )}
            <div className="text-4xl font-bold text-gray-900">
              R${product.salePrice}
            </div>
            <div className="space-y-1 text-sm">
              <div className="text-gray-700">
                <span className="font-medium">A vista</span> <span className="text-green-600 font-bold">R${pixPrice}</span> <span className="text-gray-500">no Pix</span>
              </div>
              <div className="text-gray-600">
                Em até 12x de R${installmentPrice}
              </div>
            </div>
          </div>

          {/* Quantity and Buy Button */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Quantidade</span>
              <div className="flex items-center border rounded">
                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">-</button>
                <span className="px-4 py-1 border-x">1</span>
                <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">+</button>
              </div>
            </div>
            
            <Button
              size="lg"
              className="w-full bg-black hover:bg-gray-800 text-white py-3"
              onClick={handleAddToCart}
            >
              Comprar
            </Button>
          </div>

          {/* Shipping and Guarantees */}
          <div className="space-y-4 pt-6 border-t">
            <div className="flex items-center gap-3">
              <span className="text-green-600 font-semibold">Frete Grátis</span>
              <span className="text-gray-600">• Disponível</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Enviado pelos</span>
              <span className="font-semibold">Correios</span>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Frete grátis. Você tem 7 dias a partir da data de recebimento.</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Compra Garantida, receba o produto que está esperando ou devolvemos o dinheiro.</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Mais Vendido, entre os produtos da coleção.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="description">Descrição</TabsTrigger>
            <TabsTrigger value="details">Detalhes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
              
              <div className="space-y-4 text-gray-700">
                <p><strong>Descrição</strong></p>
                <p>{product.description}</p>
                
                {product.category === 'kits-promocionais' && (
                  <>
                    <p><strong>Contém:</strong></p>
                    <p>01 Shampoo {product.volume}</p>
                    <p>01 Condicionador {product.volume}</p>
                    
                    <p><strong>Sugestão de uso</strong></p>
                    <p>Aplique o shampoo sobre o couro cabeludo. Massageie com as pontas dos dedos e gentilmente o cabelo para formar espuma. Em seguida enxágue. Repita o processo se for necessário. Retire o excesso da água; Aplique o tratamento sobre os fios. Massageie com as mãos e gentilmente vá enluvando o cabelo; Em seguida enxágue; Aplique o condicionador, em seguida enxágue.</p>
                    
                    <p><strong>Ação/Resultado:</strong></p>
                    <p>Nutre as fibras capilares, deixando-as maleáveis, alinhadas e disciplinadas. Seu cabelo fica limpo, desembaraçado, hidratado e nutrido. Com as fibras capilares mais fortes e macios.</p>
                  </>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Especificações</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Categoria:</span>
                    <span className="capitalize">{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Volume:</span>
                    <span>{product.volume}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Código:</span>
                    <span>{product.productId}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-3">Benefícios</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Fórmula profissional de alta qualidade</li>
                  <li>• Ideal para todos os tipos de cabelo</li>
                  <li>• Resultados visíveis desde a primeira aplicação</li>
                  <li>• Livre de parabenos e sulfatos agressivos</li>
                  <li>• Testado dermatologicamente</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
