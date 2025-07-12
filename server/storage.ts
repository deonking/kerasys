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
      {
        name: "Kerasys Advanced Color Protect – Condicionador 400ml",
        description: "Condicionador avançado para proteção da cor dos cabelos",
        category: "condicionador",
        originalPrice: "105.90",
        salePrice: "65.00",
        discountPercentage: 39,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/cae207ef-7e62-4a7d-a583-625728aa2716-mp146002-condicionador-kerasys-advanced-color-protect-400ml_1-1.png",
        volume: "400ml",
        productId: "84448",
      },
      {
        name: "Kerasys Advanced Keramide Ampoule Damage Clinic – Máscara Capilar 1L",
        description: "Máscara capilar reparadora com keramida para cabelos danificados",
        category: "tratamento",
        originalPrice: "199.90",
        salePrice: "136.89",
        discountPercentage: 32,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/e7f05be2-3a41-48b5-bec9-c6eaa2714d49-2025-01-06t175701078717335-keramaketrdm-65d364ccc4936428e5550c10-b916948c-632d-45db-98f2-b73ee9f92df4-1.jpg",
        volume: "1L",
        productId: "84449",
      },
      {
        name: "Kerasys Advanced Keramide Ampoule Damage Clinic – Shampoo 1L",
        description: "Shampoo reparador com keramida para cabelos danificados",
        category: "shampoo",
        originalPrice: "139.90",
        salePrice: "98.90",
        discountPercentage: 29,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/b9693156-96d1-497c-89e9-3d816c782160-2024-12-27t174409978034878-kekeamdaclsh-65d364ccc4936428e5550c10-626e36a9-4b36-4e93-9bb8-0de860d19eb5-1.jpg",
        volume: "1L",
        productId: "84450",
      },
      {
        name: "Kerasys Advanced Moisture Ampoule 10x – Máscara Capilar 300ml",
        description: "Máscara capilar hidratante intensiva com ampola de hidratação 10x",
        category: "tratamento",
        originalPrice: "115.90",
        salePrice: "85.90",
        discountPercentage: 26,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/a4feeeb4-0c89-4563-9cc9-15fd1e065ea1-2023-11-02t144851691408143-mascara-kerasys-advance-ampoule-moisture-10x-hair-pack-300mljpg14366720382224873603-1.jpg",
        volume: "300ml",
        productId: "84451",
      },
      {
        name: "Kerasys Argan Oil – Condicionador 1L",
        description: "Condicionador nutritivo com óleo de argan para cabelos ressecados",
        category: "condicionador",
        originalPrice: "119.90",
        salePrice: "89.90",
        discountPercentage: 25,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/9fdcc98f-ea1f-463f-96c4-c729d4c4fd9e-2024-10-09t111532073084114-kerarg021000-66ce14b94b567678abe903d7-95a57a73-2399-4618-b0ea-36096daec229_1-1.jpg",
        volume: "1L",
        productId: "84452",
      },
      {
        name: "Kerasys Argan Oil – Máscara Capilar 1L",
        description: "Máscara capilar nutritiva com óleo de argan",
        category: "tratamento",
        originalPrice: "199.90",
        salePrice: "139.90",
        discountPercentage: 30,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/7a344dca-890a-49a1-a709-b032ed332e65-mp275637-mascara-kerasys-argan-oil-treatment-1l-1.png",
        volume: "1L",
        productId: "84453",
      },
      {
        name: "Kerasys Clabo Romantic Citrus Deep Clean – Condicionador 960ml",
        description: "Condicionador de limpeza profunda com citrus romântico",
        category: "condicionador",
        originalPrice: "155.90",
        salePrice: "99.90",
        discountPercentage: 36,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/ff02440c-dacf-4505-a1b1-6a2d7c2dede8-mp146009-condicionador-kerasys-clabo-romantic-citrus-deep-clean-960ml_1-1.png",
        volume: "960ml",
        productId: "84454",
      },
      {
        name: "Kerasys Kit Argan Oil Nutrição Shampoo + Condicionador",
        description: "Kit completo com shampoo e condicionador de óleo de argan",
        category: "kits-promocionais",
        originalPrice: "299.90",
        salePrice: "199.90",
        discountPercentage: 33,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/863f793f-b88c-402f-ae5c-fa22ba87072b-2025-01-14t163142132796585-kekitaroishco-65d364ccc4936428e5550c10-99758df3-633c-4982-a0d7-e2b5235bee1d_1-1.jpg",
        volume: "Kit",
        productId: "84455",
      },
      {
        name: "Kerasys Kit Duo Coconut Profissional Shampoo + Condicionador 1litro",
        description: "Kit profissional com shampoo e condicionador de coco",
        category: "kits-promocionais",
        originalPrice: "299.90",
        salePrice: "145.90",
        discountPercentage: 51,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/9bc69cfb-13fa-43f9-bbad-3d5169b09313-2024-12-13t151856822218456-kitkeduoconut-65d364ccc4936428e5550c10-d689d7ec-3531-4473-af54-c10cd5324979_1-1.jpg",
        volume: "1L cada",
        productId: "84456",
      },
      {
        name: "Kerasys Moisture Clinic – Máscara Capilar 300ml",
        description: "Máscara capilar hidratante para cabelos ressecados",
        category: "tratamento",
        originalPrice: "99.90",
        salePrice: "79.90",
        discountPercentage: 20,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/9982f768-0343-4479-b74d-e8694c5bae4a-mp154529-mascara-kerasys-moisture-clinic-treatment-300ml-1.png",
        volume: "300ml",
        productId: "84457",
      },
      {
        name: "KERASYS PROPOLIS SHAMPOO ENERGY 180 ML + CONDICIONADOR SHINE 180 ML",
        description: "Kit com shampoo energizante e condicionador com própolis",
        category: "kits-promocionais",
        originalPrice: "89.90",
        salePrice: "69.90",
        discountPercentage: 22,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/4e56c161-7b10-4422-93b1-a7dc63cc8204-2024-10-10t114222632502768-kereshk20360-66ce14b94b567678abe903d7-5ea4ae15-dd78-4d49-9340-69bb08e65b5c-1.jpg",
        volume: "180ml cada",
        productId: "84468",
      },
      {
        name: "Kerasys Propolis Energy Shampoo 1L",
        description: "Shampoo energizante com própolis que combate a porosidade, criando uma película protetora sobre os fios danificados",
        category: "shampoo",
        originalPrice: "149.90",
        salePrice: "149.90",
        discountPercentage: 0,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/tratamento_p_ropolis.webp",
        volume: "1L",
        productId: "featured-propolis",
      },
      // Additional Shampoo Products
      {
        name: "Kerasys Moisturizing – Shampoo 180ml",
        description: "Shampoo hidratante para cabelos ressecados",
        category: "shampoo",
        originalPrice: "39.90",
        salePrice: "29.90",
        discountPercentage: 25,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/kerasys-moisturizing-shampoo-180g-54651-1544130672648633265_1-1-430x430.jpg",
        volume: "180ml",
        productId: "84459",
      },
      {
        name: "Kerasys Moisturizing – Shampoo 600ml",
        description: "Shampoo hidratante para cabelos ressecados",
        category: "shampoo",
        originalPrice: "105.90",
        salePrice: "79.90",
        discountPercentage: 25,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/kerasys-moisturizing-shampoo-600ml-54652-1481950635773480425-1-430x430.jpg",
        volume: "600ml",
        productId: "84460",
      },
      {
        name: "Kerasys Oriental Premium – Shampoo 200ml",
        description: "Shampoo premium oriental com fragrância sofisticada",
        category: "shampoo",
        originalPrice: "39.99",
        salePrice: "29.99",
        discountPercentage: 25,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/a427cb89-d135-4267-9d99-71ce44709e5e-kerasys-oriental-premium-shampoo-200g_1-1-430x430.png",
        volume: "200ml",
        productId: "84464",
      },
      {
        name: "Kerasys Oriental Premium – Shampoo 600ml",
        description: "Shampoo premium oriental com fragrância sofisticada",
        category: "shampoo",
        originalPrice: "99.90",
        salePrice: "69.90",
        discountPercentage: 30,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/kerasys-oriental-premium-shampoo-600g-54660-8673332746674290130_1-1-430x430.jpg",
        volume: "600ml",
        productId: "84465",
      },
      {
        name: "Kerasys Perfume Lovely Romantic – Shampoo 600ml",
        description: "Shampoo perfumado com fragrância romântica",
        category: "shampoo",
        originalPrice: "99.90",
        salePrice: "69.90",
        discountPercentage: 30,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/7b1a7e54-6dce-470b-8278-6f8d11bf249e-2024-12-19t162540400746019-kepelorosh600-65d364ccc4936428e5550c10-7c6ad39d-fb37-4303-a988-8c4319d2405c_1-1-430x430.jpg",
        volume: "600ml",
        productId: "84467",
      },
      // Additional Conditioner Products
      {
        name: "Kerasys Moisturizing – Condicionador 180ml",
        description: "Condicionador hidratante para cabelos ressecados",
        category: "condicionador",
        originalPrice: "45.00",
        salePrice: "35.90",
        discountPercentage: 20,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/e91b71e3-a307-4d7e-bd65-6f0e88a19f4e-kerasys-moisturizing-condicionador-180ml_1-1-430x430.png",
        volume: "180ml",
        productId: "84458",
      },
      {
        name: "KERASYS MOISTURIZING CONDICIONADOR 400 ML",
        description: "Condicionador hidratante para cabelos ressecados",
        category: "condicionador",
        originalPrice: "89.90",
        salePrice: "59.90",
        discountPercentage: 33,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/0c534086-65b7-4fd9-a1d8-2bf404530359-2024-10-09t153303969156781-kermoi020400-66ce14b94b567678abe903d7-f9243e22-09af-4aab-9160-0c6a099fb835-1-430x430.jpg",
        volume: "400ml",
        productId: "84461",
      },
      {
        name: "Kerasys Oriental Premium – Condicionador 200ml",
        description: "Condicionador premium oriental com fragrância sofisticada",
        category: "condicionador",
        originalPrice: "69.90",
        salePrice: "39.90",
        discountPercentage: 43,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/0ba05c6f-b7e7-4998-b651-f8733595b36a-kerasys-oriental-premium-condicionador-200ml_1-1-430x430.png",
        volume: "200ml",
        productId: "84462",
      },
      {
        name: "Kerasys Oriental Premium – Condicionador 600ml",
        description: "Condicionador premium oriental com fragrância sofisticada",
        category: "condicionador",
        originalPrice: "99.90",
        salePrice: "69.90",
        discountPercentage: 30,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/kerasys-oriental-premium-condicionador-600ml-54662-2969034784225539109_1-1-430x430.jpg",
        volume: "600ml",
        productId: "84463",
      },
      {
        name: "Kerasys Repairing – Condicionador 180ml",
        description: "Condicionador reparador para cabelos danificados",
        category: "condicionador",
        originalPrice: "49.90",
        salePrice: "37.89",
        discountPercentage: 24,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/kerasys-repairing-condicionador-180ml-54657-8450218047522127791_1-1-430x430.jpg",
        volume: "180ml",
        productId: "84470",
      },
      // Additional Treatment Products
      {
        name: "Kerasys Própolis Shine – Máscara Capilar 1L",
        description: "Máscara capilar com própolis para brilho intenso",
        category: "tratamento",
        originalPrice: "159.90",
        salePrice: "99.90",
        discountPercentage: 38,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/5beb91d7-1114-4913-98e2-617b8314ebef-mp146015-mascara-kerasys-propolis-shine-1000ml-1-430x430.png",
        volume: "1L",
        productId: "84469",
      },
      {
        name: "Sérum Kerasys Advanced Ampoule Moisture 80ml",
        description: "Sérum hidratante avançado com ampola de hidratação",
        category: "tratamento",
        originalPrice: "112.87",
        salePrice: "59.90",
        discountPercentage: 47,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/01c9392c-5b96-479a-8f33-8eccf55c6d2e-2023-11-03t092641753116371-serum-kerasys-advanced-ampoule-moisture-80mljpg8499581906475722834-1-430x430.jpg",
        volume: "80ml",
        productId: "84528",
      },
      {
        name: "Tratamento Kerasys Salon de Magie 200ml",
        description: "Tratamento capilar salon de magie para cabelos danificados",
        category: "tratamento",
        originalPrice: "150.00",
        salePrice: "79.90",
        discountPercentage: 47,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/201bc7c6-5dec-4033-8aad-101741f44d38-mp154527-tratamento-kerasys-salon-de-magie-200ml-1-430x430.png",
        volume: "200ml",
        productId: "84529",
      },
      // Additional Kit Products
      {
        name: "Kerasys Oriental Premium Trio (3 Produtos)",
        description: "Kit trio com shampoo, condicionador e máscara oriental premium",
        category: "kits-promocionais",
        originalPrice: "199.90",
        salePrice: "139.90",
        discountPercentage: 30,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/kerasys-oriental-premium-trio-3-produtos-54948-6700721022440947146-1-430x430.jpg",
        volume: "Kit",
        productId: "84466",
      },
      {
        name: "Kerasys Revitalizing Duo Salão (2 Produtos)",
        description: "Kit duo revitalizante profissional para salão",
        category: "kits-promocionais",
        originalPrice: "299.00",
        salePrice: "195.90",
        discountPercentage: 34,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/kerasys-revitalizing-duo-salao-2-produtos-54940-2466884936377254145_1-1-430x430.jpg",
        volume: "Kit",
        productId: "84477",
      },
      {
        name: "Kit Kerasys Moisturizing Shampoo 180ml + Condicionador 180ml",
        description: "Kit hidratante completo para cabelos ressecados",
        category: "kits-promocionais",
        originalPrice: "89.90",
        salePrice: "69.90",
        discountPercentage: 22,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/6a1b6ed3-fecf-458c-8a5f-681cac6c8b9d-kermoistsha180cond180-64b02e65de042b0d7485e1f9-46f9a1f0-1d86-40c5-bed0-ac814cf28cd7_1-1-430x430.jpg",
        volume: "180ml cada",
        productId: "84515",
      },
      {
        name: "Kit Kerasys Oriental Premium Shampoo 200ml + Condicionador 200ml",
        description: "Kit oriental premium com fragrância sofisticada",
        category: "kits-promocionais",
        originalPrice: "89.90",
        salePrice: "69.90",
        discountPercentage: 22,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/0714353a-0db5-41f1-b13b-1e0dbdf4b841-8761-kerorientalsha200cond200-62fabdfea5a3c917225fd088-1491fb08-d425-445c-b1b6-fd5dbec3a49d-1-430x430.jpg",
        volume: "200ml cada",
        productId: "84517",
      },
      {
        name: "Kit Kerasys Oriental Premium Shampoo 600ml + Condicionador 600ml",
        description: "Kit oriental premium tamanho profissional",
        category: "kits-promocionais",
        originalPrice: "197.00",
        salePrice: "117.90",
        discountPercentage: 40,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/ebe2637e-aa09-4da3-ae78-37aec640bef1-8761-kerorientalshacon600-62fabdfea5a3c917225fd088-d27247f4-f3be-45bb-95ad-34e38a77122b_1-1-430x430.jpg",
        volume: "600ml cada",
        productId: "84518",
      },
      {
        name: "Kit Kerasys Propolis Energy Shampoo 180ml + Tratamento de Brilho 180ml",
        description: "Kit energizante com própolis e tratamento de brilho",
        category: "kits-promocionais",
        originalPrice: "117.90",
        salePrice: "65.95",
        discountPercentage: 44,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/bf7ddd65-234b-4352-b3ee-e98bfe7b8a58-2025-02-17t165554316547579-kerprosha180con180-64b02e65de042b0d7485e1f9-63310363-2dd9-4c8b-9726-0455df03dd5a-1-430x430.jpg",
        volume: "180ml cada",
        productId: "84519",
      },
      {
        name: "Kit Kerasys Propolis Energy Shampoo 1L + Tratamento de Brilho 1L",
        description: "Kit energizante profissional com própolis",
        category: "kits-promocionais",
        originalPrice: "255.90",
        salePrice: "149.90",
        discountPercentage: 41,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/1671ac5a-2cfb-40ed-ad65-698ff03a44cf-8761-kitkershamas1000-62fabdfea5a3c917225fd088-650df1f5-30f7-4db4-8c6f-f6e4204c4c37_1-1-430x430.jpg",
        volume: "1L cada",
        productId: "84520",
      },
      {
        name: "Kit Kerasys Repairing – Shampoo 180ml + Condicionador 180ml",
        description: "Kit reparador para cabelos danificados",
        category: "kits-promocionais",
        originalPrice: "99.90",
        salePrice: "69.90",
        discountPercentage: 30,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/whatsapp-image-2025-03-13-at-161140-photoroom-1-430x430.jpg",
        volume: "180ml cada",
        productId: "84521",
      },
    ];

    productsData.forEach(product => {
      const id = this.currentProductId++;
      const fullProduct: Product = {
        id,
        ...product,
        inStock: true,
        volume: product.volume || null,
      };
      this.products.set(product.productId, fullProduct);
    });
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    const allProducts = Array.from(this.products.values());
    if (category === "mais-vendidos") {
      return allProducts.slice(0, 10);
    }
    return allProducts.filter(product => product.category === category);
  }

  async getProductById(productId: string): Promise<Product | undefined> {
    return this.products.get(productId);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const fullProduct: Product = {
      id,
      ...product,
      inStock: true,
      volume: product.volume || null,
    };
    this.products.set(product.productId, fullProduct);
    return fullProduct;
  }

  async getCartItems(sessionId: string): Promise<CartItemWithProduct[]> {
    const items = this.cartItems.get(sessionId) || [];
    const itemsWithProducts: CartItemWithProduct[] = [];
    
    for (const item of items) {
      const product = this.products.get(item.productId);
      if (product) {
        itemsWithProducts.push({
          ...item,
          product,
        });
      }
    }
    
    return itemsWithProducts;
  }

  async addToCart(sessionId: string, productId: string, quantity: number): Promise<CartItem> {
    const items = this.cartItems.get(sessionId) || [];
    const existingItemIndex = items.findIndex(item => item.productId === productId);
    
    if (existingItemIndex >= 0) {
      items[existingItemIndex].quantity += quantity;
      this.cartItems.set(sessionId, items);
      return items[existingItemIndex];
    } else {
      const newItem: CartItem = {
        id: this.currentCartId++,
        sessionId,
        productId,
        quantity,
      };
      items.push(newItem);
      this.cartItems.set(sessionId, items);
      return newItem;
    }
  }

  async updateCartItemQuantity(sessionId: string, productId: string, quantity: number): Promise<CartItem | undefined> {
    const items = this.cartItems.get(sessionId) || [];
    const itemIndex = items.findIndex(item => item.productId === productId);
    
    if (itemIndex >= 0) {
      if (quantity <= 0) {
        items.splice(itemIndex, 1);
        this.cartItems.set(sessionId, items);
        return undefined;
      } else {
        items[itemIndex].quantity = quantity;
        this.cartItems.set(sessionId, items);
        return items[itemIndex];
      }
    }
    
    return undefined;
  }

  async removeFromCart(sessionId: string, productId: string): Promise<boolean> {
    const items = this.cartItems.get(sessionId) || [];
    const itemIndex = items.findIndex(item => item.productId === productId);
    
    if (itemIndex >= 0) {
      items.splice(itemIndex, 1);
      this.cartItems.set(sessionId, items);
      return true;
    }
    
    return false;
  }

  async clearCart(sessionId: string): Promise<void> {
    this.cartItems.delete(sessionId);
  }
}

export const storage = new MemStorage();
