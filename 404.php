<?php
/**
 * The template for displaying 404 pages (not found)
 */

get_header(); ?>

<main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="text-center py-16">
        <div class="mb-8">
            <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 class="text-2xl font-semibold text-gray-700 mb-6">Página não encontrada</h2>
            <p class="text-gray-600 mb-8 max-w-md mx-auto">
                Desculpe, a página que você está procurando não existe ou foi movida.
            </p>
        </div>

        <div class="space-y-4 mb-8">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="kerasys-btn inline-block">
                Voltar ao Início
            </a>
            
            <?php if (class_exists('WooCommerce')) : ?>
                <a href="<?php echo esc_url(get_permalink(wc_get_page_id('shop'))); ?>" class="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors inline-block ml-4">
                    Ver Produtos
                </a>
            <?php endif; ?>
        </div>

        <!-- Search Form -->
        <div class="max-w-md mx-auto">
            <h3 class="text-lg font-semibold mb-4">Procure pelo que você quer:</h3>
            <?php get_search_form(); ?>
        </div>

        <!-- Popular Products -->
        <?php if (class_exists('WooCommerce')) : ?>
            <div class="mt-16">
                <h3 class="text-xl font-semibold mb-6">Produtos Populares</h3>
                <div class="grid md:grid-cols-3 gap-6">
                    <?php
                    $popular_products = wc_get_products(array(
                        'limit' => 3,
                        'orderby' => 'popularity',
                        'order' => 'DESC',
                    ));
                    
                    foreach ($popular_products as $product) :
                        $product_id = $product->get_id();
                        $product_name = $product->get_name();
                        $product_price = $product->get_price_html();
                        $product_image = wp_get_attachment_image_src(get_post_thumbnail_id($product_id), 'medium');
                        $product_url = get_permalink($product_id);
                    ?>
                        <div class="kerasys-card">
                            <a href="<?php echo esc_url($product_url); ?>">
                                <?php if ($product_image) : ?>
                                    <img src="<?php echo esc_url($product_image[0]); ?>" alt="<?php echo esc_attr($product_name); ?>" class="product-image-responsive">
                                <?php endif; ?>
                                <div class="p-4">
                                    <h4 class="font-medium mb-2"><?php echo esc_html($product_name); ?></h4>
                                    <div class="text-lg font-bold"><?php echo $product_price; ?></div>
                                </div>
                            </a>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        <?php endif; ?>
    </div>
</main>

<?php get_footer(); ?>