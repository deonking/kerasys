import { Facebook, Instagram, Youtube, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">KERASYS</h3>
            <p className="text-gray-300 mb-4">
              Produtos profissionais para cuidados capilares
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Categorias</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/categoria/shampoo" className="hover:text-white transition-colors">
                  Shampoo
                </Link>
              </li>
              <li>
                <Link href="/categoria/condicionador" className="hover:text-white transition-colors">
                  Condicionador
                </Link>
              </li>
              <li>
                <Link href="/categoria/tratamento" className="hover:text-white transition-colors">
                  Máscaras
                </Link>
              </li>
              <li>
                <Link href="/categoria/kits-promocionais" className="hover:text-white transition-colors">
                  Kits
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Atendimento</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/central-de-ajuda" className="hover:text-white transition-colors">
                  Central de Ajuda
                </Link>
              </li>
              <li>
                <Link href="/politica-de-troca" className="hover:text-white transition-colors">
                  Política de Troca
                </Link>
              </li>
              <li>
                <Link href="/frete-e-entrega" className="hover:text-white transition-colors">
                  Frete e Entrega
                </Link>
              </li>
              <li>
                <Link href="/contato" className="hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <p className="text-gray-300 mb-4">Receba ofertas exclusivas</p>
            <div className="flex">
              <Input
                type="email"
                placeholder="Seu e-mail"
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button className="ml-2" size="icon">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Kerasys Brasil. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
