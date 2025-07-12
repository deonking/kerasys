import { Link, useLocation } from "wouter";

const categories = [
  { name: "SHAMPOO", href: "/categoria/shampoo" },
  { name: "CONDICIONADOR", href: "/categoria/condicionador" },
  { name: "TRATAMENTO", href: "/categoria/tratamento" },
  { name: "KITS PROMOCIONAIS", href: "/categoria/kits-promocionais" },
];

export function Navigation() {
  const [location] = useLocation();

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-14">
          <div className="flex space-x-16">
            {categories.map((category) => {
              const isActive = location === category.href;
              return (
                <Link
                  key={category.href}
                  href={category.href}
                  className={`text-sm font-semibold tracking-wide transition-colors uppercase ${
                    isActive
                      ? "text-black border-b-2 border-black pb-4"
                      : "text-gray-600 hover:text-black pb-4"
                  }`}
                >
                  {category.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
