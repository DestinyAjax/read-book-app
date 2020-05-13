import React from 'react';
import { Link } from "react-router-dom";
import BookGrid from "../components/BookGrid";
import SelectDropDown from "../components/SelectDropDown";
import BookShelf from "../components/BookShelf";
import BookCover from "../components/BookCover";
import { getAll, update} from "../api/BookAPI";
import '../assets/css/App.css';

class HomePage extends React.Component {

    state = {
      wantToRead: [],
      currentlyReading: [],
      read: []
    }

    async componentDidMount() {
        const books = await getAll();
        this.filterBooks(books);
    }

    filterBooks = books => {
        const wantToRead = books.filter(book => book.shelf === "wantToRead");
        const currentlyReading = books.filter(book => book.shelf === "currentlyReading");
        const read = books.filter(book => book.shelf === "read");
        this.setState(() => ({
            wantToRead,
            currentlyReading,
            read
        }));
    }

    addNewBook = (book, type) => {
        switch (type) {
            case "read":
                this.setState((prevState) => ({
                    read: prevState.read.concat(book)
                }));
                break;
            case "currentlyReading":
                this.setState((prevState) => ({
                    currentlyReading: prevState.currentlyReading.concat(book)
                }));
                break;
            case "wantToRead":
                this.setState((prevState) => ({
                    wantToRead: prevState.wantToRead.concat(book)
                }));
                break;
            default:
                break;
        }
    }

    removeBook = (book, type, value) => {
        const { read, currentlyReading, wantToRead } = this.state;

        switch (value) {
            case "read":
                const read_books = read.filter(current => current.id !== book.id);
                this.setState(() => ({
                    read: read_books
                }));
                break;
            case "currentlyReading":
                const currentlyReading_books = currentlyReading.filter(current => current.id !== book.id);
                this.setState(() => ({
                    currentlyReading: currentlyReading_books
                }));
                break;
            case "wantToRead":
                const wantToRead_books = wantToRead.filter(current => current.id !== book.id);
                this.setState(() => ({
                    wantToRead: wantToRead_books
                }));
                break;
            default:
                break;
        }
    }

    changeCategory = async (e, book, value) => {
        const payload = {id: book.id};
        const shelf = e.target.value;
        this.removeBook(book, shelf, value);
        this.addNewBook(book, shelf, value);
        await update(payload, shelf);
    }
  
    render() {
        const { wantToRead, currentlyReading, read } = this.state;

        return (
            <div className="app">
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyRead Books App</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            <BookShelf>
                                <BookShelf.Title>Currently Reading</BookShelf.Title>
                                <div className="bookshelf-books">
                                    <BookGrid>
                                        {currentlyReading.map(book => (
                                            <BookGrid.Item key={book.id}>
                                                <div className="book">
                                                    <div className="book-top">
                                                        <BookCover url={book.imageLinks.thumbnail} />
                                                        <SelectDropDown mark="currentlyReading" moveBook={(e) => {this.changeCategory(e, book, "currentlyReading")}}/>
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
                            </BookShelf>
                            <BookShelf>
                                <BookShelf.Title>Want To Read</BookShelf.Title>
                                <div className="bookshelf-books">
                                    <BookGrid>
                                        {wantToRead.map(book => (
                                            <BookGrid.Item key={book.id}>
                                                <div className="book">
                                                    <div className="book-top">
                                                        <BookCover url={book.imageLinks.thumbnail} />
                                                        <SelectDropDown mark="wantToRead" moveBook={(e) => {this.changeCategory(e, book, "wantToRead")}}/>
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
                            </BookShelf>
                            <BookShelf>
                                <BookShelf.Title>Read</BookShelf.Title>
                                <div className="bookshelf-books">
                                    <BookGrid>
                                        {read.map(book => (
                                            <BookGrid.Item key={book.id}>
                                                <div className="book">
                                                    <div className="book-top">
                                                        <BookCover url={book.imageLinks.thumbnail} />
                                                        <SelectDropDown mark="read" moveBook={(e) => {this.changeCategory(e, book, "read")}}/>
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
                            </BookShelf>
                        </div>
                    </div>
                    <div className="open-search">
                        <Link to="/search">
                            <button>Add a book</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;
