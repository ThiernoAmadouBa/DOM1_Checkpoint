const items = [
    { id: 1, name: "Article 1", price: 25, quantity: 1, liked: false },
    { id: 2, name: "Article 2", price: 40, quantity: 1, liked: false },
    { id: 3, name: "Article 3", price: 15, quantity: 1, liked: false },
];

// Fonction pour afficher le panier
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    items.forEach(item => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        cartItemDiv.innerHTML = `
            <span>${item.name}</span>
            <span>${item.price} €</span>
            <span class="quantity-controls">
                <button class="decrease-btn" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="increase-btn" data-id="${item.id}">+</button>
            </span>
            <span class="heart-btn ${item.liked ? 'liked' : ''}" data-id="${item.id}">❤️</span>
            <span class="remove-btn" data-id="${item.id}">🗑️</span>
        `;

        cartItemsContainer.appendChild(cartItemDiv);
    });

    updateTotal();
}

// Fonction pour mettre à jour le total
function updateTotal() {
    const totalElement = document.getElementById('cart-total');
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalElement.textContent = total.toFixed(2);
}

// Gestion des événements pour ajuster la quantité
document.getElementById('cart-items').addEventListener('click', (event) => {
    const button = event.target;

    // Identifier le type de bouton et l'ID de l'article
    const itemId = parseInt(button.getAttribute('data-id'));
    const item = items.find(item => item.id === itemId);

    if (!item) return;

    if (button.classList.contains('increase-btn')) {
        item.quantity += 1;
    } else if (button.classList.contains('decrease-btn') && item.quantity > 1) {
        item.quantity -= 1;
    } else if (button.classList.contains('remove-btn')) {
        items.splice(items.indexOf(item), 1); // Supprimer l'article
    } else if (button.classList.contains('heart-btn')) {
        item.liked = !item.liked; // Changer l'état aimé/non aimé
    }

    renderCart();
});

// Gestion du bouton de passage à la caisse
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (items.length > 0) {
        alert('Merci pour votre achat!');
    } else {
        alert('Votre panier est vide!');
    }
});

// Initialiser le panier
renderCart();
