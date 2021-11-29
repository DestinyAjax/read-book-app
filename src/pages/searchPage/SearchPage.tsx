import React from 'react';
import { withRouter } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { BookShelf, BackButton, SearchInput } from '../../components';
import { IBook } from '../../models';
import { BookStatusEnum } from '../../constants';
import { search, update, getAll } from '../../api/BookAPI';
import { reactQueryclient } from '../../index';
import { SearchPageStyle } from './searchPage.style';

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

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query && query.length >= 3) {
      searchMutation.mutate({ query: query.trim() });
    } else {
      setSearchPayload([]);
    }
  };

  const changeCategory = async (event: React.ChangeEvent<HTMLSelectElement>, book: IBook) => {
    const shelf = event.currentTarget.value;
    updatePostMutation.mutate({ bookId: book.id, shelf });
  };

  return (
    <SearchPageStyle>
      <header>
        <BackButton />
        <SearchInput onSearch={handleSearch} />
      </header>
      <section>
        <BookShelf
          books={filteredBooks}
          onChangeBook={(e: React.ChangeEvent<HTMLSelectElement>, book: IBook) =>
            changeCategory(e, book)
          }
        />
      </section>
    </SearchPageStyle>
  );
};

export default withRouter(SearchPage);
