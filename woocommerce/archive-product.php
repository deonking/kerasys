<?php
/**
 * The template for displaying product archives, including the main shop page which is a post type archive
 */

defined('ABSPATH') || exit;

get_header('shop'); ?>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <?php kerasys_custom_breadcrumbs(); ?>
    
    <header class="woocommerce-products-header mb-8">
        <?php if (apply_filters('woocommerce_show_page_title', true)) : ?>
            <h1 class="woocommerce-products-header__title page-title text-3xl font-bold text-gray-900 mb-4">
                <?php woocommerce_page_title(); ?>
            </h1>
        <?php endif; ?>

        <?php
        /**
         * Hook: woocommerce_archive_description.
         */
        do_action('woocommerce_archive_description');
        ?>
    </header>

    <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar -->
        <div class="lg:w-1/4">
            <div class="bg-white rounded-lg border border-gray-200 p-6">
                <h3 class="text-lg font-semibold mb-4">Filtros</h3>
                
                <!-- Categories Filter -->
                <div class="mb-6">
                    <h4 class="font-medium mb-3">Categorias</h4>
                    <?php
                    $product_categories = get_terms(array(
                        'taxonomy' => 'product_cat',
                        'hide_empty' => true,
                    ));
                    
                    if ($product_categories) :
                        echo '<ul class="space-y-2">';
                        foreach ($product_categories as $category) :
                            $category_link = get_term_link($category);
                            echo '<li>';
                            echo '<a href="' . esc_url($category_link) . '" class="text-sm text-gray-600 hover:text-purple-600">';
                            echo esc_html($category->name) . ' (' . $category->count . ')';
                            echo '</a>';
                            echo '</li>';
                        endforeach;
                        echo '</ul>';
                    endif;
                    ?>
                </div>

                <!-- Price Filter -->
                <div class="mb-6">
                    <h4 class="font-medium mb-3">Faixa de Preço</h4>
                    <?php if (is_active_sidebar('shop-sidebar')) : ?>
                        <?php dynamic_sidebar('shop-sidebar'); ?>
                    <?php else : ?>
                        <div class="space-y-2 text-sm">
                            <a href="<?php echo esc_url(add_query_arg('max_price', '50', get_pagenum_link())); ?>" class="block text-gray-600 hover:text-purple-600">Até R$50</a>
                            <a href="<?php echo esc_url(add_query_arg(array('min_price' => '50', 'max_price' => '100'), get_pagenum_link())); ?>" class="block text-gray-600 hover:text-purple-600">R$50 - R$100</a>
                            <a href="<?php echo esc_url(add_query_arg(array('min_price' => '100', 'max_price' => '200'), get_pagenum_link())); ?>" class="block text-gray-600 hover:text-purple-600">R$100 - R$200</a>
                            <a href="<?php echo esc_url(add_query_arg('min_price', '200', get_pagenum_link())); ?>" class="block text-gray-600 hover:text-purple-600">Acima de R$200</a>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>

        <!-- Products -->
        <div class="lg:w-3/4">
            <?php if (woocommerce_product_loop()) : ?>
                
                <!-- Toolbar -->
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-gray-50 p-4 rounded-lg">
                    <div class="flex items-center space-x-4 mb-4 sm:mb-0">
                        <?php woocommerce_result_count(); ?>
                    </div>
                    <div class="flex items-center space-x-4">
                        <?php woocommerce_catalog_ordering(); ?>
                    </div>
                </div>

                <?php woocommerce_product_loop_start(); ?>

                <div class="product-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <?php
                    if (wc_get_loop_prop('is_shortcode')) {
                        $columns = absint(wc_get_loop_prop('columns'));
                        $columns_class = $columns ? ' columns-' . $columns : '';
                    }

                    while (have_posts()) {
                        the_post();
                        /**
                         * Hook: woocommerce_shop_loop.
                         */
                        do_action('woocommerce_shop_loop');

                        wc_get_template_part('content', 'product');
                    }
                    ?>
                </div>

                <?php woocommerce_product_loop_end(); ?>

                <?php
                /**
                 * Hook: woocommerce_after_shop_loop.
                 */
                do_action('woocommerce_after_shop_loop');
                ?>

            <?php else : ?>
                <div class="text-center py-16">
                    <h2 class="text-2xl font-bold text-gray-900 mb-4">Nenhum produto encontrado</h2>
                    <p class="text-gray-600 mb-6">Não encontramos produtos que correspondam aos seus critérios de busca.</p>
                    <a href="<?php echo esc_url(get_permalink(wc_get_page_id('shop'))); ?>" class="kerasys-btn inline-block">
                        Ver Todos os Produtos
                    </a>
                </div>
            <?php endif; ?>
        </div>
    </div>
</div>

<?php get_footer('shop'); ?>