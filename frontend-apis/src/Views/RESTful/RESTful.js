import React, { useState, useEffect } from 'react';
import './styles.css';
import {Link} from "react-router-dom";

function RESTful() {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({
        title: '',
        autor: '',
        year: '',
        coverImage: ''
    });
    const [editingBookId, setEditingBookId] = useState(null);
    const [editingBook, setEditingBook] = useState({
        id: null,
        title: '',
        autor: '',
        year: '',
        coverImage: ''
    });

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = () => {
        fetch('http://localhost:3001/api/books')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch');
                }
                return response.json();
            })
            .then(data => setBooks(data))
            .catch(error => console.error('Error fetching books:', error));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editingBookId !== null) {
            setEditingBook({ ...editingBook, [name]: value });
        } else {
            setNewBook({ ...newBook, [name]: value });
        }
    };

    const handleAddBook = () => {
        fetch('http://localhost:3001/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add book');
                }
                return response.json();
            })
            .then(data => {
                setBooks([...books, data]);
                setNewBook({
                    title: '',
                    autor: '',
                    year: '',
                    coverImage: ''
                });
            })
            .catch(error => console.error('Error adding book:', error));
    };

    const handleEditBook = () => {
        fetch(`http://localhost:3001/api/books/${editingBook.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editingBook)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to edit book');
                }
                return response.json();
            })
            .then(data => {
                const updatedBooks = books.map(book => {
                    if (book.id === editingBook.id) {
                        return { ...book, ...editingBook };
                    }
                    return book;
                });
                setBooks(updatedBooks);
                setEditingBookId(null);
                setEditingBook({
                    id: null,
                    title: '',
                    autor: '',
                    year: '',
                    coverImage: ''
                });
            })
            .catch(error => console.error('Error editing book:', error));
    };

    const handleStartEditing = (book) => {
        setEditingBookId(book.id);
        setEditingBook(book);
    };


    return (
        <div>
            <h1>Libros</h1>
            <pre>{JSON.stringify(books,null,2)}</pre>
            <h2>Agregar un nuevo libro </h2>
            <input type="text" name="title" placeholder="Título" value={newBook.title} onChange={handleInputChange}/>
            <input type="text" name="autor" placeholder="Autor" value={newBook.autor} onChange={handleInputChange}/>
            <input type="text" name="year" placeholder="Año" value={newBook.year} onChange={handleInputChange}/>
            <input type="text" name="coverImage" placeholder="URL de la imagen de portada" value={newBook.coverImage} onChange={handleInputChange}/>
            <button onClick={handleAddBook}>Agregar libro</button>

            <h2>Libros existentes</h2>
            {books.length > 0 ? (
                <ul>
                    {books.map(book => (
                        <li key={book.id}>
                            {editingBookId === book.id ? (
                                <div>
                                    <h3>{book.title}</h3>
                                    <input type="text" name="title" value={editingBook.title} onChange={handleInputChange}/>
                                    <input type="text" name="autor" value={editingBook.autor} onChange={handleInputChange}/>
                                    <input type="text" name="year" value={editingBook.year} onChange={handleInputChange}/>
                                    <input type="text" name="coverImage" value={editingBook.coverImage} onChange={handleInputChange}/>
                                    <button onClick={handleEditBook}>Guardar Cambios</button>
                                </div>
                            ) : (
                                <div>
                                    <h3>{book.title}</h3>
                                    <p><strong>Autor:</strong> {book.autor}</p>
                                    <p><strong>Año:</strong> {book.year}</p>
                                    <img src={book.coverImage} alt={book.title} style={{maxWidth: '200px'}}/>
                                    <button className="edit" onClick={() => handleStartEditing(book)}>Editar</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No existen libros disponibles</p>
            )}
            <div className="button-container">
                <Link to="/"><button className="styled-button">Inicio</button></Link>
            </div>
        </div>
    );

}

export default RESTful;

