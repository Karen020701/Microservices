const express = require('express');
const router = express.Router();

// Book list
let books = [
    {
        id: '1',
        title: 'Cuentos de amor de locura y de muerte',
        autor: 'Horacio Quiroga',
        year: 1917,
        coverImage: 'https://images.cdn3.buscalibre.com/fit-in/360x360/08/e5/08e586080a29e31ab3314fddb8cfcdda.jpg'
    },
    {
        id: '2',
        title: 'Veinte mil leguas de viaje submarino',
        autor: 'Julio Verne',
        year: 1870,
        coverImage: 'https://images.cdn2.buscalibre.com/fit-in/360x360/56/6f/566fd75ec4d91b49cc4736fe686ce05e.jpg'
    },
    {
        id: '3',
        title: 'Hablas demasiado',
        autor: 'Juan Fernando Andrade',
        year: 2009,
        coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTy5n0VzoX_g9H1xmFGUeaRERpbnIHZSudPQ&s'
    },
    {
        id: '4',
        title: 'Siete lunas, siete serpientes',
        autor: 'Demetrio Aguilera Malta',
        year: 1979,
        coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJol-lV6Co1Y0Nt3LKLla1FV_DaD27FaLaxYh6BfaVcEXVg7LYlWgwbijJ&s=5'
    }
];

// Get all books
router.get('/books', (req, res) => {
    res.json(books);
});

// Get a single book per ID
router.get('/books/:id', (req, res) => {
    const book = books.find(m => m.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Este libro no ha sido encontrado');
    res.json(book);
});

// Create a new book
router.post('/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        autor: req.body.autor,
        year: req.body.year,
        coverImage: req.body.coverImage // Add the book cover from the request body
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// Update a book that already exists
router.put('/books/:id', (req, res) => {
    const book = books.find(m => m.id === parseInt(req.params.id));
    if (!book) return res.status(404).send('Esta libro no fue encontrada');

    book.title = req.body.title;
    book.autor = req.body.autor;
    book.year = req.body.year;
    book.coverImage = req.body.coverImage; // Update the cover
    res.json(book);
});

module.exports = router;
