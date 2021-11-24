import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { SelectDropDown, BookCover, BookGrid } from '../components';
import { IBook } from '../models';
import { BookStatusEnum } from '../constants';
import { search, update, getAll } from '../api/BookAPI';
import { reactQueryclient } from '../index';
import '../assets/css/App.css';

const SearchPage = (props: any) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchPayload, setSearchPayload] = React.useState<IBook[]>([]);
  const { data: homePageBooks } = useQuery('books', getAll);

  const searchMutation = useMutation((payload: { query: string }) => search(payload.query), {
    onSuccess(data) {
      if (data && data.length) {
        reactQueryclient.invalidateQueries('books');
        const homePageBookIds = homePageBooks?.map((book) => book.id);
        const newBooks = data?.filter((book) => {
          if (homePageBookIds && homePageBookIds.includes(book.id)) {
            const filteredBooks = homePageBooks?.filter((value) => value.id === book.id) || [];
            for (const new_book of filteredBooks) {
              return { ...book, shelf: new_book.shelf };
            }
          } else {
            return { ...book, shelf: BookStatusEnum.NONE };
          }
        });

        setSearchPayload(newBooks);
      }
    },
  });

  const updatePostMutation = useMutation(
    (payload: { bookId: string; shelf: string }) => update(payload.bookId, payload.shelf),
    {
      onSuccess() {
        reactQueryclient.invalidateQueries('books');
        props.history.push('/');
      },
    }
  );

  const filteredBooks = React.useMemo(
    () =>
      searchPayload.filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchPayload, searchQuery]
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value;
    setSearchQuery(query);
    if (query) searchMutation.mutate({ query: query.trim() });
  };

  const changeCategory = async (event: React.ChangeEvent<HTMLSelectElement>, book: IBook) => {
    const shelf = event.currentTarget.value;
    updatePostMutation.mutate({ bookId: book.id, shelf });
  };

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
            onChange={handleSearch}
            placeholder="Search by title or author"
          />
        </div>
      </div>
      <div className="search-books-results">
        <BookGrid>
          {filteredBooks.length > 0
            ? filteredBooks.map((book) => (
                <BookGrid.Item key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      {book.imageLinks ? (
                        <BookCover
                          url={book.imageLinks.thumbnail ? book.imageLinks.thumbnail : ''}
                        />
                      ) : null}
                      <SelectDropDown book={book} onMoveBook={(e) => changeCategory(e, book)} />
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">
                      {book.authors
                        ? book.authors.map((author, index) => <span key={index}>{author}</span>)
                        : null}
                    </div>
                  </div>
                </BookGrid.Item>
              ))
            : null}
        </BookGrid>
      </div>
    </div>
  );
};

export default withRouter(SearchPage);
