import React from 'react';
import { Link } from 'react-router-dom';
import { AddButtonStyleWrapper } from './AddButton.style';

export const AddButton = () => {
  return (
    <AddButtonStyleWrapper>
      <Link to="/search">
        <button>Add a book</button>
      </Link>
    </AddButtonStyleWrapper>
  );
};
