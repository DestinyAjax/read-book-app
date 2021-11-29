import React from 'react';
import { SearchInputStyle } from './SearchInput.style';

interface Props {
  onSearch: (value: string) => void;
}

export const SearchInput = (props: Props) => {
    const [value, setValue] = React.useState('');

  const handleSearch = React.useCallback((query) => {
      setValue(query);
      props.onSearch(query);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SearchInputStyle>
      <input
        type="text"
        value={value}
        onChange={(event) => handleSearch(event.currentTarget.value)}
        placeholder="Search by title or author"
      />
    </SearchInputStyle>
  );
};
