<?php
/**
 * Checkout Form
 */

defined('ABSPATH') || exit;

do_action('woocommerce_before_checkout_form', $checkout);

// If checkout registration is disabled and not logged in, the user cannot checkout.
if (!$checkout->is_registration_enabled() && $checkout->is_registration_required() && !is_user_logged_in()) {
    echo esc_html(apply_filters('woocommerce_checkout_must_be_logged_in_message', __('You must be logged in to checkout.', 'woocommerce')));
    return;
}
?>

<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Finalizar Compra</h1>

    <form name="checkout" method="post" class="checkout woocommerce-checkout" action="<?php echo esc_url(wc_get_checkout_url()); ?>" enctype="multipart/form-data">

        <div class="grid lg:grid-cols-2 gap-8">
            <!-- Billing & Shipping Info -->
            <div class="space-y-6">
                <?php if ($checkout->get_checkout_fields()) : ?>
                    <?php do_action('woocommerce_checkout_before_customer_details'); ?>

                    <div id="customer_details">
                        <div class="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 class="text-xl font-semibold mb-4">Dados de Cobrança</h2>
                            <?php do_action('woocommerce_checkout_billing'); ?>
                        </div>

                        <div class="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 class="text-xl font-semibold mb-4">Dados de Entrega</h2>
                            <?php do_action('woocommerce_checkout_shipping'); ?>
                        </div>
                    </div>

                    <?php do_action('woocommerce_checkout_after_customer_details'); ?>

                <?php endif; ?>

                <!-- Additional Information -->
                <div class="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 class="text-lg font-semibold mb-4">Informações Adicionais</h3>
                    <?php do_action('woocommerce_checkout_before_order_review_heading'); ?>
                    <?php if (apply_filters('woocommerce_enable_order_notes_field', 'yes' === get_option('woocommerce_enable_checkout_notes_field'))) : ?>
                        <?php foreach ($checkout->get_checkout_fields('order') as $key => $field) : ?>
                            <?php woocommerce_form_field($key, $field, $checkout->get_value($key)); ?>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </div>
            </div>

            <!-- Order Review -->
            <div class="space-y-6">
                <div class="bg-white rounded-lg border border-gray-200 p-6 sticky top-8">
                    <h3 id="order_review_heading" class="text-xl font-semibold mb-4">Seu Pedido</h3>
                    
                    <?php do_action('woocommerce_checkout_before_order_review'); ?>

                    <div id="order_review" class="woocommerce-checkout-review-order">
                        <?php do_action('woocommerce_checkout_order_review'); ?>
                    </div>

                    <?php do_action('woocommerce_checkout_after_order_review'); ?>

                    <!-- PIX Discount Info -->
                    <div class="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                        <p class="text-green-800 font-semibold text-sm">💚 Pague no PIX e ganhe 10% de desconto!</p>
                        <p class="text-green-600 text-xs mt-1">Desconto aplicado automaticamente para pagamentos via PIX.</p>
                    </div>

                    <!-- Security Info -->
                    <div class="flex items-center justify-center space-x-4 mt-6 pt-4 border-t border-gray-200">
                        <div class="flex items-center text-sm text-gray-600">
                            <svg class="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path>
                            </svg>
                            Pagamento Seguro
                        </div>
                        <div class="flex items-center text-sm text-gray-600">
                            <svg class="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                            </svg>
                            SSL Certificado
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>

    <?php do_action('woocommerce_after_checkout_form', $checkout); ?>
</div>

<style>
.woocommerce-checkout .form-row {
    margin-bottom: 1rem;
}

.woocommerce-checkout label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #374151;
}

.woocommerce-checkout input[type="text"],
.woocommerce-checkout input[type="email"],
.woocommerce-checkout input[type="tel"],
.woocommerce-checkout select,
.woocommerce-checkout textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #D1D5DB;
    border-radius: 0.375rem;
    font-size: 0.875rem;
}

.woocommerce-checkout input:focus,
.woocommerce-checkout select:focus,
.woocommerce-checkout textarea:focus {
    outline: none;
    border-color: #8B5CF6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.woocommerce-checkout .required {
    color: #EF4444;
}

.place-order {
    width: 100%;
    background: #000;
    color: white;
    padding: 1rem;
    border: none;
    border-radius: 0.375rem;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

.place-order:hover {
    background: #374151;
}
</style>