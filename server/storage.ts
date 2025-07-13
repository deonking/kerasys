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
      // Kits Promocionais - Produtos reais da ElaUSA
      {
        name: "Kerasys - Keratin Bond Duo Silky Moisture Shampoo 600ml + Tratamento Volume 600ml",
        description: "A dupla Silky Moisture Shampoo e Volume Treatment é perfeita para quem busca cabelos com toque sedoso, brilho radiante e volume natural. Enquanto o shampoo hidrata profundamente e combate o ressecamento, o tratamento condicionante devolve corpo e leveza aos fios, sem pesar.",
        category: "kits-promocionais",
        originalPrice: "359.80",
        salePrice: "169.90",
        discountPercentage: 53,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/k/b/kb_kit_sil_vol.png",
        volume: "Kit 600ml + 600ml",
        productId: "kb_kit_sil_vol",
      },
      {
        name: "Kerasys - Keratin Bond Duo Deep Repair Shampoo 600ml + Tratamento Purifying 600ml",
        description: "Kit com shampoo reparador profundo e tratamento purificante da linha Keratin Bond. O Deep Repair Shampoo reconstrói a estrutura capilar enquanto o Purifying Treatment remove impurezas e resíduos dos fios.",
        category: "kits-promocionais",
        originalPrice: "389.80",
        salePrice: "169.90",
        discountPercentage: 56,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/k/b/kb_kit_rep_pur.png",
        volume: "Kit 600ml + 600ml",
        productId: "kb_kit_rep_pur",
      },
      {
        name: "Kerasys - Deep Cleansing Shampoo Refil 500ml + Bed Head - Clean Up Peppermint Conditioner 200ml",
        description: "Kit com shampoo de limpeza profunda e condicionador com menta. Remove resíduos e impurezas do couro cabeludo, proporcionando sensação refrescante.",
        category: "kits-promocionais",
        originalPrice: "249.80",
        salePrice: "69.90",
        discountPercentage: 72,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/k/i/kit_deep_cleansing_up.png",
        volume: "Kit 500ml + 200ml",
        productId: "kit_deep_cleansing_up",
      },
      {
        name: "Kerasys Perfume Lovely Romantic Shampoo + Condicionador 600ml (Grátis SENKA - Perfect Whip A 50g)",
        description: "Kit completo com shampoo e condicionador perfumado da linha Lovely Romantic. Fragrância sofisticada e duradoura. Inclui brinde SENKA Perfect Whip A 50g.",
        category: "kits-promocionais",
        originalPrice: "269.80",
        salePrice: "199.00",
        discountPercentage: 26,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/l/o/lovely_senka.png",
        volume: "Kit 600ml cada",
        productId: "lovely_senka",
      },
      {
        name: "Kerasys Perfume Lovely Romantic Shampoo 400ml + Condicionador 400ml",
        description: "Kit com shampoo e condicionador perfumado da linha Lovely Romantic em tamanho compacto. Fragrância delicada e duradoura, ideal para uso diário.",
        category: "kits-promocionais", 
        originalPrice: "209.80",
        salePrice: "169.90",
        discountPercentage: 19,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/s/h/shampoo_e_cond_lovely_romantic_400ml.png",
        volume: "Kit 400ml cada",
        productId: "shampoo_e_cond_lovely_romantic_400ml",
      },
      {
        name: "Kerasys Revitalizing Rosehip Oil Duo Shampoo + Condicionador 180ml",
        description: "Kit duo da linha Revitalizing com óleo de rosa mosqueta para cabelos finos e com frizz. Fórmula que revitaliza e fortalece os fios fragilizados.",
        category: "kits-promocionais",
        originalPrice: "129.80",
        salePrice: "45.90",
        discountPercentage: 65,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/r/e/revitalizing_duo.jpg",
        volume: "Kit 180ml cada",
        productId: "revitalizing_duo",
      },
      
      // Shampoos
      {
        name: "Kerasys - Oriental Premium Red Camellia Oil EX - Shampoo 600ml (Nova Fórmula)",
        description: "Shampoo premium inspirado na sabedoria asiática com óleo de camélia vermelha. Sistema de cuidados orientais com super nutrição, fortalecimento capilar e brilho intenso.",
        category: "shampoo",
        originalPrice: "139.90",
        salePrice: "109.90",
        discountPercentage: 21,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/o/r/oriental_p_sh_600.png",
        volume: "600ml",
        productId: "oriental_p_sh_600",
      },
      {
        name: "Kerasys Moisturizing Baobab Oil Shampoo 600ml",
        description: "Shampoo hidratante com óleo de baobá para cabelos secos e ressecados. Fórmula enriquecida que proporciona hidratação profunda e nutrição intensa.",
        category: "shampoo",
        originalPrice: "129.90",
        salePrice: "99.90",
        discountPercentage: 23,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/m/o/moisturizing_sh_600_1.png",
        volume: "600ml",
        productId: "moisturizing_sh_600_1",
      },
      {
        name: "Kerasys - Revitalizing Shampoo Rosehip Oil 180ml",
        description: "Shampoo revitalizante com óleo de rosa mosqueta para cabelos finos e fragilizados. Fórmula que fortalece e revitaliza os fios sem pesar.",
        category: "shampoo",
        originalPrice: "49.90",
        salePrice: "39.90",
        discountPercentage: 20,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/r/e/revitalizing_sh.jpg",
        volume: "180ml",
        productId: "revitalizing_sh",
      },
      {
        name: "Kerasys Repairing Argan Oil Shampoo 180ml",
        description: "Shampoo reparador com óleo de argan marroquino para cabelos danificados. Fórmula que limpa suavemente enquanto repara e fortalece os fios.",
        category: "shampoo",
        originalPrice: "109.90",
        salePrice: "49.90",
        discountPercentage: 55,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/r/e/repairing_sh.jpg",
        volume: "180ml",
        productId: "repairing_sh",
      },
      {
        name: "Kerasys Moisturizing Baobab Oil Shampoo - 180ml",
        description: "Shampoo hidratante com óleo de baobá em embalagem compacta. Fórmula concentrada que oferece hidratação intensa para cabelos secos.",
        category: "shampoo",
        originalPrice: "109.90",
        salePrice: "39.90",
        discountPercentage: 64,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/m/o/moisturizing_3.jpg",
        volume: "180ml",
        productId: "moisturizing_3",
      },
      {
        name: "Kerasys Repairing Argan Oil Shampoo 600ml (Nova Embalagem)",
        description: "Shampoo reparador com óleo de argan em embalagem econômica. Nova fórmula aprimorada que oferece reparação intensa para cabelos danificados.",
        category: "shampoo",
        originalPrice: "129.90",
        salePrice: "109.90",
        discountPercentage: 15,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/r/e/repairing_1_5.jpg",
        volume: "600ml",
        productId: "repairing_1_5",
      },
      {
        name: "Kerasys Scalp Balancing Shampoo 180ml",
        description: "Shampoo equilibrante para couro cabeludo oleoso e com caspa. Fórmula anti-dandruff que remove impurezas e equilibra a oleosidade.",
        category: "shampoo",
        originalPrice: "59.90",
        salePrice: "49.90",
        discountPercentage: 17,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/b/a/bal.jpg",
        volume: "180ml",
        productId: "bal",
      },
      {
        name: "Kerasys Perfume - Lovely Romantic Shampoo 600ml",
        description: "Shampoo perfumado com fragrância romântica duradoura. Fórmula que limpa suavemente enquanto deposita perfume delicado nos fios.",
        category: "shampoo",
        originalPrice: "129.90",
        salePrice: "129.90",
        discountPercentage: 0,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/s/h/shampoo_lovely_romantic_600ml.png",
        volume: "600ml",
        productId: "shampoo_lovely_romantic_600ml",
      },
      
      // Condicionadores
      {
        name: "Kerasys Repairing Argan Oil Condicionador 180ml",
        description: "Condicionador reparador enriquecido com óleo de argan que nutre profundamente os fios danificados. Restaura maciez, brilho e maleabilidade.",
        category: "condicionador",
        originalPrice: "69.90",
        salePrice: "37.77",
        discountPercentage: 46,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/r/e/repairing_cd.jpg",
        volume: "180ml",
        productId: "repairing_cd",
      },
      {
        name: "Kerasys Coconut Oil Condicionador 1L (Made in Korea) - Nova Embalagem!",
        description: "Condicionador com óleo de coco para cabelos secos e danificados. Fórmula coreana autêntica com hidratação intensa e nutrição profunda.",
        category: "condicionador",
        originalPrice: "179.90",
        salePrice: "97.77",
        discountPercentage: 46,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/c/o/coconut_oil_conditioner_new_package.jpg",
        volume: "1L",
        productId: "coconut_oil_conditioner_new_package",
      },
      {
        name: "Kerasys Natural Recipe - Tea Tree Oil - Condicionador 1L (Made in Korea) - Nova Embalagem",
        description: "Condicionador com óleo de tea tree para limpeza e purificação. Fórmula natural que combate oleosidade e proporciona frescor.",
        category: "condicionador",
        originalPrice: "199.90",
        salePrice: "157.77",
        discountPercentage: 21,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/t/e/tea_tree_cd_1l.png",
        volume: "1L",
        productId: "tea_tree_cd_1l",
      },
      {
        name: "Kerasys Perfume - Lovely Romantic Conditioner 600ml",
        description: "Condicionador perfumado com fragrância romântica. Condiciona os fios enquanto deixa fragância delicada e duradoura.",
        category: "condicionador",
        originalPrice: "139.90",
        salePrice: "99.90",
        discountPercentage: 29,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/c/o/cond_lovely_romantic_600ml.png",
        volume: "600ml",
        productId: "cond_lovely_romantic_600ml",
      },
      {
        name: "Kerasys Perfume - Lovely Romantic Conditioner 400ml",
        description: "Condicionador perfumado com fragrância romântica em tamanho compacto. Perfeito para uso diário com resultados profissionais.",
        category: "condicionador",
        originalPrice: "109.90",
        salePrice: "49.90",
        discountPercentage: 55,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/c/o/cond_lovely_romantic_400ml.png",
        volume: "400ml",
        productId: "cond_lovely_romantic_400ml",
      },
      {
        name: "Kerasys - Revitalizing Rosehip Oil Condicionador 500ml (Refil)",
        description: "Condicionador revitalizante com óleo de rosa mosqueta em refil econômico. Fórmula que revitaliza cabelos finos e com frizz.",
        category: "condicionador",
        originalPrice: "109.90",
        salePrice: "67.77",
        discountPercentage: 38,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/r/e/revitalizing_cd_2.jpg",
        volume: "500ml",
        productId: "revitalizing_cd_2",
      },
      
      // Tratamentos
      {
        name: "Kerasys Advanced Moisture Ampoule 10x – Ceramide Ampoule Serum 80ml",
        description: "Ampola de tratamento intensivo com ceramidas para hidratação profunda. Fórmula concentrada 10x mais potente com tecnologia de liberação gradual.",
        category: "tratamento",
        originalPrice: "169.90",
        salePrice: "99.90",
        discountPercentage: 41,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/m/o/moisture_6.jpg",
        volume: "80ml",
        productId: "moisture_6",
      },
      {
        name: "Kerasys - Keratin Bond Deep Repair Treatment 600ml",
        description: "Tratamento reparador profundo com tecnologia Keratin Bond para cabelos extremamente danificados. Reconstrói a estrutura capilar intensivamente.",
        category: "tratamento",
        originalPrice: "199.90",
        salePrice: "129.90",
        discountPercentage: 35,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/k/e/keratin_bond_deep_repair_tr_600_1.png",
        volume: "600ml",
        productId: "keratin_bond_deep_repair_tr_600_1",
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
    const initialLength = sessionItems.length;
    const filteredItems = sessionItems.filter(item => item.productId !== productId);
    
    if (filteredItems.length < initialLength) {
      this.cartItems.set(sessionId, filteredItems);
      return true;
    }
    
    return false;
  }

  async clearCart(sessionId: string): Promise<void> {
    this.cartItems.set(sessionId, []);
  }
}

export const storage = new MemStorage();
