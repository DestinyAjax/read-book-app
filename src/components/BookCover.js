import React from "react";
import '../assets/css/App.css';

const BookCover = ({ url }) => (
    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${url})` }}></div>
);

export default BookCover