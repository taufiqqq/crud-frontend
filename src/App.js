import { useEffect, useState } from 'react';
import { createBook, deleteBook, getBooks, updateBook } from './api';

export default function App() {
  const [books, setBooks] = useState([]);
  const [name, setName] = useState('');
  const [editing, setEditing] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadBooks = async () => {
      setError('');

      try {
        const items = await getBooks();
        if (isMounted) {
          setBooks(Array.isArray(items) ? items : []);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      }
    };

    loadBooks();

    return () => {
      isMounted = false;
    };
  }, []);

  const addBook = async (event) => {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      return;
    }

    setError('');

    try {
      await createBook(trimmedName);
      setBooks((prev) => [...prev, { id: Date.now(), name: trimmedName }]);
      setName('');
    } catch (err) {
      setError(err.message);
    }
  };

  const removeBook = async (id) => {
    setError('');

    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const saveBook = async (id) => {
    const newName = (editing[id] || '').trim();
    if (!newName) {
      return;
    }

    setError('');

    try {
      await updateBook(id, newName);
      setBooks((prev) =>
        prev.map((book) => (book.id === id ? { ...book, name: newName } : book))
      );
      setEditing((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main style={{ fontFamily: 'sans-serif', margin: '2rem auto', maxWidth: 640 }}>
      <h1>Books CRUD</h1>

      <form onSubmit={addBook} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Book name"
          aria-label="Book name"
        />
        <button type="submit">Add</button>
      </form>

      {error ? <p style={{ color: 'crimson' }}>{error}</p> : null}

      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.5rem' }}>
        {books.map((book) => (
          <li key={book.id} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span>#{book.id}</span>
            <input
              value={editing[book.id] ?? book.name}
              onChange={(event) =>
                setEditing((prev) => ({
                  ...prev,
                  [book.id]: event.target.value
                }))
              }
              aria-label={`Name for ${book.id}`}
            />
            <button type="button" onClick={() => saveBook(book.id)}>
              Update
            </button>
            <button type="button" onClick={() => removeBook(book.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
