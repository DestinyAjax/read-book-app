import React from 'react';
import '../assets/css/App.css';

interface BookCoverProps {
  url: String;
}

const BookCover = (props: BookCoverProps) => (
  <div
    className="book-cover"
    style={{ width: 128, height: 193, backgroundImage: `url(${props.url})` }}
  ></div>
);

export default BookCover;
