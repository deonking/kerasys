<?php
/**
 * My Account Page
 */

defined('ABSPATH') || exit;

?>

<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <?php
    /**
     * My Account navigation.
     */
    do_action('woocommerce_account_navigation');
    ?>

    <div class="grid lg:grid-cols-4 gap-8">
        <!-- Account Navigation -->
        <div class="lg:col-span-1">
            <div class="bg-white rounded-lg border border-gray-200 p-6">
                <h3 class="text-lg font-semibold mb-4">Minha Conta</h3>
                <nav class="space-y-2">
                    <?php foreach (wc_get_account_menu_items() as $endpoint => $label) : ?>
                        <a href="<?php echo esc_url(wc_get_account_endpoint_url($endpoint)); ?>" 
                           class="block px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded <?php echo wc_get_account_menu_item_classes($endpoint); ?>">
                            <?php echo esc_html($label); ?>
                        </a>
                    <?php endforeach; ?>
                </nav>
            </div>
        </div>

        <!-- Account Content -->
        <div class="lg:col-span-3">
            <div class="bg-white rounded-lg border border-gray-200 p-6">
                <?php
                /**
                 * My Account content.
                 */
                do_action('woocommerce_account_content');
                ?>
            </div>
        </div>
    </div>
</div>

<style>
.woocommerce-account .woocommerce-MyAccount-navigation {
    display: none; /* Hide default navigation since we have custom one */
}

.woocommerce-account .is-active {
    background-color: #F3F4F6;
    color: #8B5CF6;
    font-weight: 600;
}

.woocommerce-account table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1.5rem;
}

.woocommerce-account table th,
.woocommerce-account table td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #E5E7EB;
}

.woocommerce-account table th {
    background-color: #F9FAFB;
    font-weight: 600;
    color: #374151;
}

.woocommerce-account .button {
    background: #8B5CF6;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.375rem;
    text-decoration: none;
    display: inline-block;
    font-size: 0.875rem;
    transition: background-color 0.3s;
}

.woocommerce-account .button:hover {
    background: #7C3AED;
    color: white;
}
</style>