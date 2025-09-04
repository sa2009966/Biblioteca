// Book interaction
const book = document.querySelector('.book');
const bookCover = document.querySelector('.book-cover');
const closeBtn = document.querySelector('.close-book-btn');

// Abrir libro (90 grados)
bookCover.addEventListener('click', function(e) {
    if (e.target.closest('.author-card')) return; // No abrir si se hace clic en una tarjeta
    book.classList.add('open');
});

// Cerrar libro
function closeBook() {
    book.classList.remove('open');
}

// Nuevos datos de autores
const booksData = {
    'Cien-años-de-soledad': {
        title: 'Cien años de soledad',
        author: 'Gabriel García Márquez',
        description: 'La novela narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo.',
        genre: 'Realismo mágico',
        pages: '432',
        year: '1967',
        available: true

    },
     'El-amor-en-los-tiempos-del-cólera': {
        title: 'El amor en los tiempos del cólera',
        author: 'Gabriel García Márquez',
        description: 'Una historia de amor persistente entre Fermina Daza y Florentino Ariza, que se desarrolla a lo largo de décadas en el Caribe colombiano.',
        genre: 'Realismo mágico / Novela romántica',
        pages: ' Aproximadamente 348',
        year: '1985',
        available: true

    },
     'Crónica-de-una-muerte-anunciada': {
        title: 'Crónica de una muerte anunciada',
        author: 'Gabriel García Márquez',
        description: 'Un relato sobre el asesinato de Santiago Nasar, narrado en forma periodística, donde todo el pueblo sabía que ocurriría, excepto la víctima.',
        genre: 'Realismo mágico / Novela corta / Crónica',
        pages: ' Aproximadamente 122',
        year: '1981',
        available: true

    },
    'Ficciones': {
        title: 'Ficciones',
        author: 'Jorge Luis Borges',
        description: 'Colección de cuentos que exploran temas como el infinito, los laberintos y la naturaleza del tiempo.',
        genre: 'Ficción filosófica',
        pages: '180',
        year: '1944',
        available: false
    },
    'El-Aleph': {
        title: 'El-Aleph',
        author: 'Jorge Luis Borges',
        description: ' Cuentos que exploran el infinito, el tiempo y la realidad, destacando “El Aleph”.',
        genre: 'Ficción filosófica / Cuento fantástico',
        pages: '96',
        year: '1949',
        available: true
    },
    'El-libro-de-arena': {
        title: 'El libro de arena',
        author: 'Jorge Luis Borges',
        description: 'Novela que puede leerse de múltiples formas, rompiendo con la estructura lineal tradicional.',
        genre: 'Literatura experimental',
        pages: '736',
        year: '1963',
        available: true
    },
    'isabel-allende': {
        title: 'La casa de los espíritus',
        author: 'Isabel Allende',
        description: 'Crónica familiar que abarca varias generaciones en un contexto histórico de cambios sociales.',
        genre: 'Realismo mágico',
        pages: '432',
        year: '1982',
        available: true
    },
    'mario-vargas-llosa': {
        title: 'La ciudad y los perros',
        author: 'Mario Vargas Llosa',
        description: 'Novela que expone la violencia y corrupción en una institución militar en Lima.',
        genre: 'Literatura hispanoamericana',
        pages: '320',
        year: '1963',
        available: true
    },
    'octavio-paz': {
        title: 'El laberinto de la soledad',
        author: 'Octavio Paz',
        description: 'Ensayo que explora la identidad mexicana y sus contradicciones.',
        genre: 'Ensayo filosófico',
        pages: '224',
        year: '1950',
        available: false
    }
};

// Mostrar disponibilidad
function showAvailability(bookId) {
    const bookData = booksData[bookId];
    const menu = document.getElementById('availabilityMenu');
    
    // Actualizar datos en el modal
    document.getElementById('bookTitle').textContent = bookData.title;
    document.getElementById('bookAuthor').textContent = bookData.author;
    document.getElementById('bookDescription').textContent = bookData.description;
    document.getElementById('bookGenre').textContent = bookData.genre;
    document.getElementById('bookPages').textContent = bookData.pages;
    document.getElementById('bookYear').textContent = bookData.year;
    
    // Actualizar estado
    const statusElement = document.getElementById('availabilityStatus');
    if (bookData.available) {
        statusElement.textContent = 'Disponible';
        statusElement.className = 'inline-block px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800';
    } else {
        statusElement.textContent = 'Agotado';
        statusElement.className = 'inline-block px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800';
    }
    
    menu.classList.add('active');
}

// Cerrar modal de disponibilidad
function closeAvailabilityMenu() {
    document.getElementById('availabilityMenu').classList.remove('active');
}

// Mobile menu toggle
document.querySelector('.md\\:hidden').addEventListener('click', function() {
    alert('Menú móvil se abriría aquí');
});