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
      // Condicionadores
      {
        name: "Kerasys Advanced Color Protect – Condicionador 400ml",
        description: "Condicionador especializado para cabelos coloridos e danificados. Desenvolvido com tecnologia Keratin e Ceramide Ampoule, ajuda a reconstruir a estrutura capilar, fortalecendo os fios e preservando a vibrância da cor. Sua fórmula Color Protect combate a oxidação e evita o desbotamento precoce.",
        category: "condicionador",
        originalPrice: "105.90",
        salePrice: "65.00",
        discountPercentage: 39,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/cae207ef-7e62-4a7d-a583-625728aa2716-mp146002-condicionador-kerasys-advanced-color-protect-400ml_1-1.png",
        volume: "400ml",
        productId: "84448",
      },
      {
        name: "Kerasys Argan Oil – Condicionador 1L",
        description: "Condicionador desenvolvido para cabelos secos e danificados. Enriquecido com Óleo de Argan que contém o dobro de Vitamina E em comparação com o azeite de oliva, oferece alta hidratação e aroma fresco de flores e almíscar. Combate a secura extrema, danos e embaraçamento.",
        category: "condicionador",
        originalPrice: "119.90",
        salePrice: "89.90",
        discountPercentage: 25,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/9fdcc98f-ea1f-463f-96c4-c729d4c4fd9e-2024-10-09t111532073084114-kerarg021000-66ce14b94b567678abe903d7-95a57a73-2399-4618-b0ea-36096daec229_1-1.jpg",
        volume: "1L",
        productId: "84452",
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
        name: "Kerasys Oriental Premium – Condicionador 200ml",
        description: "Condicionador premium com ingredientes orientais",
        category: "condicionador",
        originalPrice: "69.90",
        salePrice: "39.90",
        discountPercentage: 43,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/0ba05c6f-b7e7-4998-b651-f8733595b36a-kerasys-oriental-premium-condicionador-200ml_1-1.png",
        volume: "200ml",
        productId: "84462",
      },
      {
        name: "Kerasys Oriental Premium – Condicionador 600ml",
        description: "Condicionador premium com ingredientes orientais em tamanho família",
        category: "condicionador",
        originalPrice: "99.90",
        salePrice: "69.90",
        discountPercentage: 30,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/kerasys-oriental-premium-condicionador-600ml-54662-2969034784225539109_1-1.jpg",
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
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/kerasys-repairing-condicionador-180ml-54657-8450218047522127791_1-1.jpg",
        volume: "180ml",
        productId: "84470",
      },
      {
        name: "Kerasys Moisturizing – Condicionador 180ml",
        description: "Condicionador hidratante para todos os tipos de cabelo",
        category: "condicionador",
        originalPrice: "49.90",
        salePrice: "37.89",
        discountPercentage: 24,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/b20279a5-3cb0-4287-9b75-0f6c18a82bd7-8761-kermoistsha180cond180-62fabdfea5a3c917225fd088-31f4c8cc-279e-4824-9767-2a954a464533-1.jpg",
        volume: "180ml",
        productId: "84516",
      },
      
      // Shampoos
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
        name: "Kerasys Moisturizing – Shampoo 180ml",
        description: "Shampoo hidratante para uso diário",
        category: "shampoo",
        originalPrice: "39.90",
        salePrice: "29.90",
        discountPercentage: 25,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/kerasys-moisturizing-shampoo-180g-54651-1544130672648633265_1-1.jpg",
        volume: "180ml",
        productId: "84459",
      },
      {
        name: "Kerasys Moisturizing – Shampoo 600ml",
        description: "Shampoo hidratante em tamanho família",
        category: "shampoo",
        originalPrice: "105.90",
        salePrice: "79.90",
        discountPercentage: 25,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/kerasys-moisturizing-shampoo-600ml-54652-1481950635773480425-1.jpg",
        volume: "600ml",
        productId: "84460",
      },
      {
        name: "Kerasys Oriental Premium – Shampoo 200ml",
        description: "Shampoo premium com ingredientes orientais",
        category: "shampoo",
        originalPrice: "39.99",
        salePrice: "29.99",
        discountPercentage: 25,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/a427cb89-d135-4267-9d99-71ce44709e5e-kerasys-oriental-premium-shampoo-200g_1-1.png",
        volume: "200ml",
        productId: "84464",
      },
      {
        name: "Kerasys Perfume Lovely Romantic – Shampoo 600ml",
        description: "Shampoo perfumado com fragrância romântica",
        category: "shampoo",
        originalPrice: "99.90",
        salePrice: "69.90",
        discountPercentage: 30,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/7b1a7e54-6dce-470b-8278-6f8d11bf249e-2024-12-19t162540400746019-kepelorosh600-65d364ccc4936428e5550c10-7c6ad39d-fb37-4303-a988-8c4319d2405c_1-1.jpg",
        volume: "600ml",
        productId: "84467",
      },
      {
        name: "Kerasys Repairing – Shampoo 180ml",
        description: "Shampoo reparador para cabelos danificados",
        category: "shampoo",
        originalPrice: "62.00",
        salePrice: "36.89",
        discountPercentage: 41,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/1319fd64-1fe1-4f17-b27e-eff82cfbe3fa-kerasys-repairing-shampoo-180ml_1-1.png",
        volume: "180ml",
        productId: "84472",
      },
      {
        name: "Kerasys Revitalizing – Shampoo 180ml",
        description: "Shampoo revitalizante para cabelos cansados",
        category: "shampoo",
        originalPrice: "56.00",
        salePrice: "29.90",
        discountPercentage: 47,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/kerasys-revitalizing-shampoo-180g-54647-1381634674087053385_1-1.jpg",
        volume: "180ml",
        productId: "84475",
      },
      
      // Tratamentos/Máscaras
      {
        name: "Kerasys Advanced Keramide Ampoule Damage Clinic – Máscara Capilar 1L",
        description: "Máscara capilar intensiva desenvolvida para cabelos severamente danificados. Fórmula enriquecida com Ceramidas, Queratina e Óleo de Argan, nutre, reconstrói e revitaliza os fios, devolvendo a saúde e o brilho natural dos cabelos.",
        category: "tratamento",
        originalPrice: "199.90",
        salePrice: "136.89",
        discountPercentage: 32,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/e7f05be2-3a41-48b5-bec9-c6eaa2714d49-2025-01-06t175701078717335-keramaketrdm-65d364ccc4936428e5550c10-b916948c-632d-45db-98f2-b73ee9f92df4-1.jpg",
        volume: "1L",
        productId: "84449",
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
        name: "Kerasys Moisture Clinic – Máscara Capilar 300ml",
        description: "Máscara capilar hidratante da linha Moisture Clinic",
        category: "tratamento",
        originalPrice: "99.90",
        salePrice: "79.90",
        discountPercentage: 20,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/9982f768-0343-4479-b74d-e8694c5bae4a-mp154529-mascara-kerasys-moisture-clinic-treatment-300ml-1.png",
        volume: "300ml",
        productId: "84457",
      },
      {
        name: "Kerasys Propolis Energy Shampoo 1L",
        description: "Tratamento que combate a porosidade, criando uma película protetora sobre os fios danificados. Ajuda a recuperar o brilho, maciez e força dos cabelos, blindando completamente a fibra capilar contra sujeiras, fungos e bactérias.",
        category: "tratamento",
        originalPrice: "149.90",
        salePrice: "149.90",
        discountPercentage: 0,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/tratamento_p_ropolis.webp",
        volume: "1L",
        productId: "84519",
      },
      
      // Kits Promocionais
      {
        name: "Kerasys Kit Argan Oil Nutrição Shampoo + Condicionador",
        description: "Kit profissional de nutrição com Argan. O óleo de argan é rico em ácidos graxos (como o ômega 9) essenciais para a saúde dos cabelos. Promove hidratação e nutrição profundas dos fios, deixando-os mais brilhantes, macios e sem pontas duplas. Contém: 1 Shampoo 1000ml + 1 Condicionador 1000ml.",
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
        volume: "Kit",
        productId: "84456",
      },
      {
        name: "KERASYS PROPOLIS SHAMPOO ENERGY 180 ML + CONDICIONADOR SHINE 180 ML",
        description: "Kit com shampoo energy e condicionador shine da linha própolis",
        category: "kits-promocionais",
        originalPrice: "89.90",
        salePrice: "69.90",
        discountPercentage: 22,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/4e56c161-7b10-4422-93b1-a7dc63cc8204-2024-10-10t114222632502768-kereshk20360-66ce14b94b567678abe903d7-5ea4ae15-dd78-4d49-9340-69bb08e65b5c-1.jpg",
        volume: "Kit",
        productId: "84468",
      },
      {
        name: "Kerasys Revitalizing Duo Salão (2 Produtos)",
        description: "Kit revitalizante profissional com 2 produtos",
        category: "kits-promocionais",
        originalPrice: "299.00",
        salePrice: "195.90",
        discountPercentage: 34,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/kerasys-revitalizing-duo-salao-2-produtos-54940-2466884936377254145_1-1.jpg",
        volume: "Kit",
        productId: "84477",
      },
      {
        name: "Kit Kerasys Moisturizing Shampoo 180ml + Condicionador 180ml",
        description: "Kit hidratante com shampoo e condicionador",
        category: "kits-promocionais",
        originalPrice: "89.90",
        salePrice: "69.90",
        discountPercentage: 22,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/6a1b6ed3-fecf-458c-8a5f-681cac6c8b9d-kermoistsha180cond180-64b02e65de042b0d7485e1f9-46f9a1f0-1d86-40c5-bed0-ac814cf28cd7_1-1.jpg",
        volume: "Kit",
        productId: "84515",
      },
      {
        name: "Kit Kerasys Revitalizing Dupla (2 Produtos)",
        description: "Kit revitalizante dupla com 2 produtos",
        category: "kits-promocionais",
        originalPrice: "99.90",
        salePrice: "59.90",
        discountPercentage: 40,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/e83716fc-6de2-4fba-8e43-66bf07eb0dcf-2025-01-08t120247625547479-keredushc-66d7572ae01f6e63c1a2e3f0-755b44a9-6c53-4a90-a16a-3d3d5008e059-1.jpg",
        volume: "Kit",
        productId: "84517",
      },
      {
        name: "Kit Kerasys Propolis Energy Shampoo 1L + Tratamento de Brilho 1L",
        description: "Kit profissional com shampoo propolis energy e tratamento de brilho",
        category: "kits-promocionais",
        originalPrice: "149.90",
        salePrice: "149.90",
        discountPercentage: 0,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/tratamento_p_ropolis.webp",
        volume: "Kit",
        productId: "84518",
      },
      {
        name: "Kerasys Oriental Premium Trio (3 Produtos)",
        description: "Kit premium oriental com 3 produtos",
        category: "kits-promocionais",
        originalPrice: "199.90",
        salePrice: "139.90",
        discountPercentage: 30,
        imageUrl: "https://xn--kersys-kta.com/wp-content/uploads/2025/04/kerasys-oriental-premium-trio-3-produtos-54948-6700721022440947146-1.jpg",
        volume: "Kit",
        productId: "84466",
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
