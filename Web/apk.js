const cartIcon = document.querySelector('#cart-icon');
const cartBadge = document.querySelector('#cart-badge');
const addToCartButtons = document.querySelectorAll('.btn-menu');

addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

function showPopupMessage(message) {
    const popupMessage = document.getElementById('popup-message');
    popupMessage.textContent = message;
    popupMessage.style.display = 'block';
    
    setTimeout(() => {
        popupMessage.style.display = 'none';
    }, 2000);
}

function addToCart(event) {
    const productId = event.target.dataset.productId;
    const productContainer = event.target.closest('.menu-item');
    const productTitle = productContainer.querySelector('.title').textContent;
    const productPrice = parseFloat(productContainer.querySelector('.price').textContent.split(' ')[1]);
    const productQuantity = parseInt(productContainer.querySelector('.quantity').value);

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += productQuantity;
        console.log(`Updated product quantity: ${existingProduct.title} - ${existingProduct.quantity}`);
    } else {
        const product = { id: productId, title: productTitle, price: productPrice, quantity: productQuantity };
        cart.push(product);
        console.log(`Added new product: ${product.title} - ${product.quantity}`);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    cartBadge.textContent = cart.length;
    console.log('Cart after adding item:', cart);
    console.log('localStorage size:', new Blob([localStorage.getItem('cart')]).size);
    showPopupMessage(`${productTitle} x${productQuantity} added to cart!`);
}

const cartModal = document.getElementById('cart-modal');
const closeButton = document.querySelector('.close-button');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const clearCartButton = document.getElementById('clear-cart');

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const itemElement = document.createElement('li');
        const itemTotal = item.price * item.quantity;
        itemElement.innerHTML = `${item.title} - ₹${item.price.toFixed(2)} x ${item.quantity} Total: ₹${itemTotal.toFixed(2)} <button class="remove-item" data-product-id="${item.id}">Remove</button>`;
        cartItems.appendChild(itemElement);
        total += itemTotal;
    });
    cartTotal.textContent = `Total: ₹${total.toFixed(2)}`;
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeFromCart);
    });
    cartModal.style.display = 'block';
    console.log('Displaying cart:', cart);
}

function removeFromCart(event) {
    const productId = event.target.dataset.productId;
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    cartBadge.textContent = cart.length;
    displayCart();
    console.log('Item removed. Updated cart:', cart);
}

function clearCart() {
    localStorage.removeItem('cart');
    cartBadge.textContent = 0;
    displayCart();
    showPopupMessage("Cart Cleared")
}

closeButton.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

cartIcon.addEventListener('click', displayCart);
clearCartButton.addEventListener('click', clearCart);

window.addEventListener('DOMContentLoaded', () => {
    cartModal.style.display = 'none';
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartBadge.textContent = cart.length;
    console.log('Page loaded. Initial cart:', cart);
});

const checkoutButton = document.getElementById('checkout-button');

checkoutButton.addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if(cart.length === 0){
    showPopupMessage("Add some item we can't process with empty cart");
    }
    else{
        showPopupMessage('Thank You for choosing us we will soon notify you');
    }
});
