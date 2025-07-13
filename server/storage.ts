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
      
      // Linha Argan Oil - Produtos populares globalmente
      {
        name: "Kerasys Shampoo 1L - Argan Oil - Cabelos Extremamente Secos e Danificados (Made in Korea)",
        description: "Shampoo profissional com óleo de argan puro para cabelos extremamente secos e danificados. Fórmula coreana premium com 100ppm de óleo de argan, rico em vitamina E e aminoácidos. Ideal para cabelos que passaram por processos químicos agressivos.",
        category: "shampoo",
        originalPrice: "199.90",
        salePrice: "159.90",
        discountPercentage: 20,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy84888/u/9.jpg",
        volume: "1L",
        productId: "argan_oil_shampoo_1l",
      },
      {
        name: "Kerasys Condicionador 1L - Argan Oil - Cabelos Extremamente Secos e Danificados (Made in Korea)",
        description: "Máscara de nutrição profissional com óleo de argan marroquino para recuperação intensa. Fórmula com 17 aminoácidos essenciais, queratina hidrolisada e ácido hialurônico. Sela cutículas e elimina pontas duplas em cabelos extremamente danificados.",
        category: "condicionador",
        originalPrice: "199.90",
        salePrice: "169.90",
        discountPercentage: 15,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy84968/u/9.jpg",
        volume: "1L",
        productId: "argan_oil_conditioner_1l",
      },
      {
        name: "Kerasys Argan Oil Serum 100ml",
        description: "Sérum leave-in com óleo de argan concentrado para finalização e proteção. Fórmula não oleosa que protege contra danos térmicos até 230°C, controla frizz e adiciona brilho intenso. Aplicação em cabelos úmidos ou secos.",
        category: "tratamento",
        originalPrice: "159.90",
        salePrice: "99.90",
        discountPercentage: 38,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/de15d049429dcfdbb1ad0a5ba12093f7/_/e/_ex_100ml_.png",
        volume: "100ml",
        productId: "argan_oil_serum_100ml",
      },
      
      // Linha Moisturizing Baobab Oil - Mais vendidos globalmente
      {
        name: "Kerasys Moisturizing Baobab Oil Condicionador 600ml",
        description: "Condicionador hidratante com óleo de baobá africano para cabelos secos e ressecados. Rico em vitaminas A, D, E e F, proporciona hidratação profunda e nutrição intensa. Ideal para cabelos que precisam de umidade e maciez.",
        category: "condicionador",
        originalPrice: "129.90",
        salePrice: "89.90",
        discountPercentage: 31,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/6b43fd4dce2c19d548b80844c5c1dd03/m/o/moisturizing_conditioner_2.jpg",
        volume: "600ml",
        productId: "moisturizing_cd_600",
      },
      {
        name: "Kerasys Moisturizing Baobab Oil Condicionador 180ml",
        description: "Condicionador hidratante com óleo de baobá em tamanho travel size. Fórmula concentrada que oferece hidratação intensa para cabelos secos. Perfeito para viagens ou para testar a linha.",
        category: "condicionador",
        originalPrice: "69.90",
        salePrice: "49.90",
        discountPercentage: 29,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy84968/u/9.jpg",
        volume: "180ml",
        productId: "moisturizing_cd_180",
      },
      
      // Linha Revitalizing Rosehip Oil - Para cabelos finos
      {
        name: "Kerasys - Revitalizing Rosehip Oil Condicionador 180ml",
        description: "Condicionador revitalizante com óleo de rosa mosqueta para cabelos finos e com frizz. Fórmula leve que não pesa nos fios, proporcionando volume natural e controle do frizz. Rico em vitamina C e antioxidantes.",
        category: "condicionador",
        originalPrice: "59.90",
        salePrice: "39.90",
        discountPercentage: 33,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy84970/u/9.jpg",
        volume: "180ml",
        productId: "revitalizing_cd_180",
      },
      
      // Linha Keratin Bond - Produtos individuais mais vendidos
      {
        name: "Kerasys - Keratin Bond Silky Moisture Shampoo 600ml",
        description: "Shampoo hidratante com tecnologia Keratin Bond para cabelos ressecados. Fórmula enriquecida com ceramidas, manteiga de karité e ácido cítrico que repõe umidade, melhora textura e combate porosidade. Deixa os cabelos sedosos e brilhantes.",
        category: "shampoo",
        originalPrice: "189.90",
        salePrice: "149.90",
        discountPercentage: 21,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy31660/u/8.jpg",
        volume: "600ml",
        productId: "keratin_bond_silky_moisture_sh_600",
      },
      {
        name: "Kerasys - Keratin Bond Deep Repair Shampoo 600ml",
        description: "Shampoo reparador profundo com tecnologia Keratin Bond para cabelos extremamente danificados. Fórmula intensiva que reconstrói estrutura capilar, fortalece fios e previne futuras quebras. Ideal para cabelos que passaram por processos químicos.",
        category: "shampoo",
        originalPrice: "189.90",
        salePrice: "149.90",
        discountPercentage: 21,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy31663/u/8.jpg",
        volume: "600ml",
        productId: "keratin_bond_deep_repair_sh_600",
      },
      {
        name: "Kerasys - Keratin Bond Volume Treatment 600ml",
        description: "Tratamento volumizador com tecnologia Keratin Bond para cabelos finos e sem volume. Fórmula leve que hidrata e fortalece enquanto proporciona volume natural sem pesar. Ideal para cabelos que precisam de corpo e movimento.",
        category: "tratamento",
        originalPrice: "189.90",
        salePrice: "149.90",
        discountPercentage: 21,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy42190/u/8.jpg",
        volume: "600ml",
        productId: "keratin_bond_volume_tr_600",
      },
      {
        name: "Kerasys - Keratin Bond Silky Moisture Treatment 600ml",
        description: "Tratamento hidratante com tecnologia Keratin Bond que oferece maciez sedosa aos fios. Fórmula rica em ceramidas que restaura umidade perdida, melhora textura e combate porosidade. Deixa cabelos macios, brilhantes e sedosos.",
        category: "tratamento",
        originalPrice: "189.90",
        salePrice: "149.90",
        discountPercentage: 21,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy99273/u/8.jpg",
        volume: "600ml",
        productId: "keratin_bond_silky_moisture_tr_600",
      },
      
      // Linha Perfume Lovely Romantic - Produtos individuais
      {
        name: "Kerasys Perfume - Lovely Romantic Shampoo 180ml",
        description: "Shampoo perfumado da linha Lovely Romantic em tamanho compacto. Fórmula zero silicone com 10 essências florais e 3 óleos herbais. Fragrância romântica duradoura que permanece nos cabelos. Ideal para couro cabeludo oleoso com pontas ressecadas.",
        category: "shampoo",
        originalPrice: "69.90",
        salePrice: "49.90",
        discountPercentage: 29,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy99270/u/16.jpg",
        volume: "180ml",
        productId: "perfume_lovely_romantic_sh_180",
      },
      {
        name: "Kerasys Perfume - Lovely Romantic Shampoo 400ml",
        description: "Shampoo perfumado com fragrância romântica em tamanho médio. Fórmula com essências florais premium que limpa suavemente enquanto deposita perfume delicado. Ideal para uso diário com resultados profissionais.",
        category: "shampoo",
        originalPrice: "109.90",
        salePrice: "79.90",
        discountPercentage: 27,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy99270/u/16.jpg",
        volume: "400ml",
        productId: "perfume_lovely_romantic_sh_400",
      },
      
      // Linha Scalp Care
      {
        name: "Kerasys Scalp Balancing Condicionador 180ml",
        description: "Condicionador equilibrante para couro cabeludo sensível e oleoso. Fórmula suave que hidrata os fios sem pesar no couro cabeludo. Controla oleosidade excessiva e proporciona equilíbrio ideal para cabelos mistos.",
        category: "condicionador",
        originalPrice: "59.90",
        salePrice: "39.90",
        discountPercentage: 33,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy24055/u/8.jpg",
        volume: "180ml",
        productId: "scalp_balancing_cd_180",
      },
      
      // Kits Adicionais Populares
      {
        name: "Kit Kerasys Repairing Argan Oil Duo (Shampoo 180ml + Condicionador 180ml) + Brinde",
        description: "Kit completo da linha Argan Oil com shampoo e condicionador reparadores. Fórmula concentrada para cabelos danificados com óleo de argan marroquino. Inclui brinde especial Ice Professional Repair My Hair Spray para proteção térmica.",
        category: "kits-promocionais",
        originalPrice: "179.80",
        salePrice: "87.77",
        discountPercentage: 51,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/6b43fd4dce2c19d548b80844c5c1dd03/r/e/repairing_duo.jpg",
        volume: "Kit 180ml cada + Brinde",
        productId: "kit_argan_oil_duo_brinde",
      },
      {
        name: "Kerasys Moisturizing Baobab Oil Kit Duo (Shampoo + Condicionador 600ml)",
        description: "Kit completo da linha Moisturizing com shampoo e condicionador de 600ml cada. Fórmula com óleo de baobá africano para hidratação profunda de cabelos secos. Combinação perfeita para cuidado diário intensivo.",
        category: "kits-promocionais",
        originalPrice: "259.80",
        salePrice: "189.90",
        discountPercentage: 27,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy84968/u/9.jpg",
        volume: "Kit 600ml cada",
        productId: "moisturizing_kit_duo_600",
      },
      {
        name: "Kerasys Keratin Bond Silky Moisture Kit (Shampoo 600ml e Tratamento 600ml)",
        description: "Kit completo da linha Keratin Bond Silky Moisture com shampoo e tratamento de 600ml cada. Tecnologia Keratin Bond que reconstrói estrutura capilar e oferece maciez sedosa. Fórmula com ceramidas e ácido cítrico para hidratação profunda.",
        category: "kits-promocionais",
        originalPrice: "379.80",
        salePrice: "279.90",
        discountPercentage: 26,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/6b43fd4dce2c19d548b80844c5c1dd03/k/e/keratin_bond_-_silky_moisture_1.png",
        volume: "Kit 600ml cada",
        productId: "keratin_bond_silky_moisture_kit_600",
      },
      
      // Linha Oriental Premium - Mais vendida globalmente
      {
        name: "Kerasys Oriental Premium Red Camellia Oil Condicionador 600ml (Nova Fórmula)",
        description: "Condicionador premium da linha Oriental com óleo de camélia vermelha asiática. Sistema oriental de cuidados que proporciona nutrição profunda, fortalecimento e brilho excepcional. Enriquecido com extratos orientais tradicionais e óleos nobres.",
        category: "condicionador",
        originalPrice: "149.90",
        salePrice: "119.90",
        discountPercentage: 20,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy31663/u/8.jpg",
        volume: "600ml",
        productId: "oriental_premium_cd_600",
      },
      {
        name: "Kerasys Oriental Premium Red Camellia Oil Treatment 200ml",
        description: "Tratamento premium com óleo de camélia vermelha e essências orientais. Fórmula concentrada com ginseng, crisântemo e orquídea que revitaliza cabelos danificados pela química. Ideal para mechas, luzes e cabelos que precisam de reparação profunda.",
        category: "tratamento",
        originalPrice: "139.90",
        salePrice: "89.90",
        discountPercentage: 36,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy31666/u/8.jpg",
        volume: "200ml",
        productId: "oriental_premium_tr_200",
      },
      
      // Ampolas e Tratamentos Intensivos
      {
        name: "Kerasys Advanced Repair Ampoule 10x - Protein Recovery 80ml",
        description: "Ampola de tratamento proteico avançado para cabelos severamente danificados. Fórmula concentrada 10x com proteínas hidrolisadas e aminoácidos que reconstrói estrutura capilar em profundidade. Resultados instantâneos de reparação.",
        category: "tratamento",
        originalPrice: "169.90",
        salePrice: "119.90",
        discountPercentage: 29,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy31671/u/8.jpg",
        volume: "80ml",
        productId: "advanced_repair_ampoule_protein",
      },
      {
        name: "Kerasys Advanced Volume Ampoule 10x - Volumizing Serum 80ml",
        description: "Ampola volumizadora avançada para cabelos finos e sem corpo. Fórmula concentrada 10x que proporciona volume duradouro sem pesar os fios. Tecnologia de liberação gradual para resultados que duram até 72 horas.",
        category: "tratamento",
        originalPrice: "169.90",
        salePrice: "119.90",
        discountPercentage: 29,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy42187/u/8.jpg",
        volume: "80ml",
        productId: "advanced_volume_ampoule",
      },
      
      // Linha Elegance & Sensual - Produtos mais vendidos mundialmente
      {
        name: "Kerasys Elegance & Sensual Perfumed Shampoo 600ml - Sistema de Fragrância 3 Camadas",
        description: "Shampoo perfumado com sistema único de fragrância de 3 camadas (topo, meio, base). Notas de maçã, íris, pêssego (topo), tuberosa, ylang ylang (meio), sândalo, almíscar (base). Fragrância duradoura que permanece nos cabelos até o dia seguinte. Produto mais vendido globalmente na linha perfumada.",
        category: "shampoo",
        originalPrice: "149.90",
        salePrice: "119.90",
        discountPercentage: 20,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy99271/u/8.jpg",
        volume: "600ml",
        productId: "elegance_sensual_shampoo_600",
      },
      {
        name: "Kerasys Elegance & Sensual Perfumed Conditioner 600ml - Sistema de Fragrância Premium",
        description: "Condicionador perfumado com fragrância sofisticada de 3 camadas. Fórmula hidratante que deposita perfume delicado nos fios enquanto condiciona. Sistema de liberação gradual mantém a fragrância ativa por até 24 horas. Ideal para quem busca cabelos perfumados e sedosos.",
        category: "condicionador",
        originalPrice: "149.90",
        salePrice: "119.90",
        discountPercentage: 20,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy99274/u/8.jpg",
        volume: "600ml",
        productId: "elegance_sensual_conditioner_600",
      },
      
      // Linha Natural Recipe Tea Tree Oil - Popular para couro cabeludo oleoso
      {
        name: "Kerasys Natural Recipe Tea Tree Oil Shampoo 1L - Anti-caspa e Purificante",
        description: "Shampoo purificante com óleo de tea tree australiano para couro cabeludo oleoso e com caspa. Fórmula natural que equilibra oleosidade, combate bactérias e proporciona sensação refrescante. Tamanho família 1L para uso prolongado. Popular na Coreia para problemas de couro cabeludo.",
        category: "shampoo",
        originalPrice: "179.90",
        salePrice: "149.90",
        discountPercentage: 17,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy84888/u/9.jpg",
        volume: "1L",
        productId: "tea_tree_oil_shampoo_1l",
      },
      {
        name: "Kerasys Natural Recipe Tea Tree Oil Conditioner 1L - Equilibrante e Refrescante",
        description: "Condicionador equilibrante com óleo de tea tree que hidrata os fios sem pesar no couro cabeludo oleoso. Fórmula leve com propriedades antibacterianas e antifúngicas. Ideal para uso diário em cabelos mistos (raiz oleosa e pontas secas).",
        category: "condicionador",
        originalPrice: "179.90",
        salePrice: "149.90",
        discountPercentage: 17,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy84968/u/9.jpg",
        volume: "1L",
        productId: "tea_tree_oil_conditioner_1l",
      },
      
      // Linha Hair Clinic System - Produtos clínicos profissionais
      {
        name: "Kerasys Hair Clinic System Oriental Premium Shampoo 600ml - Fórmula Profissional",
        description: "Shampoo profissional da linha Hair Clinic com tecnologia oriental premium. Contém complexo de proteínas duplas, óleo de camélia e extratos orientais (ginseng, crisântemo, orquídea). Fortalece raízes, adiciona brilho e revitaliza cabelos enfraquecidos. Usado em salões profissionais coreanos.",
        category: "shampoo",
        originalPrice: "169.90",
        salePrice: "139.90",
        discountPercentage: 18,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy84890/u/8.jpg",
        volume: "600ml",
        productId: "hair_clinic_oriental_premium_sh_600",
      },
      {
        name: "Kerasys Hair Clinic System Oriental Premium Conditioner 600ml - Tratamento Clínico",
        description: "Condicionador profissional da linha Hair Clinic com fórmula clínica oriental. Sistema de reparação profunda com camélia japonica, proteínas hidrolisadas e essências orientais. Reconstrói estrutura capilar e oferece nutrição intensiva para cabelos severamente danificados.",
        category: "condicionador",
        originalPrice: "169.90",
        salePrice: "139.90",
        discountPercentage: 18,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy84970/u/9.jpg",
        volume: "600ml",
        productId: "hair_clinic_oriental_premium_cd_600",
      },
      {
        name: "Kerasys Hair Clinic System Oriental Premium Treatment 200ml - Máscara Profissional",
        description: "Tratamento intensivo da linha Hair Clinic com concentração máxima de ativos orientais. Máscara profissional com óleo de camélia vermelha, extratos de orquídea e ginseng. Uso semanal para reparação profunda de cabelos danificados por processos químicos.",
        category: "tratamento",
        originalPrice: "149.90",
        salePrice: "99.90",
        discountPercentage: 33,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy31666/u/8.jpg",
        volume: "200ml",
        productId: "hair_clinic_oriental_premium_tr_200",
      },
      
      // Linha Coconut Oil - Hidratação profunda
      {
        name: "Kerasys Coconut Oil Shampoo 1L - Hidratação Tropical Profunda (Made in Korea)",
        description: "Shampoo hidratante com óleo de coco virgem para cabelos extremamente secos. Fórmula rica em ácidos graxos essenciais, vitamina E e antioxidantes naturais. Proporciona hidratação tropical intensa, maciez e brilho natural. Fragrância delicada de coco que transporta para o paraíso.",
        category: "shampoo",
        originalPrice: "179.90",
        salePrice: "139.90",
        discountPercentage: 22,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy99270/u/16.jpg",
        volume: "1L",
        productId: "coconut_oil_shampoo_1l",
      },
      {
        name: "Kerasys Coconut Oil Conditioner 1L - Máscara Nutritiva Tropical (Made in Korea)",
        description: "Condicionador intensivo com óleo de coco puro e própolis. Fórmula sem sulfatos que oferece nutrição profunda e selagem de cutículas. Ideal para cabelos ressecados pelo sol, sal ou processos químicos. Textura cremosa que envolve os fios em hidratação tropical.",
        category: "condicionador",
        originalPrice: "179.90",
        salePrice: "139.90",
        discountPercentage: 22,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy99273/u/8.jpg",
        volume: "1L",
        productId: "coconut_oil_conditioner_1l",
      },
      
      // Produtos Anti-idade para cabelos
      {
        name: "Kerasys Advanced Age Care Shampoo 600ml - Anti-idade Capilar",
        description: "Shampoo anti-idade com peptídeos bioativos e colágeno hidrolisado para cabelos maduros. Fórmula avançada que fortalece fios enfraquecidos pelo tempo, restaura elasticidade e combate sinais de envelhecimento capilar. Ideal para cabelos após os 40 anos que perderam vitalidade.",
        category: "shampoo",
        originalPrice: "189.90",
        salePrice: "149.90",
        discountPercentage: 21,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy31660/u/8.jpg",
        volume: "600ml",
        productId: "advanced_age_care_shampoo_600",
      },
      {
        name: "Kerasys Advanced Age Care Conditioner 600ml - Regeneração Anti-idade",
        description: "Condicionador regenerativo com tecnologia anti-idade para cabelos maduros. Complexo de peptídeos, ácido hialurônico e extratos antioxidantes que restauram densidade, brilho e movimento jovem aos fios. Combate sinais visíveis de envelhecimento capilar.",
        category: "condicionador",
        originalPrice: "189.90",
        salePrice: "149.90",
        discountPercentage: 21,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy31671/u/8.jpg",
        volume: "600ml",
        productId: "advanced_age_care_conditioner_600",
      },
      
      // Linha para cabelos coloridos
      {
        name: "Kerasys Color Care Protection Shampoo 600ml - Proteção da Cor",
        description: "Shampoo protetor para cabelos coloridos e com mechas. Fórmula sem sulfatos com filtro UV e antioxidantes que preservam a cor por até 8 semanas. Limpa suavemente sem desbotar, mantém vibrância e protege contra desbotamento solar. Ideal para loiras, ruivas e colorações fantasia.",
        category: "shampoo",
        originalPrice: "169.90",
        salePrice: "129.90",
        discountPercentage: 24,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy42187/u/8.jpg",
        volume: "600ml",
        productId: "color_care_protection_shampoo_600",
      },
      {
        name: "Kerasys Color Care Protection Conditioner 600ml - Nutrição Sem Desbotamento",
        description: "Condicionador nutritivo para cabelos coloridos com tecnologia de proteção da cor. Fórmula rica em aminoácidos e vitaminas que hidrata profundamente sem remover pigmentos. Prolonga duração da cor, adiciona brilho e mantém tonalidades vibrantes por mais tempo.",
        category: "condicionador",
        originalPrice: "169.90",
        salePrice: "129.90",
        discountPercentage: 24,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy42190/u/8.jpg",
        volume: "600ml",
        productId: "color_care_protection_conditioner_600",
      },
      
      // Kits Populares Globalmente
      {
        name: "Kit Kerasys Elegance & Sensual Perfumed Duo Set (Shampoo + Conditioner 600ml cada)",
        description: "Kit completo da linha Elegance & Sensual mais vendida mundialmente. Conjunto com shampoo e condicionador perfumados de 600ml cada. Sistema de fragrância de 3 camadas que permanece nos cabelos por 24h. Ideal para quem busca cabelos perfumados com qualidade profissional coreana.",
        category: "kits-promocionais",
        originalPrice: "299.80",
        salePrice: "219.90",
        discountPercentage: 27,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy99270/u/16.jpg",
        volume: "Kit 600ml cada",
        productId: "elegance_sensual_kit_duo_600",
      },
      {
        name: "Kit Kerasys Hair Clinic Oriental Premium Trio Professional (Shampoo + Conditioner + Treatment)",
        description: "Kit profissional completo Hair Clinic Oriental Premium. Trio com shampoo 600ml, condicionador 600ml e tratamento 200ml. Sistema clínico oriental com camélia, ginseng e proteínas para recuperação total de cabelos danificados. Resultados de salão em casa.",
        category: "kits-promocionais",
        originalPrice: "459.70",
        salePrice: "329.90",
        discountPercentage: 28,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy84890/u/8.jpg",
        volume: "Kit Trio Profissional",
        productId: "hair_clinic_oriental_trio_professional",
      },
      {
        name: "Kit Kerasys Natural Recipe Mega Family Size (Tea Tree + Argan + Coconut Oil 1L cada)",
        description: "Kit família completo Natural Recipe com 3 linhas populares. Inclui Tea Tree Oil 1L (couro cabeludo oleoso), Argan Oil 1L (cabelos danificados) e Coconut Oil 1L (hidratação intensa). Economia máxima para famílias que usam produtos naturais coreanos premium.",
        category: "kits-promocionais",
        originalPrice: "539.70",
        salePrice: "399.90",
        discountPercentage: 26,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy84888/u/9.jpg",
        volume: "Kit Família 3L total",
        productId: "natural_recipe_mega_family_kit",
      },
      
      // Produtos Inovadores
      {
        name: "Kerasys pH Balance Scalp Care Shampoo 600ml - Equilíbrio do pH",
        description: "Shampoo inovador com pH balanceado 5.5 para couro cabeludo sensível. Fórmula hipoalergênica com prebióticos que restaura microbioma capilar saudável. Controla oleosidade excessiva, reduz irritação e coceira. Ideal para quem sofre com desequilíbrios do couro cabeludo.",
        category: "shampoo",
        originalPrice: "159.90",
        salePrice: "119.90",
        discountPercentage: 25,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy99272/u/8.jpg",
        volume: "600ml",
        productId: "ph_balance_scalp_care_shampoo_600",
      },
      {
        name: "Kerasys Protein Therapy Intensive Ampoule 50ml - Terapia Proteica Intensiva",
        description: "Ampola de terapia proteica concentrada para cabelos severamente danificados. Fórmula com 18 aminoácidos, queratina hidrolisada e colágeno que reconstrói estrutura capilar em nível molecular. Uso semanal para reparação extrema de cabelos quebrados, porosos ou químicamente tratados.",
        category: "tratamento",
        originalPrice: "199.90",
        salePrice: "149.90",
        discountPercentage: 25,
        imageUrl: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/ksy/ksy31663/u/8.jpg",
        volume: "50ml",
        productId: "protein_therapy_intensive_ampoule_50",
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
