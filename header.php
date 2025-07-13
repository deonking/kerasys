<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Top Bar -->
        <div class="hidden lg:flex justify-between items-center py-2 text-sm text-gray-600 border-b border-gray-100">
            <div class="flex items-center space-x-6">
                <span>📞 (11) 99999-9999</span>
                <span>✉️ contato@kerasys.com.br</span>
            </div>
            <div class="flex items-center space-x-4">
                <span>🚚 Frete Grátis acima de R$99</span>
                <span>💳 12x sem juros</span>
            </div>
        </div>

        <!-- Main Header -->
        <div class="flex items-center justify-between py-4">
            <!-- Logo -->
            <div class="flex items-center">
                <?php if (has_custom_logo()) : ?>
                    <?php the_custom_logo(); ?>
                <?php else : ?>
                    <a href="<?php echo esc_url(home_url('/')); ?>" class="text-2xl font-bold kerasys-gradient bg-clip-text text-transparent">
                        Kerasys Brasil
                    </a>
                <?php endif; ?>
            </div>

            <!-- Search Bar -->
            <div class="hidden md:flex flex-1 max-w-lg mx-8">
                <?php if (class_exists('WooCommerce')) : ?>
                    <?php get_product_search_form(); ?>
                <?php else : ?>
                    <?php get_search_form(); ?>
                <?php endif; ?>
            </div>

            <!-- Cart & Account -->
            <div class="flex items-center space-x-4">
                <?php if (class_exists('WooCommerce')) : ?>
                    <!-- Account -->
                    <a href="<?php echo esc_url(wc_get_page_permalink('myaccount')); ?>" class="text-gray-600 hover:text-purple-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                    </a>

                    <!-- Cart -->
                    <a href="<?php echo esc_url(wc_get_cart_url()); ?>" class="relative text-gray-600 hover:text-purple-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l-2.5 5m0 0h5m-5 0a1 1 0 102 0M19 18a1 1 0 102 0"></path>
                        </svg>
                        <?php if (WC()->cart->get_cart_contents_count() > 0) : ?>
                            <span class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                <?php echo WC()->cart->get_cart_contents_count(); ?>
                            </span>
                        <?php endif; ?>
                    </a>
                <?php endif; ?>

                <!-- Mobile Menu Button -->
                <button class="md:hidden text-gray-600 hover:text-purple-600" onclick="toggleMobileMenu()">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:block pb-4">
            <?php
            wp_nav_menu(array(
                'theme_location' => 'primary',
                'menu_class'     => 'flex space-x-8 text-sm font-medium',
                'container'      => false,
                'fallback_cb'    => 'kerasys_default_menu',
            ));
            ?>
        </nav>

        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden md:hidden pb-4">
            <?php
            wp_nav_menu(array(
                'theme_location' => 'primary',
                'menu_class'     => 'space-y-2',
                'container'      => false,
                'fallback_cb'    => 'kerasys_default_mobile_menu',
            ));
            ?>
        </div>
    </div>
</header>

<?php
// Default menu fallback
function kerasys_default_menu() {
    echo '<ul class="flex space-x-8 text-sm font-medium">';
    echo '<li><a href="' . home_url('/') . '" class="text-gray-700 hover:text-purple-600">Início</a></li>';
    if (class_exists('WooCommerce')) {
        echo '<li><a href="' . get_permalink(wc_get_page_id('shop')) . '" class="text-gray-700 hover:text-purple-600">Produtos</a></li>';
        echo '<li><a href="' . get_permalink(wc_get_page_id('shop')) . '?product_cat=shampoo" class="text-gray-700 hover:text-purple-600">Shampoos</a></li>';
        echo '<li><a href="' . get_permalink(wc_get_page_id('shop')) . '?product_cat=condicionador" class="text-gray-700 hover:text-purple-600">Condicionadores</a></li>';
        echo '<li><a href="' . get_permalink(wc_get_page_id('shop')) . '?product_cat=tratamento" class="text-gray-700 hover:text-purple-600">Tratamentos</a></li>';
    }
    echo '<li><a href="' . home_url('/contato') . '" class="text-gray-700 hover:text-purple-600">Contato</a></li>';
    echo '</ul>';
}

function kerasys_default_mobile_menu() {
    echo '<div class="space-y-2">';
    echo '<a href="' . home_url('/') . '" class="block py-2 text-gray-700 hover:text-purple-600">Início</a>';
    if (class_exists('WooCommerce')) {
        echo '<a href="' . get_permalink(wc_get_page_id('shop')) . '" class="block py-2 text-gray-700 hover:text-purple-600">Produtos</a>';
        echo '<a href="' . get_permalink(wc_get_page_id('shop')) . '?product_cat=shampoo" class="block py-2 text-gray-700 hover:text-purple-600">Shampoos</a>';
        echo '<a href="' . get_permalink(wc_get_page_id('shop')) . '?product_cat=condicionador" class="block py-2 text-gray-700 hover:text-purple-600">Condicionadores</a>';
        echo '<a href="' . get_permalink(wc_get_page_id('shop')) . '?product_cat=tratamento" class="block py-2 text-gray-700 hover:text-purple-600">Tratamentos</a>';
    }
    echo '<a href="' . home_url('/contato') . '" class="block py-2 text-gray-700 hover:text-purple-600">Contato</a>';
    echo '</div>';
}
?>

<script>
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
}
</script>