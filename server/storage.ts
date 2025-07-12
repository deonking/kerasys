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
        category: "kits",
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
        category: "kits",
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
        category: "kits",
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
    ];

    productsData.forEach(product => {
      const id = this.currentProductId++;
      const fullProduct: Product = {
        id,
        ...product,
        inStock: true,
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
