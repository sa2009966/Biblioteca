const books = [
    {
        id: 1,
        title: "Cien años de soledad",
        author: "Gabriel García Márquez",
        description: "Una saga familiar que narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo.",
        price: 19.99,
        genre: "drama",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        title: "Orgullo y prejuicio",
        author: "Jane Austen",
        description: "La historia de Elizabeth Bennet y su relación con el señor Darcy en la Inglaterra rural del siglo XIX.",
        price: 15.50,
        genre: "romance",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        title: "Veinte poemas de amor",
        author: "Pablo Neruda",
        description: "Una colección de poemas amorosos que exploran temas de pasión, nostalgia y deseo.",
        price: 12.99,
        genre: "poesia",
        image: "https://images.unsplash.com/photo-1589998059171-988d322dfe6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        title: "Sapiens: De animales a dioses",
        author: "Yuval Noah Harari",
        description: "Una breve historia de la humanidad que explora las revoluciones cognitiva, agrícola y científica.",
        price: 22.95,
        genre: "historia",
        image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        title: "Romeo y Julieta",
        author: "William Shakespeare",
        description: "La trágica historia de dos jóvenes amantes cuyas muertes finalmente unen a sus familias enemistadas.",
        price: 10.99,
        genre: "drama",
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 6,
        title: "El amor en los tiempos del cólera",
        author: "Gabriel García Márquez",
        description: "Una historia de amor que se desarrolla a lo largo de décadas, desde la juventud hasta la vejez de sus protagonistas.",
        price: 18.75,
        genre: "romance",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 7,
        title: "La historia interminable",
        author: "Michael Ende",
        description: "Una novela fantástica sobre un niño que lee un libro mágico que lo transporta al mundo de Fantasía.",
        price: 16.25,
        genre: "drama",
        image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 8,
        title: "Poemas completos",
        author: "Federico García Lorca",
        description: "Recopilación de toda la obra poética de uno de los poetas españoles más importantes del siglo XX.",
        price: 14.99,
        genre: "poesia",
        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    }
];

// Shopping cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM elements
const bookContainer = document.getElementById('book-container');
const cartButton = document.getElementById('cart-button');
const cartPanel = document.getElementById('cart-panel');
const closeCart = document.getElementById('close-cart');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTotal = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-button');
const emptyCartMessage = document.getElementById('empty-cart-message');
const overlay = document.getElementById('overlay');
const genreFilters = document.querySelectorAll('.genre-filter');

// Display books
function displayBooks(genre = 'todos') {
    bookContainer.innerHTML = '';
    
    const filteredBooks = genre === 'todos' 
        ? books 
        : books.filter(book => book.genre === genre);
    
    filteredBooks.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.className = 'book-card bg-white rounded-lg shadow-md overflow-hidden transition duration-300';
        bookElement.innerHTML = `
            <img src="${book.image}" alt="${book.title}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="font-bold text-lg mb-1">${book.title}</h3>
                <p class="text-gray-600 text-sm mb-2">${book.author}</p>
                <p class="text-gray-700 mb-3 text-sm">${book.description}</p>
                <div class="flex justify-between items-center">
                    <span class="font-bold text-amber-600">$${book.price.toFixed(2)}</span>
                    <button class="add-to-cart bg-amber-600 hover:bg-amber-700 text-white px-3 py-1 rounded-md text-sm transition" data-id="${book.id}">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        `;
        bookContainer.appendChild(bookElement);
    });
    
    // Add event listeners to the new "Add to cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add to cart function
function addToCart(e) {
    const bookId = parseInt(e.target.getAttribute('data-id'));
    const book = books.find(b => b.id === bookId);
    
    // Check if book is already in cart
    const existingItem = cart.find(item => item.id === bookId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...book,
            quantity: 1
        });
    }
    
    // Update cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update UI
    updateCartUI();
    
    // Show cart panel if it's hidden
    if (cartPanel.classList.contains('translate-x-full')) {
        cartPanel.classList.remove('translate-x-full');
        overlay.classList.remove('hidden');
    }
    
    // Add pulse animation to cart button
    cartCount.classList.add('cart-pulse');
    setTimeout(() => {
        cartCount.classList.remove('cart-pulse');
    }, 500);
}

// Remove from cart function
function removeFromCart(e) {
    const bookId = parseInt(e.target.getAttribute('data-id'));
    
    // Find item in cart
    const itemIndex = cart.findIndex(item => item.id === bookId);
    
    if (itemIndex !== -1) {
        // Remove item from cart
        cart.splice(itemIndex, 1);
        
        // Update cart in localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update UI
        updateCartUI();
    }
}

// Update cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items list
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        emptyCartMessage.classList.remove('hidden');
        checkoutButton.disabled = true;
    } else {
        emptyCartMessage.classList.add('hidden');
        checkoutButton.disabled = false;
        
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'flex justify-between items-start border-b border-gray-200 pb-4';
            cartItemElement.innerHTML = `
                <div class="flex">
                    <img src="${item.image}" alt="${item.title}" class="w-16 h-16 object-cover rounded mr-3">
                    <div>
                        <h4 class="font-medium">${item.title}</h4>
                        <p class="text-sm text-gray-500">${item.author}</p>
                        <p class="text-sm font-medium">$${item.price.toFixed(2)}</p>
                    </div>
                </div>
                <button class="remove-from-cart text-gray-400 hover:text-red-500" data-id="${item.id}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            cartItems.appendChild(cartItemElement);
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', removeFromCart);
        });
    }
    
    // Update totals
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    cartTotal.textContent = `$${subtotal.toFixed(2)}`;
}

// Initialize the page
function init() {
    // Display all books initially
    displayBooks();
    
    // Update cart UI
    updateCartUI();
    
    // Add event listeners
    cartButton.addEventListener('click', () => {
        cartPanel.classList.remove('translate-x-full');
        overlay.classList.remove('hidden');
    });
    
    closeCart.addEventListener('click', () => {
        cartPanel.classList.add('translate-x-full');
        overlay.classList.add('hidden');
    });
    
    overlay.addEventListener('click', () => {
        cartPanel.classList.add('translate-x-full');
        overlay.classList.add('hidden');
    });
    
    // Genre filter event listeners
    genreFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            const genre = filter.getAttribute('data-genre');
            displayBooks(genre);
            
            // Update active filter
            genreFilters.forEach(f => f.classList.remove('bg-amber-600', 'text-white'));
            filter.classList.add('bg-amber-600', 'text-white');
        });
    });
    
    // Checkout button
    checkoutButton.addEventListener('click', () => {
        alert('Gracias por tu compra! Serás redirigido al proceso de pago.');
        // In a real app, you would redirect to a checkout page
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
        cartPanel.classList.add('translate-x-full');
        overlay.classList.add('hidden');
    });
}

// Initialize the app
init();