<footer class="bg-gray-900 text-white mt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid md:grid-cols-4 gap-8">
            <!-- Company Info -->
            <div class="md:col-span-1">
                <h3 class="text-lg font-bold mb-4 kerasys-gradient bg-clip-text text-transparent">
                    Kerasys Brasil
                </h3>
                <p class="text-gray-300 text-sm mb-4">
                    Produtos coreanos premium para cuidados capilares. Tecnologia avançada para cabelos saudáveis e bonitos.
                </p>
                <div class="flex space-x-4">
                    <a href="#" class="text-gray-400 hover:text-white">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                        </svg>
                    </a>
                    <a href="#" class="text-gray-400 hover:text-white">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                        </svg>
                    </a>
                    <a href="#" class="text-gray-400 hover:text-white">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.749-1.378l-.748 2.853c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.017.001z.017.001"/>
                        </svg>
                    </a>
                </div>
            </div>

            <!-- Quick Links -->
            <div>
                <h4 class="font-semibold mb-4">Links Rápidos</h4>
                <ul class="space-y-2 text-sm">
                    <li><a href="<?php echo home_url('/'); ?>" class="text-gray-300 hover:text-white">Início</a></li>
                    <?php if (class_exists('WooCommerce')) : ?>
                        <li><a href="<?php echo get_permalink(wc_get_page_id('shop')); ?>" class="text-gray-300 hover:text-white">Produtos</a></li>
                        <li><a href="<?php echo get_permalink(wc_get_page_id('myaccount')); ?>" class="text-gray-300 hover:text-white">Minha Conta</a></li>
                        <li><a href="<?php echo get_permalink(wc_get_page_id('cart')); ?>" class="text-gray-300 hover:text-white">Carrinho</a></li>
                    <?php endif; ?>
                    <li><a href="<?php echo home_url('/contato'); ?>" class="text-gray-300 hover:text-white">Contato</a></li>
                </ul>
            </div>

            <!-- Categories -->
            <div>
                <h4 class="font-semibold mb-4">Categorias</h4>
                <ul class="space-y-2 text-sm">
                    <?php if (class_exists('WooCommerce')) : ?>
                        <li><a href="<?php echo get_permalink(wc_get_page_id('shop')); ?>?product_cat=shampoo" class="text-gray-300 hover:text-white">Shampoos</a></li>
                        <li><a href="<?php echo get_permalink(wc_get_page_id('shop')); ?>?product_cat=condicionador" class="text-gray-300 hover:text-white">Condicionadores</a></li>
                        <li><a href="<?php echo get_permalink(wc_get_page_id('shop')); ?>?product_cat=tratamento" class="text-gray-300 hover:text-white">Tratamentos</a></li>
                        <li><a href="<?php echo get_permalink(wc_get_page_id('shop')); ?>?product_cat=kits-promocionais" class="text-gray-300 hover:text-white">Kits Promocionais</a></li>
                    <?php endif; ?>
                </ul>
            </div>

            <!-- Contact Info -->
            <div>
                <h4 class="font-semibold mb-4">Atendimento</h4>
                <ul class="space-y-2 text-sm text-gray-300">
                    <li>📞 (11) 99999-9999</li>
                    <li>✉️ contato@kerasys.com.br</li>
                    <li>🕒 Seg-Sex: 9h às 18h</li>
                    <li>🚚 Frete grátis acima de R$99</li>
                </ul>
            </div>
        </div>

        <!-- Footer Bottom -->
        <div class="border-t border-gray-700 mt-8 pt-8">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <p class="text-gray-400 text-sm">
                    © <?php echo date('Y'); ?> Kerasys Brasil. Todos os direitos reservados.
                </p>
                <div class="flex space-x-6 mt-4 md:mt-0">
                    <a href="<?php echo home_url('/politica-de-privacidade'); ?>" class="text-gray-400 hover:text-white text-sm">Política de Privacidade</a>
                    <a href="<?php echo home_url('/termos-de-uso'); ?>" class="text-gray-400 hover:text-white text-sm">Termos de Uso</a>
                    <a href="<?php echo home_url('/frete-e-entrega'); ?>" class="text-gray-400 hover:text-white text-sm">Frete e Entrega</a>
                </div>
            </div>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>

<!-- Custom JavaScript -->
<script>
// Add to cart AJAX functionality
jQuery(document).ready(function($) {
    $('.ajax_add_to_cart').on('click', function(e) {
        e.preventDefault();
        
        var $thisbutton = $(this);
        var productId = $thisbutton.data('product_id');
        
        $thisbutton.addClass('loading').text('Adicionando...');
        
        $.ajax({
            type: 'POST',
            url: wc_add_to_cart_params.ajax_url,
            data: {
                'action': 'woocommerce_add_to_cart',
                'product_id': productId,
                'quantity': 1
            },
            success: function(response) {
                if (response.error) {
                    $thisbutton.removeClass('loading').text('Erro');
                } else {
                    $thisbutton.removeClass('loading').text('Adicionado!');
                    
                    // Update cart count
                    $('.cart-contents-count').text(response.fragments['.cart-contents-count']);
                    
                    // Reset button after 2 seconds
                    setTimeout(function() {
                        $thisbutton.text('Comprar');
                    }, 2000);
                }
            },
            error: function() {
                $thisbutton.removeClass('loading').text('Erro');
            }
        });
    });
});
</script>

</body>
</html>