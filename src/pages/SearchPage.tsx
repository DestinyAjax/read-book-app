import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { SelectDropDown, BookCover, BookGrid } from '../components';
import { IBook } from '../models';
import { BookStatusEnum } from '../constants'
import { search, update, getAll } from '../api/BookAPI';
import '../assets/css/App.css';

const SearchPage = (props: any) => {
  const [books, setBooks] = React.useState<IBook[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = async (query: string) => {
    const homePageBooks = await getAll();
    const homePageBookIds = homePageBooks.map((book) => book.id);

    if (query) {
      const searchPayload = await search(query.trim());
      
      if (!(searchPayload as any).error) {
        const newBooks = searchPayload.filter((book) => {
          if (homePageBookIds.includes(book.id)) {
            const filteredBooks = homePageBooks.filter((value) => value.id === book.id);
            for (const new_book of filteredBooks) {
              return { ...book, shelf: new_book.shelf };
            }
          } else {
            return { ...book, shelf: BookStatusEnum.NONE };
          }
        });

        setBooks(newBooks);
      }
      return;
    }

    setBooks([]);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setSearchQuery(value);
    handleSearch(value);
  };

  const changeCategory = async (event: React.ChangeEvent<HTMLSelectElement>, book: IBook) => {
    const shelf = event.currentTarget.value;
    await update(book.id, shelf);
    props.history.push('/');
  };

  const filteredBooks = React.useMemo(
    () => books.filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase())),
    [books, searchQuery]
  );

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/">
          <button className="close-search">Close</button>
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search by title or author"
          />
        </div>
      </div>
      <div className="search-books-results">
        <BookGrid>
          {filteredBooks.length > 0 &&
            filteredBooks.map((book) => (
              <BookGrid.Item key={book.id}>
                <div className="book">
                  <div className="book-top">
                    {book.imageLinks && (
                      <BookCover url={book.imageLinks.thumbnail ? book.imageLinks.thumbnail : ''} />
                    )}
                    <SelectDropDown book={book} onMoveBook={(e) => changeCategory(e, book)} />
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">
                    {book.authors &&
                      book.authors.map((author, index) => <span key={index}>{author}</span>)}
                  </div>
                </div>
              </BookGrid.Item>
            ))}
        </BookGrid>
      </div>
    </div>
  );
};

export default withRouter(SearchPage);
