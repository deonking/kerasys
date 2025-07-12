import { Link, useLocation } from "wouter";
import { Truck } from "lucide-react";

const categories = [
  { name: "Mais Vendidos", href: "/" },
  { name: "Kits", href: "/categoria/kits" },
  { name: "Shampoo", href: "/categoria/shampoo" },
  { name: "Condicionador", href: "/categoria/condicionador" },
  { name: "Tratamento", href: "/categoria/tratamento" },
];

export function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          <div className="flex space-x-8">
            {categories.map((category) => {
              const isActive = location === category.href;
              return (
                <Link
                  key={category.href}
                  href={category.href}
                  className={`pb-3 transition-colors ${
                    isActive
                      ? "text-primary font-medium border-b-2 border-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {category.name}
                </Link>
              );
            })}
          </div>
          <div className="hidden md:flex items-center text-sm text-muted-foreground">
            <Truck className="h-4 w-4 mr-2" />
            Frete grátis acima de R$ 199
          </div>
        </div>
      </div>
    </nav>
  );
}
