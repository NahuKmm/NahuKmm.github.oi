document.getElementById('productSearch').addEventListener('keyup', function() {
    let filter = this.value.toLowerCase();
    let products = document.querySelectorAll('.flex > div');

    products.forEach(product => {
        let title = product.querySelector('h6').innerText.toLowerCase();
        let description = product.querySelector('p').innerText.toLowerCase();
        if (title.includes(filter) || description.includes(filter)) {
            product.style.display = '';
        } else {
            product.style.display = 'none';
        }
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const cartModal = document.getElementById('cart-modal');
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout');
    const closeCartButton = document.getElementById('close-cart');
    const cartIcon = document.getElementById('cart');

    const products = [
        {
            id: 'NAHU1',
            name: 'Simple Butter-Colored Hoodie',
            price: 32000,
            image: 'buzo1.png'
        },
        
        {
            id: 'NAHU2',
            name: 'Simple Black-Colored Hoodie',
            price: 35000,
            image: 'buzo-hombre-mapi-negro-7003-frente-gef.webp',
        },

        {
            id: 'NAHU3',
            name: 'Oversized Ash-Colored Hoddie with Print',
            price: 50000,
            image: 'buzo2.jpg',

        },
        {
            id: 'NAHU4',
            name: 'Simple Pink-Colored Jacket',
            price: 52000,
            image: 'LEG-NEON-baja-90.jpg'
        },
        {
            id: 'NAHU5',
            name: 'Simple Cream-Colored Jacket',
            price: 55000,
            image: 'campera2.jpg',
        },
       
        {
            id: 'NAHU6',
            name: 'Simple White-Colored Jacket with Print',
            price: 60000,
            image: 'D_659360-MLA76268353483_052024-O.jpg',
        },
        {
            id: 'NAHU7',
            name: 'Simple Ash-Colored Sweater',
            price: 34000,
            image: '226875-500-auto.webp',
        },
        {
            id: 'NAHU8',
            name: 'Simple Burgundy-Colored Sweater',
            price: 34000,
            image: '226815-800-auto.webp'
        },
        {
            id: 'NAHU9',
            name: 'Wool Marine Blue-Colored Sweater',
            price: 63000,
            image: 'M60C4411_1 (1).jpg'
        },
        
    ];

    document.querySelectorAll('.btn-1, .btn-2, .btn-3, .btn-4, .btn-5, .btn-6, .btn-7, .btn-8, .btn-9').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.closest('div').id;
            addProductToCart(productId);
        });
    });

    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'block';
        updateCart();
        document.body.classList.add('modal-open');
    });

    closeCartButton.addEventListener('click', () => {
        cartModal.style.display = 'none';
        document.body.classList.remove('modal-open');
    });

    checkoutButton.addEventListener('click', () => {
        alert('Proceeding to checkout...');
        cart.length = 0;
        updateCart();
    });

    function addProductToCart(productId) {
        const product = products.find(p => p.id === productId);
        const cartProduct = cart.find(p => p.id === productId);

        if (cartProduct) {
            cartProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
    }

    function removeProductFromCart(productId) {
        const productIndex = cart.findIndex(p => p.id === productId);

        if (productIndex !== -1) {
            cart.splice(productIndex, 1);
        }
        updateCart();
    }

    function updateCart() {
        cartCount.textContent = cart.length;
        cartItemsContainer.innerHTML = '';

        let totalPrice = 0;

        cart.forEach(product => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${product.image}" width="50">
                <span>${product.name}</span>
                <span>${product.quantity} x $${product.price}</span>
                <button class="remove-product" data-id="${product.id}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);

            totalPrice += product.quantity * product.price;
        });

        totalPriceElement.textContent = `Total: $${totalPrice}`;

        document.querySelectorAll('.remove-product').forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-id');
                removeProductFromCart(productId);
            });
        });
    }
});
