import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import session from "express-session";
import MemoryStore from "memorystore";

const MemoryStoreSession = MemoryStore(session);

export async function registerRoutes(app: Express): Promise<Server> {
  // Session configuration
  app.use(session({
    store: new MemoryStoreSession({
      checkPeriod: 86400000 // prune expired entries every 24h
    }),
    secret: process.env.SESSION_SECRET || 'kerasys-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 86400000 } // 24 hours
  }));

  // Products routes
  app.get("/api/products", async (req, res) => {
    try {
      const { category, page = '1', limit = '12' } = req.query;
      let products;
      
      if (category && typeof category === 'string') {
        products = await storage.getProductsByCategory(category);
      } else {
        products = await storage.getAllProducts();
      }
      
      // Implement pagination
      const pageNum = parseInt(page as string, 10);
      const limitNum = parseInt(limit as string, 10);
      const startIndex = (pageNum - 1) * limitNum;
      const endIndex = startIndex + limitNum;
      
      const paginatedProducts = products.slice(startIndex, endIndex);
      const totalPages = Math.ceil(products.length / limitNum);
      
      res.json({
        products: paginatedProducts,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalProducts: products.length,
          hasNextPage: pageNum < totalPages,
          hasPreviousPage: pageNum > 1
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar produtos" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar produto" });
    }
  });

  // Cart routes
  app.get("/api/cart", async (req, res) => {
    try {
      const sessionId = req.session.id;
      const cartItems = await storage.getCartItems(sessionId);
      res.json(cartItems);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar carrinho" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const sessionId = req.session.id;
      const { productId, quantity = 1 } = req.body;
      
      if (!productId) {
        return res.status(400).json({ message: "ID do produto é obrigatório" });
      }
      
      const product = await storage.getProductById(productId);
      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
      
      const cartItem = await storage.addToCart(sessionId, productId, quantity);
      res.json(cartItem);
    } catch (error) {
      res.status(500).json({ message: "Erro ao adicionar ao carrinho" });
    }
  });

  app.put("/api/cart/:productId", async (req, res) => {
    try {
      const sessionId = req.session.id;
      const { productId } = req.params;
      const { quantity } = req.body;
      
      if (!quantity || quantity < 0) {
        return res.status(400).json({ message: "Quantidade deve ser maior que zero" });
      }
      
      const cartItem = await storage.updateCartItemQuantity(sessionId, productId, quantity);
      res.json(cartItem);
    } catch (error) {
      res.status(500).json({ message: "Erro ao atualizar carrinho" });
    }
  });

  app.delete("/api/cart/:productId", async (req, res) => {
    try {
      const sessionId = req.session.id;
      const { productId } = req.params;
      
      const removed = await storage.removeFromCart(sessionId, productId);
      if (!removed) {
        return res.status(404).json({ message: "Item não encontrado no carrinho" });
      }
      
      res.json({ message: "Item removido do carrinho" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao remover do carrinho" });
    }
  });

  app.delete("/api/cart", async (req, res) => {
    try {
      const sessionId = req.session.id;
      await storage.clearCart(sessionId);
      res.json({ message: "Carrinho limpo" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao limpar carrinho" });
    }
  });

  // Image proxy route to handle CORS issues
  app.get("/api/image-proxy", async (req, res) => {
    try {
      const { url } = req.query;
      if (!url || typeof url !== 'string') {
        return res.status(400).json({ message: "URL da imagem é obrigatória" });
      }

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
          'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
          'Referer': 'https://elausa.com.br/',
          'Cache-Control': 'no-cache'
        }
      });

      if (!response.ok) {
        console.log(`Image fetch failed: ${response.status} ${response.statusText} for ${url}`);
        return res.status(404).json({ message: "Imagem não encontrada" });
      }

      const buffer = await response.arrayBuffer();
      const contentType = response.headers.get('content-type') || 'image/jpeg';
      
      res.set({
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'GET'
      });
      
      res.send(Buffer.from(buffer));
    } catch (error) {
      console.error('Image proxy error:', error);
      res.status(500).json({ message: "Erro ao carregar imagem" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
