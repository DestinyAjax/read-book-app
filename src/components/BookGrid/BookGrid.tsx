import React from 'react';
import { BookGridStyleWrapper } from './BookGrid.style';

interface BookGridProps {
  children: React.ReactNode;
}

const BookItem = (props: BookGridProps) => <li>{props.children}</li>;

export const BookGrid = (props: BookGridProps) => {
  return <BookGridStyleWrapper>{props.children}</BookGridStyleWrapper>;
};

BookGrid.Item = BookItem;
