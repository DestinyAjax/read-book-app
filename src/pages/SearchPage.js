import React from "react";
import { Link, withRouter } from "react-router-dom";
import BookGrid from "../components/BookGrid";
import SelectDropDown from "../components/SelectDropDown";
import BookCover from "../components/BookCover";
import { search, update } from "../api/BookAPI";
import '../assets/css/App.css';

class SearchPage extends React.Component {

    state = {
        books: [],
        query: ""
    }

    searchBooks = async () => {
        const { query } = this.state;
        if (query) {
            const books = await search(query.trim());
            if (!books.error) {
                this.setState(() => ({
                    books: books
                }));
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
        this.searchBooks();
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
                        {filteredBooks.map(book => (
                            <BookGrid.Item key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <BookCover url={book.imageLinks.thumbnail} />
                                        <SelectDropDown mark="currentlyReading" moveBook={(e) => {this.changeCategory(e, book)}}/>
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