import React from 'react';
import {BookGrid} from '..';
import { IBook } from '../../models';
import {SelectDropDown, BookCover} from '..';
import { BookShelfStyleWrapper} from './BookShelf.style';

interface BookShelfProps {
  books: IBook[];
  type?: string;
  title?: string;
  onChangeBook: (event: React.ChangeEvent<HTMLSelectElement>, book: IBook) => void;
}

export const BookShelf = (props: BookShelfProps) => {
  const { books, type, title, onChangeBook } = props;
  
  const filteredBooks = React.useMemo(() => {
    if (!type) return books;
    return books.filter((b) => b.shelf === type)
  }, [books, type]);

  return (
    <BookShelfStyleWrapper className="BookShelf">
      {title ? <h2 className="BookShelf__title">{title}</h2> : null}
      <div className="BookShelf__books">
        <BookGrid>
          {filteredBooks.map((book) => (
            <BookGrid.Item key={book.id}>
              <div className="BookShelf__books__book">
                <div className="BookShelf__books__book-top">
                  <BookCover url={book.imageLinks.thumbnail} />
                  <SelectDropDown book={book} onMoveBook={(e) => onChangeBook(e, book)} />
                </div>
                <div className="BookShelf__books__book-title">{book.title}</div>
                <div className="BookShelf__books__book-authors">
                  {book.authors.map((author, index) => (
                    <span key={index}>{author}</span>
                  ))}
                </div>
              </div>
            </BookGrid.Item>
          ))}
        </BookGrid>
      </div>
    </BookShelfStyleWrapper>
  );
};
