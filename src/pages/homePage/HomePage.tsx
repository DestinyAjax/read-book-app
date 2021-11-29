import React from 'react';
import { useQuery, useMutation } from 'react-query';
import startCase from 'lodash/startCase';
import { BookShelf, AddButton } from '../../components';
import { IBook } from '../../models';
import { BookStatusEnum } from '../../constants';
import { getAll, update } from '../../api/BookAPI';
import { reactQueryclient } from '../../index';
import {HomePageStyle} from './homePage.style';

export const HomePage = () => {
  const [details, setDetails] = React.useState<{ book: IBook | null; shelf: string }>({
    book: null,
    shelf: '',
  });
  const { isLoading, data: books } = useQuery('books', getAll);

  const updatePostMutation = useMutation(
    (payload: { bookId: string; shelf: string }) => update(payload.bookId, payload.shelf),
    {
      onSuccess() {
        reactQueryclient.invalidateQueries('books');
      },
    }
  );

  const filteredBooks = React.useMemo(() => {
    const newBooks = books?.filter((currentBook) => currentBook.id !== details.book?.id) || [];
    const mergedBook = { ...details.book, shelf: details.shelf };
    return [...newBooks, mergedBook] as IBook[];
  }, [books, details]);

  const handleCategoryChange = async (event: React.ChangeEvent<HTMLSelectElement>, book: IBook) => {
    const shelf = event.currentTarget.value;
    setDetails({
      book,
      shelf,
    });
    updatePostMutation.mutate({ bookId: book.id, shelf });
  };

  if (isLoading) {
    return <div>Loading books ...</div>;
  }

  return (
    <HomePageStyle>
      <header className="title">
        <h1>My Book Library</h1>
      </header>
      <section className="BookList">
        <div className="BookList__content">
          {books ? (
            <React.Fragment>
              <BookShelf
                books={filteredBooks}
                type={BookStatusEnum.CURRENTLY_READING}
                onChangeBook={(e: React.ChangeEvent<HTMLSelectElement>, book: IBook) =>
                  handleCategoryChange(e, book)
                }
                title={startCase(BookStatusEnum.CURRENTLY_READING)}
              />
              <BookShelf
                books={filteredBooks}
                type={BookStatusEnum.WANT_TO_READ}
                title={startCase(BookStatusEnum.WANT_TO_READ)}
                onChangeBook={(e: React.ChangeEvent<HTMLSelectElement>, book: IBook) =>
                  handleCategoryChange(e, book)
                }
              />
              <BookShelf
                books={filteredBooks}
                type={BookStatusEnum.READ}
                title={startCase(BookStatusEnum.READ)}
                onChangeBook={(e: React.ChangeEvent<HTMLSelectElement>, book: IBook) =>
                  handleCategoryChange(e, book)
                }
              />
            </React.Fragment>
          ) : null}
        </div>
        <div className="BookList__search">
          <AddButton />
        </div>
      </section>
    </HomePageStyle>
  );
};
