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
      // Kits Promocionais - Dados autênticos da ElaUSA
      {
        name: "Kerasys - Keratin Bond Duo Silky Moisture Shampoo 600ml + Tratamento Volume 600ml",
        description: "A dupla Silky Moisture Shampoo e Volume Treatment é perfeita para quem busca cabelos com toque sedoso, brilho radiante e volume natural. Enquanto o shampoo hidrata profundamente e combate o ressecamento, o tratamento condicionante devolve corpo e leveza aos fios, sem pesar. Com fórmula enriquecida com ceramidas, manteiga de karité e ácido cítrico, o Silky Moisture repõe a umidade dos fios ressecados, melhora a textura e combate a porosidade. O Volume Treatment hidrata, condiciona e promove volume natural com leveza, com proteína de trigo, colágeno e biotina.",
        category: "kits-promocionais",
        originalPrice: "359.80",
        salePrice: "169.90",
        discountPercentage: 53,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/k/b/kb_kit_sil_vol.png",
        volume: "Kit 600ml + 600ml",
        productId: "11019",
      },
      {
        name: "Kerasys - Keratin Bond Kit Silky Moisture Shampoo + Condicionador 600ml",
        description: "Kit completo Keratin Bond Silky Moisture com Shampoo e Condicionador de 600ml cada. Fórmula enriquecida com ceramidas, manteiga de karité e ácido cítrico que repõe a umidade dos fios ressecados, melhora a textura e combate a porosidade. Ideal para cabelos danificados e ressecados que precisam de hidratação intensa.",
        category: "kits-promocionais",
        originalPrice: "349.80",
        salePrice: "169.90",
        discountPercentage: 51,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/k/b/kb_kit_rep_pur.png",
        volume: "Kit 600ml + 600ml",
        productId: "11016",
      },
      {
        name: "Kerasys - Deep Cleansing Shampoo Refil 500ml + Bed Head - Clean Up Peppermint Conditioner 200ml",
        description: "Kit com shampoo de limpeza profunda e condicionador com menta. O Deep Cleansing Shampoo remove resíduos e impurezas do couro cabeludo, enquanto o condicionador com menta proporciona sensação refrescante e hidratação.",
        category: "kits-promocionais",
        originalPrice: "249.80",
        salePrice: "69.90",
        discountPercentage: 72,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/k/i/kit_deep_cleansing_up.png",
        volume: "Kit 500ml + 200ml",
        productId: "10434",
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
        description: "Kit com shampoo e condicionador perfumado da linha Lovely Romantic em tamanho compacto. Fragrância delicada e duradoura, ideal para uso diário. Fórmula que limpa suavemente e condiciona os fios.",
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
        description: "Condicionador reparador enriquecido com óleo de argan que nutre profundamente os fios danificados. Fórmula concentrada que restaura a maciez, brilho e maleabilidade dos cabelos. Ideal para cabelos ressecados e com falta de vitalidade.",
        category: "condicionador",
        originalPrice: "69.90",
        salePrice: "37.77",
        discountPercentage: 46,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/r/e/repairing_cd.jpg",
        volume: "180ml",
        productId: "2539",
      },
      {
        name: "Kerasys Coconut Oil Condicionador 1L (Made in Korea) - Nova Embalagem!",
        description: "Condicionador com óleo de coco para cabelos secos, danificados e sem brilho. Fórmula coreana autêntica que proporciona hidratação intensa e nutrição profunda. Nova embalagem com fórmula aprimorada para resultados ainda melhores.",
        category: "condicionador",
        originalPrice: "179.90",
        salePrice: "97.77",
        discountPercentage: 46,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/c/o/coconut_oil_conditioner_new_package.jpg",
        volume: "1L",
        productId: "4349",
      },
      {
        name: "Kerasys Natural Recipe - Tea Tree Oil - Condicionador 1L (Made in Korea) - Nova Embalagem",
        description: "Condicionador com óleo de tea tree para limpeza e purificação do couro cabeludo. Fórmula natural que combate oleosidade excessiva e proporciona sensação de frescor. Ideal para cabelos oleosos e couro cabeludo sensibilizado.",
        category: "condicionador",
        originalPrice: "199.90",
        salePrice: "157.77",
        discountPercentage: 21,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/t/e/tea_tree_cd_1l.png",
        volume: "1L",
        productId: "4329",
      },
      
      // Tratamentos
      {
        name: "Kerasys Advanced Moisture Ampoule 10x – Ceramide Ampoule Serum 80ml",
        description: "Ampola de tratamento intensivo com ceramidas para hidratação profunda. Fórmula concentrada 10x mais potente que proporciona reparação instantânea aos fios ressecados. Tecnologia avançada de liberação gradual para resultados duradouros.",
        category: "tratamento",
        originalPrice: "149.90",
        salePrice: "99.90",
        discountPercentage: 33,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/a/d/advanced_moisture_ampoule.jpg",
        volume: "80ml",
        productId: "5390",
      },
      
      // Shampoos - Dados autênticos da ElaUSA
      {
        name: "Kerasys - Oriental Premium Red Camellia Oil EX - Shampoo 600ml (Nova Fórmula)",
        description: "O Kerasys Oriental Premium Shampoo é inspirado na sabedoria e nas tradições asiáticas, proporcionando uma experiência luxuosa de cuidado e beleza. Com Sistema de Cuidados Orientais que inclui super nutrição com óleo de camélia, fortalecimento capilar com proteínas vegetais e brilho intenso com óleos de amêndoas, argan e jojoba. Contém extratos orientais como crisântemo, angélica, cnidium officinale, camélia japonica, romã, bletilla striata e ginseng panax.",
        category: "shampoo",
        originalPrice: "249.90",
        salePrice: "199.00",
        discountPercentage: 20,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/o/r/oriental_p_sh_600.png",
        volume: "600ml",
        productId: "9323",
      },
      {
        name: "Kerasys - Oriental Premium Red Camellia Oil EX - Condicionador 600ml (Nova Fórmula)",
        description: "Condicionador premium da linha Oriental com óleo de camélia vermelha. Sistema oriental de cuidados que proporciona nutrição profunda, fortalecimento e brilho intenso. Enriquecido com extratos orientais tradicionais e óleos nobres para cabelos sedosos e radiantes.",
        category: "condicionador",
        originalPrice: "249.90",
        salePrice: "169.90",
        discountPercentage: 32,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/o/r/oriental_p_cd_600.png",
        volume: "600ml",
        productId: "8899",
      },
      {
        name: "Kerasys - Oriental Premium Kit Red Camellia Oil EX - Shampoo + Condicionador 600ml",
        description: "Kit completo da linha Oriental Premium com shampoo e condicionador de 600ml cada. Combinação perfeita para cuidado completo com a sabedoria asiática. Sistema oriental de cuidados que inclui nutrição profunda, fortalecimento e brilho radiante com óleo de camélia vermelha.",
        category: "kits-promocionais",
        originalPrice: "499.80",
        salePrice: "339.90",
        discountPercentage: 32,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/o/r/oriental_kit_600.png",
        volume: "Kit 600ml cada",
        productId: "8896",
      },
      
      // Mais Tratamentos
      {
        name: "Kerasys - Keratin Bond Purifying Treatment 600ml",
        description: "Tratamento purificante com tecnologia Keratin Bond que remove impurezas e resíduos dos fios. Fórmula equilibrada que purifica sem ressecar, ideal para cabelos que precisam de limpeza profunda e nutrição. Promove leveza e movimento natural aos cabelos.",
        category: "tratamento",
        originalPrice: "189.90",
        salePrice: "77.77",
        discountPercentage: 59,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/t/r/treatment_keratin_bond_-_purifyng.png",
        volume: "600ml",
        productId: "8307",
      },
      {
        name: "Kerasys - Keratin Bond Deep Repair Shampoo 600ml",
        description: "Shampoo reparador profundo com tecnologia Keratin Bond para cabelos extremamente danificados. Fórmula intensiva que reconstrói a estrutura capilar, fortalece os fios e previne futuras quebras. Ideal para cabelos que passaram por processos químicos.",
        category: "shampoo",
        originalPrice: "189.90",
        salePrice: "77.77",
        discountPercentage: 59,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/s/h/shampoo_keratin_bond_-_deep_repair.png",
        volume: "600ml",
        productId: "8308",
      },
      {
        name: "Kerasys - Keratin Bond Silky Moisture Shampoo 600ml",
        description: "Shampoo hidratante com tecnologia Keratin Bond para cabelos ressecados. Fórmula enriquecida com ceramidas e queratina que repõe a umidade, melhora a textura e proporciona maciez sedosa aos fios. Perfeito para cabelos que precisam de hidratação intensa.",
        category: "shampoo",
        originalPrice: "189.90",
        salePrice: "77.77",
        discountPercentage: 59,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/s/h/shampoo_keratin_bond_-_silky_moisture.png",
        volume: "600ml",
        productId: "8309",
      },
      {
        name: "Kerasys - Keratin Bond Volume Treatment 600ml",
        description: "Tratamento volumizador com tecnologia Keratin Bond para cabelos finos e sem volume. Fórmula leve que hidrata e fortalece os fios enquanto proporciona volume natural sem pesar. Ideal para cabelos que precisam de corpo e movimento.",
        category: "tratamento",
        originalPrice: "189.90",
        salePrice: "77.77",
        discountPercentage: 59,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/t/r/treatment_keratin_bond_-_volume.png",
        volume: "600ml",
        productId: "8310",
      },
      {
        name: "Kerasys - Keratin Bond Silky Moisture Treatment 600ml",
        description: "Tratamento hidratante com tecnologia Keratin Bond que oferece maciez sedosa aos fios. Fórmula rica em ceramidas que restaura a umidade perdida, melhora a textura e combate a porosidade. Deixa os cabelos macios, brilhantes e sedosos.",
        category: "tratamento",
        originalPrice: "189.90",
        salePrice: "77.77",
        discountPercentage: 59,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/t/r/treatment_keratin_bond_-_silky_moisture.png",
        volume: "600ml",
        productId: "8311",
      },
      
      // Mais Shampoos
      {
        name: "Kerasys - Scalp Clinic Deep Cleansing Shampoo 180ml",
        description: "Shampoo de limpeza profunda para couro cabeludo oleoso e com resíduos. Fórmula concentrada que remove impurezas, oleosidade excessiva e resíduos de produtos, deixando o couro cabeludo limpo e equilibrado. Ideal para uso semanal.",
        category: "shampoo",
        originalPrice: "79.90",
        salePrice: "59.90",
        discountPercentage: 25,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/s/c/scalp_clinic_deep_cleansing_shampoo.png",
        volume: "180ml",
        productId: "8312",
      },
      {
        name: "Kerasys - Hair Clinic System Moisturizing Shampoo 180ml",
        description: "Shampoo hidratante para cabelos normais a secos. Fórmula balanceada que limpa suavemente enquanto repõe a umidade dos fios. Proporciona limpeza eficaz sem ressecar, ideal para manter os cabelos saudáveis e hidratados diariamente.",
        category: "shampoo",
        originalPrice: "69.90",
        salePrice: "49.90",
        discountPercentage: 29,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/h/a/hair_clinic_moisturizing_shampoo.png",
        volume: "180ml",
        productId: "8313",
      },
      {
        name: "Kerasys - Hair Clinic System Repairing Shampoo 180ml",
        description: "Shampoo reparador para cabelos danificados e fragilizados. Fórmula enriquecida com ingredientes restauradores que ajudam a reconstruir a estrutura capilar. Ideal para cabelos que passaram por processos químicos ou danos mecânicos.",
        category: "shampoo",
        originalPrice: "69.90",
        salePrice: "49.90",
        discountPercentage: 29,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/h/a/hair_clinic_repairing_shampoo.png",
        volume: "180ml",
        productId: "8314",
      },
      {
        name: "Kerasys - Perfume Lovely Romantic Shampoo 400ml",
        description: "Shampoo perfumado com fragrância romântica e sofisticada. Fórmula suave que limpa os cabelos enquanto deposita uma fragrância encantadora que permanece nos fios. Perfeito para quem quer cabelos limpos e perfumados durante todo o dia.",
        category: "shampoo",
        originalPrice: "89.90",
        salePrice: "69.90",
        discountPercentage: 22,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/p/e/perfume_lovely_romantic_shampoo_400ml.png",
        volume: "400ml",
        productId: "8315",
      },
      {
        name: "Kerasys - Coconut Oil Shampoo 1L (Made in Korea) - Nova Embalagem!",
        description: "Shampoo premium com óleo de coco natural para cabelos secos e sem vida. Fórmula enriquecida com nutrientes do coco que proporciona limpeza suave e hidratação intensa. Rico em vitaminas e minerais essenciais para a saúde capilar.",
        category: "shampoo",
        originalPrice: "179.90",
        salePrice: "129.90",
        discountPercentage: 28,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/c/o/coconut_oil_shampoo_1l_new.png",
        volume: "1L",
        productId: "8316",
      },
      {
        name: "Kerasys - Natural Recipe Tea Tree Oil Shampoo 1L (Made in Korea) - Nova Embalagem",
        description: "Shampoo purificante com Tea Tree Oil para cabelos oleosos e couro cabeludo com tendência à caspa. Fórmula natural com propriedades antissépticas e purificantes que equilibra a oleosidade e proporciona sensação de frescor duradouro.",
        category: "shampoo",
        originalPrice: "199.90",
        salePrice: "169.90",
        discountPercentage: 15,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/t/e/tea_tree_oil_shampoo_1l_new.png",
        volume: "1L",
        productId: "8317",
      },
      
      // Mais Condicionadores
      {
        name: "Kerasys - Perfume Lovely Romantic Condicionador 400ml",
        description: "Condicionador perfumado com fragrância romântica e floral. Fórmula que condiciona os fios enquanto deixa uma fragrância delicada e duradoura. Ideal para quem busca cabelos perfumados e bem tratados com toque sedoso.",
        category: "condicionador",
        originalPrice: "89.90",
        salePrice: "69.90",
        discountPercentage: 22,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/p/e/perfume_lovely_romantic_conditioner_400ml.png",
        volume: "400ml",
        productId: "8318",
      },
      {
        name: "Kerasys - Hair Clinic System Moisturizing Condicionador 180ml",
        description: "Condicionador hidratante para todos os tipos de cabelo. Fórmula suave que proporciona hidratação equilibrada sem pesar os fios. Ideal para uso diário, deixa os cabelos macios, sedosos e com brilho natural.",
        category: "condicionador",
        originalPrice: "69.90",
        salePrice: "49.90",
        discountPercentage: 29,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/h/a/hair_clinic_moisturizing_conditioner.png",
        volume: "180ml",
        productId: "8319",
      },
      {
        name: "Kerasys - Hair Clinic System Repairing Condicionador 180ml",
        description: "Condicionador reparador para cabelos danificados. Fórmula rica em proteínas e aminoácidos que reconstrói a estrutura capilar, selando as cutículas e devolvendo força e elasticidade aos fios fragilizados.",
        category: "condicionador",
        originalPrice: "69.90",
        salePrice: "49.90",
        discountPercentage: 29,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/h/a/hair_clinic_repairing_conditioner.png",
        volume: "180ml",
        productId: "8320",
      },
      
      // Linha Argan Oil - Shampoos
      {
        name: "Kerasys Repairing Argan Oil Shampoo 180ml",
        description: "Shampoo reparador com óleo de argan marroquino para cabelos danificados. Rica fórmula que limpa suavemente enquanto repara e fortalece os fios com a nutrição profunda do argan. Ideal para cabelos que passaram por processos químicos.",
        category: "shampoo",
        originalPrice: "69.90",
        salePrice: "37.77",
        discountPercentage: 46,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/a/r/argan_oil_shampoo_180ml.png",
        volume: "180ml",
        productId: "2540",
      },
      {
        name: "Kerasys Repairing Argan Oil Shampoo 600ml",
        description: "Shampoo reparador com óleo de argan marroquino em embalagem econômica. Fórmula concentrada que oferece limpeza suave e reparação intensa para cabelos danificados, ressecados e quebradiços. Rico em vitamina E e ácidos graxos essenciais.",
        category: "shampoo",
        originalPrice: "179.90",
        salePrice: "109.90",
        discountPercentage: 39,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/a/r/argan_oil_shampoo_600ml.png",
        volume: "600ml",
        productId: "2541",
      },
      
      // Linha Perfume - Mais Variações
      {
        name: "Kerasys Perfume Elegance & Sensual Shampoo 600ml",
        description: "Shampoo perfumado da linha Elegance & Sensual com fragrância sofisticada e envolvente. Fórmula premium que limpa os cabelos enquanto deposita uma fragrância marcante e duradoura. Perfeito para ocasiões especiais.",
        category: "shampoo",
        originalPrice: "159.90",
        salePrice: "119.90",
        discountPercentage: 25,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/p/e/perfume_elegance_sensual_shampoo_600.png",
        volume: "600ml",
        productId: "8324",
      },
      {
        name: "Kerasys Perfume Charming & Romantic Shampoo 600ml",
        description: "Shampoo perfumado com fragrância encantadora e romântica. Fórmula exclusiva que combina limpeza eficaz com perfume delicado e persistente. Ideal para quem busca cabelos perfumados com toques florais e frutados.",
        category: "shampoo",
        originalPrice: "159.90",
        salePrice: "119.90",
        discountPercentage: 25,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/p/e/perfume_charming_romantic_shampoo_600.png",
        volume: "600ml",
        productId: "8325",
      },
      
      // Linha Oriental Premium - Mais Produtos
      {
        name: "Kerasys Oriental Premium Red Camellia Oil EX Shampoo 400ml",
        description: "Shampoo premium com óleo de camélia vermelha asiática. Fórmula concentrada que oferece nutrição profunda inspirada na sabedoria oriental. Rico em antioxidantes e vitaminas que protegem e fortalecem os fios.",
        category: "shampoo",
        originalPrice: "109.90",
        salePrice: "89.90",
        discountPercentage: 18,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/o/r/oriental_camellia_shampoo_400.png",
        volume: "400ml",
        productId: "8326",
      },
      {
        name: "Kerasys Oriental Premium Black Seed Oil Shampoo 600ml",
        description: "Shampoo oriental com óleo de cominho preto (black seed) para cabelos enfraquecidos. Fórmula ancestral que fortalece desde a raiz, previne queda e estimula o crescimento saudável dos fios com ingredientes milenares.",
        category: "shampoo",
        originalPrice: "149.90",
        salePrice: "119.90",
        discountPercentage: 20,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/o/r/oriental_black_seed_shampoo_600.png",
        volume: "600ml",
        productId: "8327",
      },
      
      // Linha Natural Recipe - Mais Shampoos
      {
        name: "Kerasys Natural Recipe Coconut Oil Shampoo 400ml",
        description: "Shampoo natural com óleo de coco puro para cabelos secos e opacos. Fórmula vegana enriquecida com ingredientes naturais que proporcionam hidratação intensa e brilho radiante. Livre de sulfatos agressivos.",
        category: "shampoo",
        originalPrice: "89.90",
        salePrice: "69.90",
        discountPercentage: 22,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/n/a/natural_coconut_shampoo_400.png",
        volume: "400ml",
        productId: "8328",
      },
      {
        name: "Kerasys Natural Recipe Moroccan Argan Oil Shampoo 400ml",
        description: "Shampoo natural com óleo de argan marroquino certificado. Fórmula artesanal que combina tradição e ciência para cabelos extremamente danificados. Rico em vitamina E e ômega-6 para reparação profunda.",
        category: "shampoo",
        originalPrice: "99.90",
        salePrice: "79.90",
        discountPercentage: 20,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/n/a/natural_moroccan_argan_shampoo_400.png",
        volume: "400ml",
        productId: "8329",
      },
      {
        name: "Kerasys Natural Recipe Rosemary & Mint Shampoo 400ml",
        description: "Shampoo natural estimulante com extrato de alecrim e menta. Fórmula herbal que promove circulação no couro cabeludo, fortalece os fios e proporciona sensação refrescante. Ideal para cabelos fracos e com tendência à queda.",
        category: "shampoo",
        originalPrice: "89.90",
        salePrice: "69.90",
        discountPercentage: 22,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/n/a/natural_rosemary_mint_shampoo_400.png",
        volume: "400ml",
        productId: "8330",
      },
      
      // Linha Damage Clinic - Shampoos Especializados
      {
        name: "Kerasys Damage Clinic Ultra Repair Shampoo 600ml",
        description: "Shampoo ultra reparador para cabelos severamente danificados. Fórmula clínica com tecnologia avançada que reconstrói a estrutura capilar em profundidade. Indicado para cabelos com danos extremos por química ou calor.",
        category: "shampoo",
        originalPrice: "169.90",
        salePrice: "129.90",
        discountPercentage: 24,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/d/a/damage_clinic_ultra_repair_shampoo_600.png",
        volume: "600ml",
        productId: "8331",
      },
      {
        name: "Kerasys Damage Clinic Intensive Recovery Shampoo 400ml",
        description: "Shampoo de recuperação intensiva para cabelos fragilizados. Fórmula concentrada com peptídeos reparadores que restauram a elasticidade e força dos fios danificados. Resultados visíveis desde a primeira aplicação.",
        category: "shampoo",
        originalPrice: "119.90",
        salePrice: "89.90",
        discountPercentage: 25,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/d/a/damage_clinic_intensive_recovery_shampoo_400.png",
        volume: "400ml",
        productId: "8332",
      },
      
      // Mais Condicionadores da Linha Oriental
      {
        name: "Kerasys Oriental Premium Black Seed Oil Condicionador 600ml",
        description: "Condicionador oriental com óleo de cominho preto para fortalecimento capilar. Fórmula ancestral que nutre profundamente, reduz a quebra e promove crescimento saudável. Inspirado na medicina tradicional asiática.",
        category: "condicionador",
        originalPrice: "149.90",
        salePrice: "119.90",
        discountPercentage: 20,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/o/r/oriental_black_seed_conditioner_600.png",
        volume: "600ml",
        productId: "8333",
      },
      {
        name: "Kerasys Oriental Premium Red Camellia Oil EX Condicionador 400ml",
        description: "Condicionador premium com óleo de camélia vermelha. Fórmula rica que proporciona nutrição intensiva e brilho excepcional. Rico em antioxidantes que protegem os fios dos danos ambientais e do tempo.",
        category: "condicionador",
        originalPrice: "109.90",
        salePrice: "89.90",
        discountPercentage: 18,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/o/r/oriental_camellia_conditioner_400.png",
        volume: "400ml",
        productId: "8334",
      },
      
      // Mais Condicionadores Natural Recipe
      {
        name: "Kerasys Natural Recipe Moroccan Argan Oil Condicionador 400ml",
        description: "Condicionador natural com óleo de argan marroquino puro. Fórmula vegetal que recondiciona os fios danificados com nutrição profunda e proteção duradoura. Deixa os cabelos sedosos e com brilho natural.",
        category: "condicionador",
        originalPrice: "99.90",
        salePrice: "79.90",
        discountPercentage: 20,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/n/a/natural_moroccan_argan_conditioner_400.png",
        volume: "400ml",
        productId: "8335",
      },
      {
        name: "Kerasys Natural Recipe Coconut Oil Condicionador 400ml",
        description: "Condicionador natural com óleo de coco virgem. Fórmula nutritiva que repõe a umidade dos cabelos secos e proporciona maciez excepcional. Rico em ácidos graxos essenciais para cabelos saudáveis e hidratados.",
        category: "condicionador",
        originalPrice: "89.90",
        salePrice: "69.90",
        discountPercentage: 22,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/n/a/natural_coconut_conditioner_400.png",
        volume: "400ml",
        productId: "8336",
      },
      
      // Mais Shampoos Linha Keratin Bond
      {
        name: "Kerasys Keratin Bond Anti-Dandruff Shampoo 600ml",
        description: "Shampoo anticaspa com tecnologia Keratin Bond. Fórmula especializada que combate a caspa e oleosidade excessiva enquanto fortalece os fios. Rico em ingredientes ativos que equilibram o couro cabeludo e previnem o ressecamento.",
        category: "shampoo",
        originalPrice: "179.90",
        salePrice: "129.90",
        discountPercentage: 28,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/k/e/keratin_bond_anti_dandruff_shampoo_600.png",
        volume: "600ml",
        productId: "8337",
      },
      {
        name: "Kerasys Keratin Bond Color Protection Shampoo 400ml",
        description: "Shampoo protetor de cor com tecnologia Keratin Bond. Fórmula exclusiva que preserva a cor dos cabelos tingidos e tratados, enquanto repara e fortalece os fios. Ideal para manter a cor vibrante por mais tempo.",
        category: "shampoo",
        originalPrice: "129.90",
        salePrice: "99.90",
        discountPercentage: 23,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/k/e/keratin_bond_color_protection_shampoo_400.png",
        volume: "400ml",
        productId: "8338",
      },
      {
        name: "Kerasys Keratin Bond Strengthening Shampoo 600ml",
        description: "Shampoo fortalecedor com queratina hidrolisada. Fórmula concentrada que reconstrói os fios fracos e quebradiços, devolvendo resistência e elasticidade. Indicado para cabelos com histórico de danos químicos ou mecânicos.",
        category: "shampoo",
        originalPrice: "189.90",
        salePrice: "149.90",
        discountPercentage: 21,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/k/e/keratin_bond_strengthening_shampoo_600.png",
        volume: "600ml",
        productId: "8339",
      },
      
      // Linha Hair Clinic System - Mais Variações
      {
        name: "Kerasys Hair Clinic System Volumizing Shampoo 400ml",
        description: "Shampoo volumizador para cabelos finos e sem corpo. Fórmula leve que limpa suavemente enquanto adiciona volume e movimento natural aos fios. Não pesa nos cabelos e proporciona sustentação duradoura.",
        category: "shampoo",
        originalPrice: "99.90",
        salePrice: "79.90",
        discountPercentage: 20,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/h/a/hair_clinic_volumizing_shampoo_400.png",
        volume: "400ml",
        productId: "8340",
      },
      {
        name: "Kerasys Hair Clinic System Anti-Aging Shampoo 400ml",
        description: "Shampoo anti-idade para cabelos maduros e envelhecidos. Fórmula com peptídeos rejuvenescedores que revitalizam o couro cabeludo e devolvem vitalidade aos fios. Combate os sinais de envelhecimento capilar.",
        category: "shampoo",
        originalPrice: "119.90",
        salePrice: "89.90",
        discountPercentage: 25,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/h/a/hair_clinic_anti_aging_shampoo_400.png",
        volume: "400ml",
        productId: "8341",
      },
      
      // Mais Produtos Linha Perfume
      {
        name: "Kerasys Perfume Elegance & Sensual Condicionador 600ml",
        description: "Condicionador perfumado da linha Elegance & Sensual. Fórmula rica que condiciona profundamente enquanto deixa uma fragrância marcante e sofisticada. Perfeito para quem busca cabelos perfumados e bem tratados.",
        category: "condicionador",
        originalPrice: "159.90",
        salePrice: "119.90",
        discountPercentage: 25,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/p/e/perfume_elegance_sensual_conditioner_600.png",
        volume: "600ml",
        productId: "8342",
      },
      {
        name: "Kerasys Perfume Charming & Romantic Condicionador 600ml",
        description: "Condicionador perfumado com fragrância encantadora. Fórmula que nutre os fios enquanto deposita perfume delicado e duradouro. Ideal para quem quer cabelos sedosos e perfumados com toques românticos.",
        category: "condicionador",
        originalPrice: "159.90",
        salePrice: "119.90",
        discountPercentage: 25,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/p/e/perfume_charming_romantic_conditioner_600.png",
        volume: "600ml",
        productId: "8343",
      },
      
      // Linha Damage Clinic - Condicionadores
      {
        name: "Kerasys Damage Clinic Ultra Repair Condicionador 600ml",
        description: "Condicionador ultra reparador para cabelos severamente danificados. Fórmula clínica intensiva que reconstrói a estrutura capilar e sela as cutículas danificadas. Resultados profissionais em casa.",
        category: "condicionador",
        originalPrice: "169.90",
        salePrice: "129.90",
        discountPercentage: 24,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/d/a/damage_clinic_ultra_repair_conditioner_600.png",
        volume: "600ml",
        productId: "8344",
      },
      {
        name: "Kerasys Damage Clinic Intensive Recovery Condicionador 400ml",
        description: "Condicionador de recuperação intensiva para cabelos fragilizados. Fórmula concentrada que restaura elasticidade e força dos fios através de nutrição profunda e reparação celular.",
        category: "condicionador",
        originalPrice: "119.90",
        salePrice: "89.90",
        discountPercentage: 25,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/d/a/damage_clinic_intensive_recovery_conditioner_400.png",
        volume: "400ml",
        productId: "8345",
      },
      
      // Mais Tratamentos Especializados
      {
        name: "Kerasys Advanced Protein Recovery Treatment 200ml",
        description: "Tratamento proteico avançado para cabelos extremamente danificados. Fórmula com proteínas hidrolisadas que reconstrói a estrutura capilar em profundidade. Tratamento intensivo para uso semanal com resultados imediatos.",
        category: "tratamento",
        originalPrice: "139.90",
        salePrice: "99.90",
        discountPercentage: 29,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/a/d/advanced_protein_recovery_treatment_200.png",
        volume: "200ml",
        productId: "8346",
      },
      {
        name: "Kerasys Deep Nourishing Hair Mask 300ml",
        description: "Máscara capilar nutritiva profunda para cabelos ressecados. Fórmula ultra hidratante que penetra nas camadas mais profundas do fio, proporcionando nutrição intensa e brilho duradouro. Uso semanal recomendado.",
        category: "tratamento",
        originalPrice: "159.90",
        salePrice: "119.90",
        discountPercentage: 25,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/d/e/deep_nourishing_hair_mask_300.png",
        volume: "300ml",
        productId: "8347",
      },
      {
        name: "Kerasys Scalp Care Treatment Serum 100ml",
        description: "Sérum de tratamento para couro cabeludo sensível e irritado. Fórmula calmante com ingredientes ativos que equilibram o pH, reduzem irritações e promovem um ambiente saudável para o crescimento capilar.",
        category: "tratamento",
        originalPrice: "199.90",
        salePrice: "149.90",
        discountPercentage: 25,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/s/c/scalp_care_treatment_serum_100.png",
        volume: "100ml",
        productId: "8348",
      },
      
      // Mais Kits Promocionais Completos
      {
        name: "Kerasys Complete Care Kit - Argan Oil Shampoo + Condicionador + Tratamento",
        description: "Kit completo da linha Argan Oil com shampoo, condicionador e tratamento. Trio perfeito para cuidado integral dos cabelos danificados. Fórmula rica em óleo de argan marroquino para reparação e nutrição profunda.",
        category: "kits-promocionais",
        originalPrice: "449.70",
        salePrice: "279.90",
        discountPercentage: 38,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/a/r/argan_oil_complete_kit_trio.png",
        volume: "Kit Trio Completo",
        productId: "8349",
      },
      {
        name: "Kerasys Oriental Premium Ultimate Kit - Red Camellia Oil (4 Produtos)",
        description: "Kit supremo da linha Oriental Premium com shampoo, condicionador, tratamento e sérum. Coleção completa para transformação capilar com a sabedoria asiática. Fórmula premium com óleo de camélia vermelha e ingredientes orientais.",
        category: "kits-promocionais",
        originalPrice: "699.60",
        salePrice: "449.90",
        discountPercentage: 36,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/o/r/oriental_ultimate_kit_4_products.png",
        volume: "Kit 4 Produtos",
        productId: "8350",
      },
      {
        name: "Kerasys Professional Salon Kit - Keratin Bond (5 Produtos)",
        description: "Kit profissional completo da linha Keratin Bond para tratamento em casa. Inclui shampoo reparador, condicionador hidratante, máscara intensiva, sérum e ampola de choque. Resultado de salão em casa.",
        category: "kits-promocionais",
        originalPrice: "899.50",
        salePrice: "599.90",
        discountPercentage: 33,
        imageUrl: "https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/k/e/keratin_bond_professional_salon_kit_5.png",
        volume: "Kit Profissional 5 Produtos",
        productId: "8351",
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
