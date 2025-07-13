<?php
/**
 * The template for displaying product content within loops
 */

defined('ABSPATH') || exit;

global $product;

// Ensure visibility.
if (empty($product) || !$product->is_visible()) {
    return;
}
?>

<li <?php wc_product_class('kerasys-card group cursor-pointer', $product); ?>>
    <div class="relative">
        <?php
        // Discount badge
        if ($product->is_on_sale()) {
            $regular_price = (float) $product->get_regular_price();
            $sale_price = (float) $product->get_sale_price();
            if ($regular_price > 0) {
                $discount = round((($regular_price - $sale_price) / $regular_price) * 100);
                echo '<div class="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded z-10">-' . $discount . '%</div>';
            }
        }
        ?>
        
        <a href="<?php the_permalink(); ?>">
            <?php
            /**
             * Hook: woocommerce_before_shop_loop_item_title.
             */
            do_action('woocommerce_before_shop_loop_item_title');
            ?>
        </a>
    </div>

    <div class="p-3">
        <a href="<?php the_permalink(); ?>">
            <h3 class="text-xs text-gray-700 mb-2 line-clamp-2 hover:text-black">
                <?php the_title(); ?>
            </h3>
        </a>

        <?php
        /**
         * Hook: woocommerce_after_shop_loop_item_title.
         */
        do_action('woocommerce_after_shop_loop_item_title');
        ?>

        <!-- Price Display -->
        <div class="mb-2">
            <?php if ($product->is_on_sale()) : ?>
                <div class="text-gray-400 line-through text-sm">
                    <?php echo wc_price($product->get_regular_price()); ?>
                </div>
            <?php endif; ?>
            <div class="text-lg font-bold text-black">
                <?php echo wc_price($product->get_sale_price() ?: $product->get_regular_price()); ?>
            </div>
        </div>

        <?php
        // PIX price (10% discount)
        $current_price = $product->get_sale_price() ?: $product->get_regular_price();
        $pix_price = $current_price * 0.9;
        $installment_price = $current_price / 12;
        ?>

        <div class="text-xs text-gray-600 mb-1">
            <span class="font-medium">A vista</span> 
            <span class="text-green-600 font-bold"><?php echo wc_price($pix_price); ?></span> 
            <span class="text-gray-500">no Pix</span>
        </div>

        <div class="text-xs text-gray-600 mb-3">
            Em até 12x de <?php echo wc_price($installment_price); ?>
        </div>

        <?php
        /**
         * Hook: woocommerce_after_shop_loop_item.
         */
        do_action('woocommerce_after_shop_loop_item');
        ?>
    </div>
</li>

<style>
/* Custom styles for product thumbnails in loop */
.woocommerce ul.products li.product .woocommerce-loop-product__link img {
    width: 100% !important;
    height: 12rem !important;
    object-fit: contain !important;
    background: white !important;
    padding: 0.5rem !important;
}

.kerasys-card {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
}

.kerasys-card:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>