<?php
/**
 * The template for displaying search results pages
 */

get_header(); ?>

<main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <header class="page-header mb-8">
        <h1 class="page-title text-3xl font-bold text-gray-900">
            <?php
            printf(esc_html__('Resultados da busca por: %s', 'kerasys-brasil'), '<span class="text-purple-600">' . get_search_query() . '</span>');
            ?>
        </h1>
        
        <div class="mt-4">
            <?php get_search_form(); ?>
        </div>
    </header>

    <?php if (have_posts()) : ?>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <?php while (have_posts()) : ?>
                <?php the_post(); ?>
                
                <article id="post-<?php the_ID(); ?>" <?php post_class('kerasys-card'); ?>>
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="relative">
                            <a href="<?php the_permalink(); ?>">
                                <?php the_post_thumbnail('medium', array('class' => 'w-full h-48 object-cover')); ?>
                            </a>
                        </div>
                    <?php endif; ?>
                    
                    <div class="p-4">
                        <header class="entry-header mb-2">
                            <h2 class="entry-title text-lg font-semibold">
                                <a href="<?php the_permalink(); ?>" class="text-gray-900 hover:text-purple-600">
                                    <?php the_title(); ?>
                                </a>
                            </h2>
                        </header>

                        <div class="entry-summary text-gray-600 text-sm mb-3">
                            <?php the_excerpt(); ?>
                        </div>

                        <div class="entry-meta text-xs text-gray-500">
                            <time class="published" datetime="<?php echo esc_attr(get_the_date('c')); ?>">
                                <?php echo get_the_date(); ?>
                            </time>
                            <?php if (get_post_type() === 'product' && class_exists('WooCommerce')) : ?>
                                <span class="ml-2 inline-block bg-purple-100 text-purple-800 px-2 py-1 rounded">
                                    Produto
                                </span>
                            <?php endif; ?>
                        </div>
                    </div>
                </article>
                
            <?php endwhile; ?>
        </div>

        <?php the_posts_pagination(array(
            'prev_text' => '← Anterior',
            'next_text' => 'Próximo →',
            'class' => 'flex justify-center mt-8'
        )); ?>

    <?php else : ?>
        <div class="text-center py-16">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Nenhum resultado encontrado</h2>
            <p class="text-gray-600 mb-6">
                Não encontramos resultados para "<?php echo get_search_query(); ?>". 
                Tente usar palavras-chave diferentes ou navegue por nossas categorias.
            </p>
            
            <?php if (class_exists('WooCommerce')) : ?>
                <div class="space-x-4">
                    <a href="<?php echo esc_url(get_permalink(wc_get_page_id('shop'))); ?>" class="kerasys-btn inline-block">
                        Ver Todos os Produtos
                    </a>
                    <a href="<?php echo esc_url(home_url('/')); ?>" class="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors inline-block">
                        Voltar ao Início
                    </a>
                </div>
                
                <!-- Suggested Products -->
                <div class="mt-16">
                    <h3 class="text-xl font-semibold mb-6">Produtos que você pode gostar:</h3>
                    <div class="grid md:grid-cols-3 gap-6">
                        <?php
                        $suggested_products = wc_get_products(array(
                            'limit' => 3,
                            'orderby' => 'rand',
                        ));
                        
                        foreach ($suggested_products as $product) :
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
    <?php endif; ?>
</main>

<?php get_footer(); ?>