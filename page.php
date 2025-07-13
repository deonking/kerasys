<?php
/**
 * The template for displaying all pages
 */

get_header(); ?>

<main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <?php while (have_posts()) : ?>
        <?php the_post(); ?>
        
        <article id="post-<?php the_ID(); ?>" <?php post_class('bg-white rounded-lg border border-gray-200 p-8'); ?>>
            <header class="entry-header mb-6">
                <h1 class="entry-title text-3xl font-bold text-gray-900"><?php the_title(); ?></h1>
            </header>

            <div class="entry-content prose prose-lg max-w-none">
                <?php
                the_content();

                wp_link_pages(array(
                    'before' => '<div class="page-links mt-6 pt-6 border-t border-gray-200">',
                    'after'  => '</div>',
                ));
                ?>
            </div>

            <?php if (get_edit_post_link()) : ?>
                <footer class="entry-footer mt-6 pt-6 border-t border-gray-200">
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
                </footer>
            <?php endif; ?>
        </article>

        <?php
        // If comments are open or we have at least one comment, load up the comment template.
        if (comments_open() || get_comments_number()) :
            comments_template();
        endif;
        ?>

    <?php endwhile; ?>
</main>

<?php get_footer(); ?>