<?php
/**
 * The template for displaying all single posts
 */

get_header(); ?>

<main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <?php while (have_posts()) : ?>
        <?php the_post(); ?>

        <article id="post-<?php the_ID(); ?>" <?php post_class('bg-white rounded-lg border border-gray-200 p-8'); ?>>
            <header class="entry-header mb-6">
                <h1 class="entry-title text-3xl font-bold text-gray-900 mb-4"><?php the_title(); ?></h1>
                
                <div class="entry-meta flex items-center space-x-4 text-sm text-gray-600">
                    <time class="published" datetime="<?php echo esc_attr(get_the_date('c')); ?>">
                        <?php echo get_the_date(); ?>
                    </time>
                    <span>por <?php the_author(); ?></span>
                    <?php if (has_category()) : ?>
                        <span>em <?php the_category(', '); ?></span>
                    <?php endif; ?>
                </div>
            </header>

            <?php if (has_post_thumbnail()) : ?>
                <div class="entry-thumbnail mb-6">
                    <?php the_post_thumbnail('large', array('class' => 'w-full h-64 object-cover rounded-lg')); ?>
                </div>
            <?php endif; ?>

            <div class="entry-content prose prose-lg max-w-none">
                <?php
                the_content(sprintf(
                    wp_kses(
                        __('Continue reading<span class="screen-reader-text"> "%s"</span>', 'kerasys-brasil'),
                        array(
                            'span' => array(
                                'class' => array(),
                            ),
                        )
                    ),
                    get_the_title()
                ));

                wp_link_pages(array(
                    'before' => '<div class="page-links mt-6 pt-6 border-t border-gray-200">',
                    'after'  => '</div>',
                ));
                ?>
            </div>

            <footer class="entry-footer mt-6 pt-6 border-t border-gray-200">
                <div class="flex flex-wrap items-center justify-between">
                    <?php if (has_tag()) : ?>
                        <div class="tags">
                            <span class="text-sm text-gray-600">Tags: </span>
                            <?php the_tags('<span class="inline-block bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded mr-2">', '</span><span class="inline-block bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded mr-2">', '</span>'); ?>
                        </div>
                    <?php endif; ?>
                    
                    <?php if (get_edit_post_link()) : ?>
                        <?php
                        edit_post_link(
                            sprintf(
                                wp_kses(
                                    __('Edit <span class="screen-reader-text">"%s"</span>', 'kerasys-brasil'),
                                    array(
                                        'span' => array(
                                            'class' => array(),
                                        ),
                                    )
                                ),
                                get_the_title()
                            ),
                            '<span class="edit-link text-sm text-gray-500 hover:text-purple-600">',
                            '</span>'
                        );
                        ?>
                    <?php endif; ?>
                </div>
            </footer>
        </article>

        <nav class="post-navigation mt-8">
            <div class="nav-links flex justify-between">
                <?php
                previous_post_link('<div class="nav-previous">%link</div>', '← %title');
                next_post_link('<div class="nav-next">%link</div>', '%title →');
                ?>
            </div>
        </nav>

        <?php
        // If comments are open or we have at least one comment, load up the comment template.
        if (comments_open() || get_comments_number()) :
            comments_template();
        endif;
        ?>

    <?php endwhile; ?>
</main>

<?php get_footer(); ?>