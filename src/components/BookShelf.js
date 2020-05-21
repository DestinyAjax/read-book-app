import React from "react";
import BookGrid from "./BookGrid";
import SelectDropDown from "./SelectDropDown";
import BookCover from "./BookCover";
import '../assets/css/App.css';

class BookShelf extends React.Component {
    render() {
        const { books, type, title, onChangeBook } = this.props; 
        const filteredBooks = books.filter((b) => b.shelf === type);

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <BookGrid>
                        {filteredBooks.map(book => (
                            <BookGrid.Item key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <BookCover url={book.imageLinks.thumbnail} />
                                        <SelectDropDown book={book} moveBook={(e) => onChangeBook(e, book)} />
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">
                                        {book.authors.map((author,index) => <span key={index}>{author}</span>)}
                                    </div>
                                </div>
                            </BookGrid.Item>
                        ))}
                    </BookGrid>
                </div>
            </div>
        );
    }
}

export default BookShelf;