import { products, cartItems, type Product, type InsertProduct, type CartItem, type InsertCartItem, type CartItemWithProduct } from "@shared/schema";

export interface IStorage {
  // Products
  getAllProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Cart
  getCartItems(sessionId: string): Promise<CartItemWithProduct[]>;
  addToCart(sessionId: string, productId: string, quantity: number): Promise<CartItem>;
  updateCartItemQuantity(sessionId: string, productId: string, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(sessionId: string, productId: string): Promise<boolean>;
  clearCart(sessionId: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private products: Map<string, Product> = new Map();
  private cartItems: Map<string, CartItem[]> = new Map();
  private currentProductId: number = 1;
  private currentCartId: number = 1;

  constructor() {
    this.seedProducts();
  }

  private seedProducts() {
    const productsData: InsertProduct[] = [
      // Kit Promocional
      {
        name: "Kerasys - Keratin Bond Duo Silky Moisture Shampoo 600ml + Tratamento Volume 600ml",
        description: "A dupla Silky Moisture Shampoo e Volume Treatment é perfeita para quem busca cabelos com toque sedoso, brilho radiante e volume natural. Enquanto o shampoo hidrata profundamente e combate o ressecamento, o tratamento condicionante devolve corpo e leveza aos fios, sem pesar. Com fórmula enriquecida com ceramidas, manteiga de karité e ácido cítrico, o Silky Moisture repõe a umidade dos fios ressecados, melhora a textura e combate a porosidade. O Volume Treatment hidrata, condiciona e promove volume natural com leveza, com proteína de trigo, colágeno e biotina.",
        category: "kits-promocionais",
        originalPrice: "359.80",
        salePrice: "169.90",
        discountPercentage: 53,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/k/b/kb_kit_sil_vol.png",
        volume: "Kit 600ml + 600ml",
        productId: "6134466",
      },
      {
        name: "Kerasys - Keratin Bond Duo Deep Repair Shampoo 600ml + Tratamento Purifying 600ml",
        description: "Kit profissional com shampoo reparador e tratamento purificante para cabelos danificados. Fórmula com tecnologia Keratin Bond que reconstrói a estrutura capilar, promovendo reparação profunda e purificação dos fios. O shampoo limpa profundamente enquanto o tratamento purificante remove impurezas e equilibra o couro cabeludo.",
        category: "kits-promocionais",
        originalPrice: "389.80",
        salePrice: "169.90",
        discountPercentage: 56,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/k/b/kb_kit_rep_pur.png",
        volume: "Kit 600ml + 600ml",
        productId: "6134467",
      },
      {
        name: "Kerasys - Deep Cleansing Shampoo Refil 500ml + Bed Head - Clean Up Peppermint Conditioner 200ml",
        description: "Kit com shampoo de limpeza profunda e condicionador com menta. O Deep Cleansing Shampoo remove resíduos e impurezas do couro cabeludo, enquanto o condicionador com menta proporciona sensação refrescante e hidratação. Ideal para cabelos oleosos que necessitam de limpeza profunda e frescor.",
        category: "kits-promocionais",
        originalPrice: "249.80",
        salePrice: "69.90",
        discountPercentage: 72,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/k/i/kit_deep_cleansing_up.png",
        volume: "Kit 500ml + 200ml",
        productId: "6134468",
      },
      {
        name: "Kerasys Perfume Lovely Romantic Shampoo + Condicionador 600ml (Grátis SENKA - Perfect Whip A 50g)",
        description: "Kit completo com shampoo e condicionador perfumado da linha Lovely Romantic. Fragrância sofisticada e duradoura com notas florais e amadeiradas. Fórmula suave que limpa e condiciona os fios, deixando-os perfumados e sedosos. Inclui brinde especial SENKA Perfect Whip A 50g.",
        category: "kits-promocionais",
        originalPrice: "269.80",
        salePrice: "199.00",
        discountPercentage: 26,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/l/o/lovely_senka.png",
        volume: "Kit 600ml cada",
        productId: "6134469",
      },
      {
        name: "Kerasys Perfume Lovely Romantic Shampoo 400ml + Condicionador 400ml",
        description: "Dupla perfumada com shampoo e condicionador da linha Lovely Romantic. Fragrância exclusiva que permanece nos fios ao longo do dia. Fórmula balanceada que limpa suavemente enquanto condiciona e perfuma os cabelos. Ideal para quem busca cabelos perfumados e bem cuidados.",
        category: "kits-promocionais",
        originalPrice: "209.80",
        salePrice: "169.90",
        discountPercentage: 19,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/s/h/shampoo_e_cond_lovely_romantic_400ml.png",
        volume: "Kit 400ml cada",
        productId: "6134470",
      },

      // Condicionadores
      {
        name: "Kerasys Repairing Argan Oil Condicionador 180ml",
        description: "O Kerasys Hair Clinic Repairing Conditioner - Argan Oil é um condicionador de reparação intensa, desenvolvido para cabelos danificados que precisam de nutrição profunda, fortalecimento e um toque sedoso duradouro. Enriquecido com o Protein Care System, combina o poder do Óleo de Argan com um complexo de 17 aminoácidos essenciais e proteínas hidrolisadas, promovendo hidratação intensa, alinhamento dos fios e controle do frizz. Fragrância sofisticada com notas de cassis, mandarina, bergamota, rosa, jasmim, íris, baunilha, almíscar branco e madeira de cedro.",
        category: "condicionador",
        originalPrice: "69.90",
        salePrice: "37.77",
        discountPercentage: 46,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/r/e/repairing_cd.jpg",
        volume: "180ml",
        productId: "6066191",
      },
      {
        name: "Kerasys Coconut Oil Condicionador 1L (Made in Korea) - Nova Embalagem!",
        description: "Condicionador premium com óleo de coco para cabelos secos, danificados e sem brilho. Fórmula enriquecida com óleo de coco natural que penetra profundamente na fibra capilar, proporcionando hidratação intensa e brilho duradouro. Rico em ácidos graxos essenciais que nutrem e restauram a saúde dos fios.",
        category: "condicionador",
        originalPrice: "179.90",
        salePrice: "97.77",
        discountPercentage: 46,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/c/o/coconut_oil_conditioner_new_package.jpg",
        volume: "1L",
        productId: "6066192",
      },
      {
        name: "Kerasys Natural Recipe - Tea Tree Oil - Condicionador 1L (Made in Korea) - Nova Embalagem",
        description: "Condicionador com Tea Tree Oil para controle da oleosidade e frescor do couro cabeludo. Fórmula natural com óleo de melaleuca que possui propriedades antissépticas e purificantes, ideal para cabelos oleosos e couro cabeludo sensível. Proporciona limpeza profunda, controle da oleosidade e sensação refrescante.",
        category: "condicionador",
        originalPrice: "199.90",
        salePrice: "157.77",
        discountPercentage: 21,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/t/e/tea_tree_cd_1l.png",
        volume: "1L",
        productId: "6066193",
      },

      // Shampoos
      {
        name: "Kerasys - Oriental Premium Red Camellia Oil EX - Shampoo 600ml (Nova Fórmula)",
        description: "O Kerasys Oriental Premium Shampoo é inspirado na sabedoria e nas tradições asiáticas, proporcionando uma experiência luxuosa de cuidado e beleza. Com Sistema de Cuidados Orientais que inclui super nutrição com óleo de camélia, fortalecimento capilar com proteínas vegetais e brilho intenso com óleos de amêndoas, argan e jojoba. Contém extratos orientais como crisântemo, angélica, cnidium officinale, camélia japonica, romã, bletilla striata e ginseng panax.",
        category: "shampoo",
        originalPrice: "139.90",
        salePrice: "109.90",
        discountPercentage: 21,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/o/r/oriental_p_sh_600.png",
        volume: "600ml",
        productId: "6130849",
      },

      // Tratamentos
      {
        name: "Kerasys Advanced Moisture Ampoule 10x – Ceramide Ampoule Serum 80ml",
        description: "Sérum capilar 10x mais concentrado para todos os tipos de cabelos. Extremamente versátil, pode ser usado como pré-shampoo, leave-in e junto com máscara de tratamento para potencializar os resultados. Contém tecnologia de ampola de ceramidas (Ceramide 10x), enriquecido com 10 tipos de proteínas hidrolisadas (seda, arroz, queratina, leite, feijão, elastina, cevada, colágeno, semente de algodão, trigo) e ácido hialurônico. É um soro fluído e nutritivo que torna o cabelo macio assim que aplicado, deixando os fios brilhantes e saudáveis.",
        category: "tratamento",
        originalPrice: "169.90",
        salePrice: "99.90",
        discountPercentage: 41,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/m/o/moisture_6.jpg",
        volume: "80ml",
        productId: "5010755",
      },
    ];

    productsData.forEach((product) => {
      const fullProduct: Product = {
        id: this.currentProductId.toString(),
        ...product,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      this.products.set(fullProduct.id, fullProduct);
      this.currentProductId++;
    });
  }

  // Product CRUD operations
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.category === category);
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const fullProduct: Product = {
      id: this.currentProductId.toString(),
      ...product,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.products.set(fullProduct.id, fullProduct);
    this.currentProductId++;
    return fullProduct;
  }

  // Cart operations
  async getCartItems(sessionId: string): Promise<CartItemWithProduct[]> {
    const items = this.cartItems.get(sessionId) || [];
    return items.map(item => ({
      ...item,
      product: this.products.get(item.productId)!
    }));
  }

  async addToCart(sessionId: string, productId: string, quantity: number): Promise<CartItem> {
    const sessionItems = this.cartItems.get(sessionId) || [];
    const existingItem = sessionItems.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
      return existingItem;
    } else {
      const newItem: CartItem = {
        id: this.currentCartId.toString(),
        sessionId,
        productId,
        quantity,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      sessionItems.push(newItem);
      this.cartItems.set(sessionId, sessionItems);
      this.currentCartId++;
      return newItem;
    }
  }

  async updateCartItemQuantity(sessionId: string, productId: string, quantity: number): Promise<CartItem | undefined> {
    const sessionItems = this.cartItems.get(sessionId) || [];
    const item = sessionItems.find(item => item.productId === productId);
    
    if (item) {
      item.quantity = quantity;
      item.updatedAt = new Date().toISOString();
      return item;
    }
    return undefined;
  }

  async removeFromCart(sessionId: string, productId: string): Promise<boolean> {
    const sessionItems = this.cartItems.get(sessionId) || [];
    const index = sessionItems.findIndex(item => item.productId === productId);
    
    if (index !== -1) {
      sessionItems.splice(index, 1);
      this.cartItems.set(sessionId, sessionItems);
      return true;
    }
    return false;
  }

  async clearCart(sessionId: string): Promise<void> {
    this.cartItems.delete(sessionId);
  }
}

export const storage = new MemStorage();
