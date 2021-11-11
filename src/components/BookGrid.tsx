import React from 'react';
import '../assets/css/App.css';

interface BookGridProps {
  children: React.ReactNode;
}

const BookItem = (props: BookGridProps) => <li>{props.children}</li>;

const BookGrid = (props: BookGridProps) => {
  return <ol className="books-grid">{props.children}</ol>;
};

BookGrid.Item = BookItem;

export default BookGrid;
