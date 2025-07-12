import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/contexts/cart-context";
import { Header } from "@/components/header";
import { Navigation } from "@/components/navigation";
import { CartSidebar } from "@/components/cart-sidebar";
import { Footer } from "@/components/footer";
import Home from "@/pages/home";
import Category from "@/pages/category";
import ProductPage from "@/pages/product";
import NotFound from "@/pages/not-found";
import CentralDeAjuda from "@/pages/central-de-ajuda";
import PoliticaDeTroca from "@/pages/politica-de-troca";
import FreteEEntrega from "@/pages/frete-e-entrega";
import Contato from "@/pages/contato";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/categoria/:category" component={Category} />
      <Route path="/produto/:id" component={ProductPage} />
      <Route path="/central-de-ajuda" component={CentralDeAjuda} />
      <Route path="/politica-de-troca" component={PoliticaDeTroca} />
      <Route path="/frete-e-entrega" component={FreteEEntrega} />
      <Route path="/contato" component={Contato} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <Navigation />
            <div className="flex-1">
              <Router />
            </div>
            <Footer />
            <CartSidebar />
          </div>
          <Toaster />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
