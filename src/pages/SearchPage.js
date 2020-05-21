import React from "react";
import { Link, withRouter } from "react-router-dom";
import BookGrid from "../components/BookGrid";
import SelectDropDown from "../components/SelectDropDown";
import BookCover from "../components/BookCover";
import { search, update, getAll } from "../api/BookAPI";
import '../assets/css/App.css';

class SearchPage extends React.Component {

    state = {
        books: [],
        query: ""
    }

    searchBooks = async query => {
        const homepage_books = await getAll();
        const homepage_book_ids = homepage_books.map(book => book.id);
        
        if (query) {
            const search_payload = await search(query.trim());
            if (!search_payload.error) {
                const new_books = search_payload.filter(book => {
                    if (homepage_book_ids.includes(book.id)) {
                        const new_books = homepage_books.filter(value => value.id === book.id);
                        for (const new_book of new_books) {
                            return Object.assign(book, {shelf: new_book.shelf});
                        }
                    }
                    else {
                        return Object.assign(book, {shelf: "None"});
                    }
                });

                this.setState(() => ({books: new_books}));
            }
            return;
        }

        this.setState(() => ({
            books: []
        }));
    }

    handleInputChange = (e) => {
        const value = e.target.value;
        this.setState(() => ({ query: value }));
        this.searchBooks(value);
    }

    changeCategory = async (e, book) => {
        const payload = {id: book.id};
        const shelf = e.target.value;
        await update(payload, shelf);
        this.props.history.push("/");
    }

    render() {
        const { query, books } = this.state;
        const filteredBooks = books.filter((b) => 
            b.title.toLowerCase().includes(query.toLowerCase())
        );

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/">
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" value={query} onChange={this.handleInputChange} placeholder="Search by title or author"/>
                    </div>
                </div>
                <div className="search-books-results">
                    <BookGrid>
                        {filteredBooks.length > 0 && filteredBooks.map(book => (
                            <BookGrid.Item key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        {book.imageLinks && (
                                            <BookCover url={book.imageLinks.thumbnail ? book.imageLinks.thumbnail : ""} />
                                        )}
                                        <SelectDropDown book={book} moveBook={(e) => {this.changeCategory(e, book)}}/>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">
                                        {book.authors && book.authors.map((author,index) => <span key={index}>{author}</span>)}
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

export default withRouter(SearchPage);