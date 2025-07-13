# Kerasys Brasil - Tema WooCommerce

Um tema WordPress/WooCommerce profissional para e-commerce de produtos capilares Kerasys Brasil, convertido de aplicação React/Express para WordPress nativo.

## 🚀 Instalação

### Pré-requisitos
- WordPress 6.0+
- WooCommerce 8.0+
- PHP 8.0+

### Instalação do Tema

1. **Download do tema**
   - Faça download de todos os arquivos do tema
   - Crie um arquivo ZIP com todos os arquivos

2. **Upload no WordPress**
   ```
   WordPress Admin → Aparência → Temas → Adicionar Novo → Enviar Tema
   ```

3. **Ativação**
   - Ative o tema "Kerasys Brasil"
   - O tema automaticamente configurará o suporte ao WooCommerce

### Configuração Inicial

1. **WooCommerce Setup**
   - Configure WooCommerce seguindo o assistente
   - Configure métodos de pagamento (PIX, cartão, boleto)
   - Configure zonas de entrega

2. **Importação de Produtos**
   - Os produtos Kerasys serão importados automaticamente na primeira ativação
   - Verifique em `Produtos → Todos os Produtos`

3. **Páginas Necessárias**
   - Shop (Loja)
   - Carrinho
   - Finalizar Compra
   - Minha Conta
   - Política de Privacidade

## 🎨 Características do Tema

### Design Responsivo
- **Mobile First**: Otimizado para dispositivos móveis
- **Tablet/Desktop**: Layout adaptativo para todas as telas
- **Imagens Responsivas**: `object-contain` para mostrar produtos completos

### Funcionalidades E-commerce
- **Carrinho AJAX**: Adição de produtos sem recarregar página
- **Desconto PIX**: 10% automático para pagamentos PIX
- **Parcelas**: Até 12x sem juros
- **Frete Grátis**: Configurável por valor mínimo

### Integração WooCommerce
- **Templates Customizados**: Todos os templates WooCommerce personalizados
- **Área do Cliente**: Layout moderno para conta do usuário
- **Checkout Otimizado**: Processo de compra simplificado
- **Filtros de Produto**: Por categoria e preço

## 🛠️ Customizações

### Cores e Styling
Edite `style.css` para personalizar:
```css
:root {
  --primary-purple: #8B5CF6;
  --primary-pink: #EC4899;
  --text-dark: #1F2937;
}
```

### JavaScript Personalizado
Funcionalidades em `js/main.js`:
- AJAX cart
- Notificações
- Mobile menu
- Product filters

### Functions.php
Principais customizações:
- Suporte WooCommerce
- Import de produtos
- Custom product loop
- PIX integration

## 📁 Estrutura de Arquivos

```
kerasys-brasil-theme/
├── style.css                 # CSS principal + header do tema
├── functions.php             # Funcionalidades e hooks
├── header.php               # Cabeçalho
├── footer.php               # Rodapé
├── index.php                # Template principal
├── page.php                 # Páginas estáticas
├── single.php               # Posts individuais
├── 404.php                  # Página não encontrada
├── search.php               # Resultados de busca
├── js/
│   └── main.js              # JavaScript customizado
└── woocommerce/
    ├── archive-product.php   # Página de produtos
    ├── single-product.php    # Produto individual
    ├── content-product.php   # Loop de produtos
    ├── cart/
    │   └── cart.php         # Carrinho
    ├── checkout/
    │   └── form-checkout.php # Checkout
    └── myaccount/
        └── my-account.php   # Área do cliente
```

## 🎯 Produtos Inclusos

O tema vem com **50+ produtos autênticos** Kerasys pré-configurados:

### Categorias
- **Shampoos**: Keratin Bond, Oriental Premium, Moisturizing, etc.
- **Condicionadores**: Baobab Oil, Argan Oil, Revitalizing, etc.
- **Tratamentos**: Séruns, máscaras, ampolas terapêuticas
- **Kits Promocionais**: Combos com desconto

### Características dos Produtos
- **Imagens Reais**: Fotos autênticas de retailers (iHerb, ElaUSA)
- **Preços Brasileiros**: Valores em reais com descontos
- **Descrições Completas**: Benefícios e modo de uso
- **SKUs Únicos**: Códigos de produto organizados

## 🔧 Configurações Recomendadas

### WooCommerce
```php
// Produtos por página
add_filter('loop_shop_per_page', function() {
    return 12;
});

// Thumbnails
add_theme_support('wc-product-gallery-zoom');
add_theme_support('wc-product-gallery-lightbox');
add_theme_support('wc-product-gallery-slider');
```

### WordPress
- **Permalinks**: `/%postname%/`
- **Tamanhos de Imagem**: 300x300 (produto), 600x600 (single)
- **Widgets**: Footer widgets, shop sidebar

## 💳 Integração PIX

O tema inclui integração PIX nativa:

1. **Desconto Automático**: 10% no checkout
2. **Visual**: Badges e informações destacadas
3. **Cálculo**: Preço PIX exibido em todos os produtos

Para ativar pagamentos PIX reais, instale um plugin compatível:
- WooCommerce PIX
- Pagar.me
- Mercado Pago

## 📱 Suporte Mobile

### Características Mobile
- **Navigation**: Menu mobile responsivo
- **Product Grid**: 1-2 colunas em mobile
- **Touch**: Otimizado para toque
- **Loading**: Lazy loading para imagens

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🎨 Personalização

### Logo
```php
// Adicionar logo personalizado
add_theme_support('custom-logo');
```

### Menus
- **Primary Menu**: Navegação principal
- **Footer Menu**: Links do rodapé

### Widgets
- **Shop Sidebar**: Filtros da loja
- **Footer Widgets**: Informações do rodapé

## 🚀 Performance

### Otimizações Incluídas
- **Lazy Loading**: Imagens carregadas conforme necessário
- **CDN**: Tailwind CSS via CDN
- **Minification**: CSS e JS otimizados
- **Caching**: Headers de cache para imagens

### Recomendações
- Use um plugin de cache (WP Rocket, W3 Total Cache)
- Configure CDN para imagens
- Otimize banco de dados regularmente

## 🛡️ Segurança

### Recursos de Segurança
- **Sanitização**: Todos os inputs sanitizados
- **Nonces**: Proteção CSRF
- **Escape**: Output escapado
- **Validation**: Validação de formulários

## 📞 Suporte

Para dúvidas sobre o tema:
1. Verifique a documentação WordPress/WooCommerce
2. Consulte os arquivos de template
3. Teste em ambiente staging primeiro

## 📄 Licença

Este tema foi desenvolvido especificamente para Kerasys Brasil e mantém todas as funcionalidades da aplicação React/Express original em formato WordPress/WooCommerce nativo.

---

**Versão**: 1.0  
**Testado com**: WordPress 6.4, WooCommerce 8.5  
**Requer**: PHP 8.0+, WooCommerce 8.0+