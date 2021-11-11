import React from 'react';
import { Link } from 'react-router-dom';
import startCase from 'lodash/startCase';
import { BookShelf } from '../components';
import { IBook } from '../models';
import { BookStatusEnum } from '../constants';
import { getAll, update } from '../api/BookAPI';
import '../assets/css/App.css';


const HomePage = () => {
  const [books, setBooks] = React.useState<IBook[]>([]);

  const fetchBooks = async () => {
    const books = await getAll();
    setBooks(books);
  };

  const handleBookRemoval = React.useCallback(
    (book: IBook, shelf: string) => {
      const newBooks = books.filter((currentBook) => currentBook.id !== book.id);
      const mergedBook = { ...book, shelf };
      const combinedBooks = [...newBooks, mergedBook];
      setBooks(combinedBooks);
    },
    [books]
  );

  const handleCategoryChange = async (event: React.ChangeEvent<HTMLSelectElement>, book: IBook) => {
    const shelf = event.currentTarget.value;
    handleBookRemoval(book, shelf);
    await update(book.id, shelf);
  };

  React.useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="app">
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyRead Books App</h1>
        </div>
        <div className="list-books-content">
          <BookShelf
            books={books}
            type={BookStatusEnum.CURRENTLY_READING}
            onChangeBook={(e: React.ChangeEvent<HTMLSelectElement>, book: IBook) =>
              handleCategoryChange(e, book)
            }
            title={startCase(BookStatusEnum.CURRENTLY_READING)}
          />
          <BookShelf
            books={books}
            type={BookStatusEnum.WANT_TO_READ}
            title={startCase(BookStatusEnum.WANT_TO_READ)}
            onChangeBook={(e: React.ChangeEvent<HTMLSelectElement>, book: IBook) =>
              handleCategoryChange(e, book)
            }
          />
          <BookShelf
            books={books}
            type={BookStatusEnum.READ}
            title={startCase(BookStatusEnum.READ)}
            onChangeBook={(e: React.ChangeEvent<HTMLSelectElement>, book: IBook) =>
              handleCategoryChange(e, book)
            }
          />
        </div>
        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
