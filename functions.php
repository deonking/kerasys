<?php
/**
 * Kerasys Brasil Theme Functions
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Theme Setup
 */
function kerasys_brasil_setup() {
    // Add theme support
    add_theme_support('post-thumbnails');
    add_theme_support('title-tag');
    add_theme_support('custom-logo');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    
    // WooCommerce support
    add_theme_support('woocommerce');
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'kerasys-brasil'),
        'footer' => __('Footer Menu', 'kerasys-brasil'),
    ));
    
    // Add image sizes
    add_image_size('product-thumbnail', 300, 300, true);
    add_image_size('product-single', 600, 600, true);
}
add_action('after_setup_theme', 'kerasys_brasil_setup');

/**
 * Enqueue scripts and styles
 */
function kerasys_brasil_scripts() {
    // Enqueue styles
    wp_enqueue_style('kerasys-brasil-style', get_stylesheet_uri(), array(), '1.0.0');
    wp_enqueue_style('tailwindcss', 'https://cdn.tailwindcss.com/3.4.1', array(), '3.4.1');
    
    // Enqueue scripts
    wp_enqueue_script('kerasys-brasil-main', get_template_directory_uri() . '/js/main.js', array('jquery'), '1.0.0', true);
    
    // WooCommerce scripts
    if (is_woocommerce() || is_cart() || is_checkout()) {
        wp_enqueue_script('wc-add-to-cart-variation');
    }
}
add_action('wp_enqueue_scripts', 'kerasys_brasil_scripts');

/**
 * Register widget areas
 */
function kerasys_brasil_widgets_init() {
    register_sidebar(array(
        'name'          => __('Shop Sidebar', 'kerasys-brasil'),
        'id'            => 'shop-sidebar',
        'description'   => __('Add widgets here to appear in shop pages.', 'kerasys-brasil'),
        'before_widget' => '<section id="%1$s" class="widget %2$s mb-6">',
        'after_widget'  => '</section>',
        'before_title'  => '<h3 class="widget-title text-lg font-semibold mb-4">',
        'after_title'   => '</h3>',
    ));
    
    register_sidebar(array(
        'name'          => __('Footer Widgets', 'kerasys-brasil'),
        'id'            => 'footer-widgets',
        'description'   => __('Add widgets here to appear in the footer.', 'kerasys-brasil'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="widget-title text-white font-semibold mb-4">',
        'after_title'   => '</h4>',
    ));
}
add_action('widgets_init', 'kerasys_brasil_widgets_init');

/**
 * WooCommerce Customizations
 */

// Remove default WooCommerce styles
add_filter('woocommerce_enqueue_styles', '__return_empty_array');

// Custom product loop
remove_action('woocommerce_before_shop_loop_item', 'woocommerce_template_loop_product_link_open', 10);
remove_action('woocommerce_after_shop_loop_item', 'woocommerce_template_loop_product_link_close', 5);
remove_action('woocommerce_shop_loop_item_title', 'woocommerce_template_loop_product_title', 10);
remove_action('woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_rating', 5);
remove_action('woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_price', 10);
remove_action('woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10);

// Add custom product loop
add_action('woocommerce_before_shop_loop_item', 'kerasys_custom_product_loop_start', 10);
add_action('woocommerce_after_shop_loop_item', 'kerasys_custom_product_loop_end', 20);

function kerasys_custom_product_loop_start() {
    global $product;
    echo '<div class="kerasys-card group cursor-pointer">';
    echo '<div class="relative">';
    
    // Discount badge
    if ($product->is_on_sale()) {
        $regular_price = (float) $product->get_regular_price();
        $sale_price = (float) $product->get_sale_price();
        if ($regular_price > 0) {
            $discount = round((($regular_price - $sale_price) / $regular_price) * 100);
            echo '<div class="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded z-10">-' . $discount . '%</div>';
        }
    }
    
    echo '<a href="' . get_permalink() . '">';
}

function kerasys_custom_product_loop_end() {
    global $product;
    
    echo '</a></div>'; // Close image link and relative div
    
    echo '<div class="p-3">';
    echo '<a href="' . get_permalink() . '">';
    echo '<h3 class="text-xs text-gray-700 mb-2 line-clamp-2 hover:text-black">' . get_the_title() . '</h3>';
    echo '</a>';
    
    // Price
    echo '<div class="mb-2">';
    if ($product->is_on_sale()) {
        echo '<div class="text-gray-400 line-through text-sm">' . wc_price($product->get_regular_price()) . '</div>';
    }
    echo '<div class="text-lg font-bold text-black">' . wc_price($product->get_sale_price() ?: $product->get_regular_price()) . '</div>';
    echo '</div>';
    
    // PIX price (10% discount)
    $current_price = $product->get_sale_price() ?: $product->get_regular_price();
    $pix_price = $current_price * 0.9;
    $installment_price = $current_price / 12;
    
    echo '<div class="text-xs text-gray-600 mb-1">';
    echo '<span class="font-medium">A vista</span> <span class="text-green-600 font-bold">' . wc_price($pix_price) . '</span> <span class="text-gray-500">no Pix</span>';
    echo '</div>';
    
    echo '<div class="text-xs text-gray-600 mb-3">';
    echo 'Em até 12x de ' . wc_price($installment_price);
    echo '</div>';
    
    // Add to cart button
    woocommerce_template_loop_add_to_cart();
    
    echo '</div>'; // Close product info div
    echo '</div>'; // Close product card
}

// Customize add to cart button
function kerasys_custom_add_to_cart_button() {
    global $product;
    
    echo sprintf(
        '<a href="%s" data-quantity="1" class="%s" %s>%s</a>',
        esc_url($product->add_to_cart_url()),
        'kerasys-btn ajax_add_to_cart add_to_cart_button',
        wc_implode_html_attributes(array(
            'data-product_id'  => $product->get_id(),
            'data-product_sku' => $product->get_sku(),
            'aria-label'       => $product->add_to_cart_description(),
            'rel'              => 'nofollow',
        )),
        'Comprar'
    );
}

// Change number of products per page
add_filter('loop_shop_per_page', function() {
    return 12;
}, 20);

// Custom breadcrumbs
function kerasys_custom_breadcrumbs() {
    if (function_exists('woocommerce_breadcrumb')) {
        woocommerce_breadcrumb(array(
            'delimiter'   => ' › ',
            'wrap_before' => '<nav class="woocommerce-breadcrumb text-sm text-gray-600 mb-6">',
            'wrap_after'  => '</nav>',
            'before'      => '',
            'after'       => '',
            'home'        => 'Início',
        ));
    }
}

// Add PIX payment method info
function kerasys_add_pix_info() {
    echo '<div class="pix-info bg-green-50 border border-green-200 rounded-lg p-4 mb-4">';
    echo '<p class="text-green-800 font-semibold">💚 Pague no PIX e ganhe 10% de desconto!</p>';
    echo '<p class="text-green-600 text-sm">Desconto aplicado automaticamente no checkout.</p>';
    echo '</div>';
}
add_action('woocommerce_before_add_to_cart_form', 'kerasys_add_pix_info');

// Custom single product layout
remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_title', 5);
remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_rating', 10);
remove_action('woocommerce_single_product_summary', 'woocommerce_template_single_price', 10);

add_action('woocommerce_single_product_summary', 'kerasys_custom_single_product_title', 5);
add_action('woocommerce_single_product_summary', 'kerasys_custom_single_product_price', 10);

function kerasys_custom_single_product_title() {
    echo '<div class="flex items-center gap-2 mb-4">';
    echo '<span class="bg-orange-500 text-white px-2 py-1 text-xs font-semibold rounded">Mais Vendido</span>';
    echo '</div>';
    echo '<h1 class="text-3xl font-bold text-gray-900 mb-6">' . get_the_title() . '</h1>';
}

function kerasys_custom_single_product_price() {
    global $product;
    
    echo '<div class="space-y-2 mb-6">';
    
    if ($product->is_on_sale()) {
        echo '<div class="text-gray-400 line-through text-lg">' . wc_price($product->get_regular_price()) . '</div>';
    }
    
    $current_price = $product->get_sale_price() ?: $product->get_regular_price();
    echo '<div class="text-4xl font-bold text-gray-900">' . wc_price($current_price) . '</div>';
    
    $pix_price = $current_price * 0.9;
    $installment_price = $current_price / 12;
    
    echo '<div class="space-y-1 text-sm">';
    echo '<div class="text-gray-700">';
    echo '<span class="font-medium">A vista</span> <span class="text-green-600 font-bold">' . wc_price($pix_price) . '</span> <span class="text-gray-500">no Pix</span>';
    echo '</div>';
    echo '<div class="text-gray-600">Em até 12x de ' . wc_price($installment_price) . '</div>';
    echo '</div>';
    echo '</div>';
}

// Import Kerasys products
function kerasys_import_products() {
    if (get_option('kerasys_products_imported')) {
        return;
    }
    
    $products_data = array(
        array(
            'name' => 'Kerasys - Keratin Bond Silky Moisture Shampoo 600ml',
            'price' => 149.90,
            'sale_price' => 109.90,
            'description' => 'Shampoo da linha Keratin Bond com tecnologia de ligação proteica para cabelos danificados. Fórmula com ceramidas e ácido cítrico que reconstrói a estrutura capilar oferecendo maciez sedosa e brilho intenso.',
            'image' => 'https://elausa.com.br/media/catalog/product/cache/7e6530eafeba14d76580b06e3b5d93ee/k/e/keratin_bond_-_silky_moisture_1.png',
            'category' => 'shampoo',
            'sku' => 'keratin_bond_sh_600',
        ),
        array(
            'name' => 'Kerasys Moisturizing Baobab Oil Condicionador 600ml',
            'price' => 129.90,
            'sale_price' => 89.90,
            'description' => 'Condicionador hidratante com óleo de baobá africano para cabelos secos e ressecados. Rico em vitaminas A, D, E e F, proporciona hidratação profunda e nutrição intensa.',
            'image' => 'https://elausa.com.br/media/catalog/product/cache/6b43fd4dce2c19d548b80844c5c1dd03/m/o/moisturizing_conditioner_2.jpg',
            'category' => 'condicionador',
            'sku' => 'moisturizing_cd_600',
        ),
        array(
            'name' => 'Kerasys Argan Oil Serum 100ml',
            'price' => 159.90,
            'sale_price' => 99.90,
            'description' => 'Sérum leave-in com óleo de argan concentrado para finalização e proteção. Fórmula não oleosa que protege contra danos térmicos até 230°C, controla frizz e adiciona brilho intenso.',
            'image' => 'https://elausa.com.br/media/catalog/product/cache/de15d049429dcfdbb1ad0a5ba12093f7/_/e/_ex_100ml_.png',
            'category' => 'tratamento',
            'sku' => 'argan_oil_serum_100ml',
        ),
    );
    
    foreach ($products_data as $product_data) {
        $product = new WC_Product_Simple();
        $product->set_name($product_data['name']);
        $product->set_regular_price($product_data['price']);
        $product->set_sale_price($product_data['sale_price']);
        $product->set_description($product_data['description']);
        $product->set_short_description($product_data['description']);
        $product->set_sku($product_data['sku']);
        $product->set_catalog_visibility('visible');
        $product->set_status('publish');
        $product->save();
        
        // Set category
        $category_term = get_term_by('slug', $product_data['category'], 'product_cat');
        if (!$category_term) {
            $category_term = wp_insert_term($product_data['category'], 'product_cat');
            $category_term = get_term($category_term['term_id']);
        }
        wp_set_object_terms($product->get_id(), $category_term->term_id, 'product_cat');
        
        // Set image from URL
        $image_id = kerasys_upload_image_from_url($product_data['image'], $product_data['name']);
        if ($image_id) {
            $product->set_image_id($image_id);
            $product->save();
        }
    }
    
    update_option('kerasys_products_imported', true);
}
add_action('after_switch_theme', 'kerasys_import_products');

// Helper function to upload image from URL
function kerasys_upload_image_from_url($image_url, $image_name) {
    $upload_dir = wp_upload_dir();
    $image_data = file_get_contents($image_url);
    
    if (!$image_data) {
        return false;
    }
    
    $filename = sanitize_file_name($image_name) . '.jpg';
    $file = $upload_dir['path'] . '/' . $filename;
    
    file_put_contents($file, $image_data);
    
    $attachment = array(
        'post_mime_type' => 'image/jpeg',
        'post_title'     => $image_name,
        'post_content'   => '',
        'post_status'    => 'inherit'
    );
    
    $attach_id = wp_insert_attachment($attachment, $file);
    require_once(ABSPATH . 'wp-admin/includes/image.php');
    $attach_data = wp_generate_attachment_metadata($attach_id, $file);
    wp_update_attachment_metadata($attach_id, $attach_data);
    
    return $attach_id;
}

// Custom image proxy for external images
function kerasys_image_proxy() {
    if (isset($_GET['kerasys_image_proxy']) && $_GET['url']) {
        $url = esc_url_raw($_GET['url']);
        $image_data = wp_remote_get($url);
        
        if (!is_wp_error($image_data)) {
            $content_type = wp_remote_retrieve_header($image_data, 'content-type');
            header('Content-Type: ' . $content_type);
            header('Cache-Control: public, max-age=86400');
            echo wp_remote_retrieve_body($image_data);
            exit;
        }
    }
}
add_action('init', 'kerasys_image_proxy');