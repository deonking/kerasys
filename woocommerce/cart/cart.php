<?php
/**
 * Cart Page
 */

defined('ABSPATH') || exit;

do_action('woocommerce_before_cart'); ?>

<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Carrinho de Compras</h1>

    <form class="woocommerce-cart-form" action="<?php echo esc_url(wc_get_cart_url()); ?>" method="post">
        <?php do_action('woocommerce_before_cart_table'); ?>

        <div class="bg-white rounded-lg border border-gray-200 overflow-hidden mb-8">
            <table class="shop_table shop_table_responsive cart woocommerce-cart-form__contents w-full" cellspacing="0">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="product-remove text-center p-4 w-16">&nbsp;</th>
                        <th class="product-thumbnail text-center p-4 w-24">&nbsp;</th>
                        <th class="product-name text-left p-4 font-semibold">Produto</th>
                        <th class="product-price text-center p-4 font-semibold">Preço</th>
                        <th class="product-quantity text-center p-4 font-semibold">Quantidade</th>
                        <th class="product-subtotal text-center p-4 font-semibold">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    <?php do_action('woocommerce_before_cart_contents'); ?>

                    <?php
                    foreach (WC()->cart->get_cart() as $cart_item_key => $cart_item) {
                        $_product   = apply_filters('woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key);
                        $product_id = apply_filters('woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key);

                        if ($_product && $_product->exists() && $cart_item['quantity'] > 0 && apply_filters('woocommerce_cart_item_visible', true, $cart_item, $cart_item_key)) {
                            $product_permalink = apply_filters('woocommerce_cart_item_permalink', $_product->is_visible() ? $_product->get_permalink($cart_item) : '', $cart_item, $cart_item_key);
                            ?>
                            <tr class="woocommerce-cart-form__cart-item <?php echo esc_attr(apply_filters('woocommerce_cart_item_class', 'cart_item', $cart_item, $cart_item_key)); ?> border-b border-gray-100">

                                <td class="product-remove text-center p-4">
                                    <?php
                                    echo apply_filters( // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
                                        'woocommerce_cart_item_remove_link',
                                        sprintf(
                                            '<a href="%s" class="text-red-500 hover:text-red-700 text-lg" aria-label="%s" data-product_id="%s" data-product_sku="%s">&times;</a>',
                                            esc_url(wc_get_cart_remove_url($cart_item_key)),
                                            esc_html__('Remove this item', 'woocommerce'),
                                            esc_attr($product_id),
                                            esc_attr($_product->get_sku())
                                        ),
                                        $cart_item_key
                                    );
                                    ?>
                                </td>

                                <td class="product-thumbnail text-center p-4">
                                    <?php
                                    $thumbnail = apply_filters('woocommerce_cart_item_thumbnail', $_product->get_image('thumbnail', array('class' => 'w-16 h-16 object-contain bg-white p-1 rounded')), $cart_item, $cart_item_key);

                                    if (!$product_permalink) {
                                        echo $thumbnail; // PHPCS: XSS ok.
                                    } else {
                                        printf('<a href="%s">%s</a>', esc_url($product_permalink), $thumbnail); // PHPCS: XSS ok.
                                    }
                                    ?>
                                </td>

                                <td class="product-name p-4" data-title="<?php esc_attr_e('Product', 'woocommerce'); ?>">
                                    <?php
                                    if (!$product_permalink) {
                                        echo wp_kses_post(apply_filters('woocommerce_cart_item_name', $_product->get_name(), $cart_item, $cart_item_key) . '&nbsp;');
                                    } else {
                                        echo wp_kses_post(apply_filters('woocommerce_cart_item_name', sprintf('<a href="%s" class="text-gray-900 hover:text-purple-600 font-medium">%s</a>', esc_url($product_permalink), $_product->get_name()), $cart_item, $cart_item_key));
                                    }

                                    do_action('woocommerce_after_cart_item_name', $cart_item, $cart_item_key);

                                    // Meta data.
                                    echo wc_get_formatted_cart_item_data($cart_item); // PHPCS: XSS ok.

                                    // Backorder notification.
                                    if ($_product->backorders_require_notification() && $_product->is_on_backorder($cart_item['quantity'])) {
                                        echo wp_kses_post(apply_filters('woocommerce_cart_item_backorder_notification', '<p class="backorder_notification text-sm text-orange-600 mt-1">' . esc_html__('Available on backorder', 'woocommerce') . '</p>', $product_id));
                                    }
                                    ?>
                                </td>

                                <td class="product-price text-center p-4" data-title="<?php esc_attr_e('Price', 'woocommerce'); ?>">
                                    <div class="text-lg font-semibold">
                                        <?php echo apply_filters('woocommerce_cart_item_price', WC()->cart->get_product_price($_product), $cart_item, $cart_item_key); // PHPCS: XSS ok. ?>
                                    </div>
                                </td>

                                <td class="product-quantity text-center p-4" data-title="<?php esc_attr_e('Quantity', 'woocommerce'); ?>">
                                    <?php
                                    if ($_product->is_sold_individually()) {
                                        $product_quantity = sprintf('1 <input type="hidden" name="cart[%s][qty]" value="1" />', $cart_item_key);
                                    } else {
                                        $product_quantity = woocommerce_quantity_input(
                                            array(
                                                'input_name'   => "cart[{$cart_item_key}][qty]",
                                                'input_value'  => $cart_item['quantity'],
                                                'max_value'    => $_product->get_max_purchase_quantity(),
                                                'min_value'    => '0',
                                                'product_name' => $_product->get_name(),
                                                'classes'      => array('border border-gray-300 rounded px-3 py-2 w-20 text-center'),
                                            ),
                                            $_product,
                                            false
                                        );
                                    }

                                    echo apply_filters('woocommerce_cart_item_quantity', $product_quantity, $cart_item_key, $cart_item); // PHPCS: XSS ok.
                                    ?>
                                </td>

                                <td class="product-subtotal text-center p-4" data-title="<?php esc_attr_e('Subtotal', 'woocommerce'); ?>">
                                    <div class="text-lg font-bold">
                                        <?php echo apply_filters('woocommerce_cart_item_subtotal', WC()->cart->get_product_subtotal($_product, $cart_item['quantity']), $cart_item, $cart_item_key); // PHPCS: XSS ok. ?>
                                    </div>
                                </td>
                            </tr>
                            <?php
                        }
                    }
                    ?>

                    <?php do_action('woocommerce_cart_contents'); ?>

                    <tr class="bg-gray-50">
                        <td colspan="6" class="actions p-4">
                            <div class="flex flex-col sm:flex-row justify-between items-center gap-4">
                                <a href="<?php echo esc_url(apply_filters('woocommerce_return_to_shop_redirect', wc_get_page_permalink('shop'))); ?>" class="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition-colors">
                                    ← Continuar Comprando
                                </a>

                                <?php if (wc_coupons_enabled()) { ?>
                                    <div class="coupon flex gap-2">
                                        <input type="text" name="coupon_code" class="border border-gray-300 rounded px-3 py-2" id="coupon_code" value="" placeholder="<?php esc_attr_e('Coupon code', 'woocommerce'); ?>" />
                                        <button type="submit" class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors" name="apply_coupon" value="<?php esc_attr_e('Apply coupon', 'woocommerce'); ?>">
                                            Aplicar Cupom
                                        </button>
                                        <?php do_action('woocommerce_cart_coupon'); ?>
                                    </div>
                                <?php } ?>

                                <button type="submit" class="kerasys-btn" name="update_cart" value="<?php esc_attr_e('Update cart', 'woocommerce'); ?>">
                                    Atualizar Carrinho
                                </button>

                                <?php do_action('woocommerce_cart_actions'); ?>
                                <?php wp_nonce_field('woocommerce-cart', 'woocommerce-cart-nonce'); ?>
                            </div>
                        </td>
                    </tr>

                    <?php do_action('woocommerce_after_cart_contents'); ?>
                </tbody>
            </table>
        </div>

        <?php do_action('woocommerce_after_cart_table'); ?>
    </form>

    <?php do_action('woocommerce_before_cart_collaterals'); ?>

    <div class="cart-collaterals">
        <div class="cart_totals bg-white rounded-lg border border-gray-200 p-6 max-w-md ml-auto">
            <?php
            /**
             * Cart collaterals hook.
             */
            do_action('woocommerce_cart_collaterals');
            ?>
        </div>
    </div>
</div>

<?php do_action('woocommerce_after_cart'); ?>