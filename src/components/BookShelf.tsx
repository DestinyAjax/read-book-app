import React from 'react';
import BookGrid from './BookGrid';
import { IBook } from '../models';
import {SelectDropDown} from './';
import BookCover from './BookCover';
import '../assets/css/App.css';

interface BookShelfProps {
  books: IBook[];
  type: string;
  title: string;
  onChangeBook: (event: React.ChangeEvent<HTMLSelectElement>, book: IBook) => void;
}

const BookShelf = (props: BookShelfProps) => {
  const { books, type, title, onChangeBook } = props;
  const filteredBooks = React.useMemo(() => books.filter((b) => b.shelf === type), [books, type]);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <BookGrid>
          {filteredBooks.map((book) => (
            <BookGrid.Item key={book.id}>
              <div className="book">
                <div className="book-top">
                  <BookCover url={book.imageLinks.thumbnail} />
                  <SelectDropDown book={book} onMoveBook={(e) => onChangeBook(e, book)} />
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">
                  {book.authors.map((author, index) => (
                    <span key={index}>{author}</span>
                  ))}
                </div>
              </div>
            </BookGrid.Item>
          ))}
        </BookGrid>
      </div>
    </div>
  );
};

export default BookShelf;
