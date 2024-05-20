let products = [
    {
        id: 1,
        name: "KAAFAL",
        category: "fruits",
        price: "₹ 199/200gm",
        image: "../img/Kaafal1.jpg",
        description: "Himalayan Local Fruit",
        location: "Uttarakhand, India"
    },
    {
        id: 2,
        name: "SPICY SALT",
        category: "salt",
        price: "₹ 79/500gm",
        image: "../img/pisa_namak.jpg",
        description: "Uttarakhand salt mix with spices",
        location: "Uttarakhand, India"
    },
    {
        id: 3,
        name: "MADUWA",
        category: "seeds",
        price: "₹ 59/500gm",
        image: "../img/Madua.png",
        description: "Himalayan Local Seeds",
        location: "Uttarakhand, India"
    }
];

function renderProducts() {
    const productContainer = document.querySelector('.container .Store-menu');
    productContainer.innerHTML = ''; // Clear current products

    products.forEach(product => {
        const productItem = `
            <div class="menu-item" data-category="${product.category}">
                <img src="${product.image}" alt="${product.name}">
                <div class="title">${product.name} <br><br>(${product.description})</div>
                <div class="location"><br><br>${product.location}</div>
                <div class="price order flex">${product.price}</div><br>
                <div class="quantity-container">
                    <label for="quantity-input" class="quantity-show">Quantity:</label>
                    <input type="number" value="1" class="quantity">
                </div>
                <br><br>
                <div class="bo">
                    <button type="submit" name="addtocart" class="btn-menu" data-product-id="${product.id}">Add to Cart</button>
                    
                </div>
            </div>
        `;
        productContainer.innerHTML += productItem;
    });
}

document.getElementById('add-product-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const newProduct = {
        id: products.length + 1,
        name: document.getElementById('product-name').value,
        category: document.getElementById('product-category').value.toLowerCase(),
        price: document.getElementById('product-price').value,
        image: document.getElementById('product-image').value,
        description: document.getElementById('product-description').value,
        location: document.getElementById('product-location').value
    };

    products.push(newProduct);
    renderProducts();
});

// Initial render
renderProducts();
