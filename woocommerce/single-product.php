<?php
/**
 * The template for displaying product content in the single-product.php template
 */

defined('ABSPATH') || exit;

get_header('shop'); ?>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <?php kerasys_custom_breadcrumbs(); ?>
    
    <?php while (have_posts()) : ?>
        <?php the_post(); ?>
        
        <div id="product-<?php the_ID(); ?>" <?php wc_product_class('', $product); ?>>
            <div class="grid lg:grid-cols-2 gap-8">
                
                <!-- Product Image -->
                <div class="relative">
                    <?php
                    global $product;
                    if ($product->is_on_sale()) {
                        $regular_price = (float) $product->get_regular_price();
                        $sale_price = (float) $product->get_sale_price();
                        if ($regular_price > 0) {
                            $discount = round((($regular_price - $sale_price) / $regular_price) * 100);
                            echo '<div class="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-sm font-bold rounded z-10">-' . $discount . '%</div>';
                        }
                    }
                    ?>
                    
                    <?php woocommerce_show_product_images(); ?>
                </div>

                <!-- Product Info -->
                <div class="space-y-6">
                    <?php
                    /**
                     * Hook: woocommerce_single_product_summary.
                     */
                    do_action('woocommerce_single_product_summary');
                    ?>

                    <!-- Shipping and Guarantees -->
                    <div class="space-y-4 pt-6 border-t">
                        <div class="flex items-center gap-3">
                            <span class="text-green-600 font-semibold">🚚 Frete Grátis</span>
                            <span class="text-gray-600">• Disponível</span>
                        </div>
                        
                        <div class="flex items-center gap-2 text-sm text-gray-600">
                            <span>Enviado pelos</span>
                            <span class="font-semibold">Correios</span>
                        </div>

                        <div class="space-y-2 text-sm text-gray-600">
                            <div class="flex items-center gap-2">
                                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>Frete grátis. Você tem 7 dias a partir da data de recebimento.</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>Compra Garantida, receba o produto que está esperando ou devolvemos o dinheiro.</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span>Produto original Kerasys com garantia de autenticidade.</span>
                            </div>
                        </div>
                    </div>

                    <!-- Product Benefits -->
                    <div class="bg-purple-50 rounded-lg p-4">
                        <h4 class="font-semibold text-purple-900 mb-2">✨ Benefícios do Produto</h4>
                        <ul class="text-sm text-purple-800 space-y-1">
                            <li>• Fórmula coreana com tecnologia avançada</li>
                            <li>• Ingredientes naturais premium</li>
                            <li>• Resultados visíveis desde a primeira aplicação</li>
                            <li>• Adequado para uso diário</li>
                        </ul>
                    </div>
                </div>
            </div>

            <?php
            /**
             * Hook: woocommerce_after_single_product_summary.
             */
            do_action('woocommerce_after_single_product_summary');
            ?>
        </div>

        <!-- Related Products -->
        <div class="mt-16">
            <?php woocommerce_output_related_products(); ?>
        </div>

    <?php endwhile; ?>
</div>

<style>
/* Custom styles for product gallery */
.woocommerce div.product .woocommerce-product-gallery .woocommerce-product-gallery__image img {
    object-fit: contain !important;
    background: white !important;
    padding: 1rem !important;
    border-radius: 0.5rem !important;
    max-height: 24rem !important;
}

.woocommerce div.product .woocommerce-product-gallery .flex-control-thumbs li img {
    object-fit: contain !important;
    background: white !important;
    padding: 0.5rem !important;
    border-radius: 0.375rem !important;
    height: 4rem !important;
}
</style>

<?php get_footer('shop'); ?>