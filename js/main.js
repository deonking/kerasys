/**
 * Kerasys Brasil Theme JavaScript
 */

jQuery(document).ready(function($) {
    
    // Mobile menu toggle
    window.toggleMobileMenu = function() {
        const menu = document.getElementById('mobile-menu');
        if (menu) {
            menu.classList.toggle('hidden');
        }
    };

    // Add to cart AJAX for shop loop
    $(document).on('click', '.ajax_add_to_cart', function(e) {
        e.preventDefault();
        
        var $thisbutton = $(this);
        var productId = $thisbutton.data('product_id');
        var originalText = $thisbutton.text();
        
        // Show loading state
        $thisbutton.addClass('loading opacity-50 cursor-not-allowed').text('Adicionando...');
        
        $.ajax({
            type: 'POST',
            url: wc_add_to_cart_params.ajax_url,
            data: {
                'action': 'woocommerce_add_to_cart',
                'product_id': productId,
                'quantity': 1
            },
            success: function(response) {
                if (response.error && response.product_url) {
                    window.location = response.product_url;
                    return;
                }
                
                // Update cart fragments
                if (response.fragments) {
                    $.each(response.fragments, function(key, value) {
                        $(key).replaceWith(value);
                    });
                }
                
                // Success feedback
                $thisbutton.removeClass('loading opacity-50 cursor-not-allowed')
                          .addClass('bg-green-600')
                          .text('Adicionado!');
                
                // Show success message
                showNotification('Produto adicionado ao carrinho!', 'success');
                
                // Reset button after 2 seconds
                setTimeout(function() {
                    $thisbutton.removeClass('bg-green-600').text(originalText);
                }, 2000);
            },
            error: function() {
                $thisbutton.removeClass('loading opacity-50 cursor-not-allowed')
                          .addClass('bg-red-600')
                          .text('Erro');
                
                showNotification('Erro ao adicionar produto', 'error');
                
                setTimeout(function() {
                    $thisbutton.removeClass('bg-red-600').text(originalText);
                }, 2000);
            }
        });
    });

    // Product image zoom on hover (single product page)
    $('.woocommerce-product-gallery__image img').hover(
        function() {
            $(this).css('transform', 'scale(1.1)');
        },
        function() {
            $(this).css('transform', 'scale(1)');
        }
    );

    // Smooth scroll for anchor links
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 100
            }, 1000);
        }
    });

    // Product quantity buttons
    $(document).on('click', '.quantity-btn', function() {
        var $input = $(this).siblings('input[type="number"]');
        var currentVal = parseInt($input.val());
        var action = $(this).data('action');
        
        if (action === 'increase') {
            $input.val(currentVal + 1).trigger('change');
        } else if (action === 'decrease' && currentVal > 1) {
            $input.val(currentVal - 1).trigger('change');
        }
    });

    // Search functionality enhancement
    $('.search-form input[type="search"]').on('keyup', function() {
        var query = $(this).val();
        if (query.length > 2) {
            // You could implement live search here
            console.log('Searching for: ' + query);
        }
    });

    // Cart sidebar functionality (if implementing slide-out cart)
    function openCartSidebar() {
        $('body').addClass('cart-sidebar-open');
        $('.cart-sidebar-overlay').fadeIn(300);
        $('.cart-sidebar').addClass('open');
    }

    function closeCartSidebar() {
        $('body').removeClass('cart-sidebar-open');
        $('.cart-sidebar-overlay').fadeOut(300);
        $('.cart-sidebar').removeClass('open');
    }

    // Notification system
    function showNotification(message, type) {
        var notificationClass = type === 'success' ? 'bg-green-500' : 'bg-red-500';
        var notification = $('<div class="fixed top-4 right-4 ' + notificationClass + ' text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all transform translate-x-full">' + message + '</div>');
        
        $('body').append(notification);
        
        // Slide in
        setTimeout(function() {
            notification.removeClass('translate-x-full');
        }, 100);
        
        // Auto hide after 3 seconds
        setTimeout(function() {
            notification.addClass('translate-x-full');
            setTimeout(function() {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Form validation enhancement
    $('.woocommerce form').submit(function() {
        var isValid = true;
        
        $(this).find('input[required], select[required], textarea[required]').each(function() {
            if (!$(this).val()) {
                $(this).addClass('border-red-500');
                isValid = false;
            } else {
                $(this).removeClass('border-red-500');
            }
        });
        
        if (!isValid) {
            showNotification('Por favor, preencha todos os campos obrigatórios', 'error');
            return false;
        }
        
        return true;
    });

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Product filters (AJAX)
    $('.product-filter').on('change', function() {
        var filterData = {};
        
        $('.product-filter:checked').each(function() {
            var name = $(this).attr('name');
            var value = $(this).val();
            
            if (!filterData[name]) {
                filterData[name] = [];
            }
            filterData[name].push(value);
        });
        
        // Implement AJAX filter functionality here
        console.log('Filters:', filterData);
    });

    // Back to top button
    var backToTop = $('<button class="fixed bottom-4 right-4 bg-purple-600 text-white p-3 rounded-full shadow-lg opacity-0 transition-opacity z-40 hover:bg-purple-700"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg></button>');
    
    $('body').append(backToTop);
    
    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
            backToTop.css('opacity', '1');
        } else {
            backToTop.css('opacity', '0');
        }
    });
    
    backToTop.click(function() {
        $('html, body').animate({scrollTop: 0}, 600);
        return false;
    });

});

// Global functions
window.kerasysTheme = {
    showNotification: function(message, type) {
        // Implementation moved to jQuery ready function
        jQuery(document).ready(function($) {
            var notificationClass = type === 'success' ? 'bg-green-500' : 'bg-red-500';
            var notification = $('<div class="fixed top-4 right-4 ' + notificationClass + ' text-white px-6 py-3 rounded-lg shadow-lg z-50">' + message + '</div>');
            
            $('body').append(notification);
            
            setTimeout(function() {
                notification.fadeOut(300, function() {
                    $(this).remove();
                });
            }, 3000);
        });
    }
};