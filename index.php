<?php
/**
 * The main template file for Kerasys Brasil theme
 */

get_header(); ?>

<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <?php if (have_posts()) : ?>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <?php while (have_posts()) : the_post(); ?>
                <article class="kerasys-card">
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="relative">
                            <a href="<?php the_permalink(); ?>">
                                <?php the_post_thumbnail('medium', array('class' => 'product-image-responsive')); ?>
                            </a>
                        </div>
                    <?php endif; ?>
                    
                    <div class="p-4">
                        <h2 class="text-lg font-semibold mb-2">
                            <a href="<?php the_permalink(); ?>" class="text-gray-900 hover:text-purple-600">
                                <?php the_title(); ?>
                            </a>
                        </h2>
                        <div class="text-gray-600 text-sm">
                            <?php the_excerpt(); ?>
                        </div>
                        <a href="<?php the_permalink(); ?>" class="kerasys-btn mt-4 inline-block text-center">
                            Leia Mais
                        </a>
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
            <h1 class="text-2xl font-bold text-gray-900 mb-4">Nenhum conteúdo encontrado</h1>
            <p class="text-gray-600">Desculpe, não encontramos nenhum conteúdo para exibir.</p>
        </div>
    <?php endif; ?>
</main>

<?php get_footer(); ?>