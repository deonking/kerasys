import { Search, ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import kerasysLogo from "@assets/image_1752358528146.png";

export function Header() {
  const { itemCount, toggleCart } = useCart();

  return (
    <>
      {/* Top Bar */}
      <div className="bg-black text-white text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex space-x-6">
              <span>CENTRAL DE ATENDIMENTO</span>
              <span>Entre/Cadastrar</span>
              <span>Onde está meu produto?</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>ATACADO</span>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-6 w-6 text-white hover:bg-white/10"
                onClick={toggleCart}
              >
                <ShoppingCart className="h-4 w-4" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                    {itemCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src={kerasysLogo}
                alt="Kerasys"
                className="h-12 w-auto"
              />
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Pesquisar produtos"
                  className="w-full pr-10 h-10 border-gray-300"
                />
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-6">
              <div className="hidden lg:flex flex-col text-xs text-gray-600">
                <span>Minha conta</span>
                <span className="font-semibold">Registrar/ Pedidos</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={toggleCart}
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
