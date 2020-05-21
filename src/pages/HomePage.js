import React from 'react';
import { Link } from "react-router-dom";
import BookShelf from "../components/BookShelf";
import { getAll, update} from "../api/BookAPI";
import '../assets/css/App.css';

class HomePage extends React.Component {

    state = {
      books: []
    }

    async componentDidMount() {
        const books = await getAll();
        this.setState(() => ({ books }));
    }

    removeBook = (book, shelf) => {
        const { books } = this.state;
        const new_books = books.filter(current => current.id !== book.id);
        this.setState(() => ({
            books: new_books.concat(Object.assign(book, {shelf: shelf}))
        }));
    }

    changeCategory = async (e, book) => {
        const payload = {id: book.id};
        const shelf = e.target.value;
        this.removeBook(book, shelf);
        await update(payload, shelf);
    }
  
    render() {

        return (
            <div className="app">
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyRead Books App</h1>
                    </div>
                    <div className="list-books-content">
                        <BookShelf 
                            books={this.state.books} 
                            type="currentlyReading" 
                            onChangeBook={(e, book) => this.changeCategory(e, book)} 
                            title="Currently Reading"
                        />
                        <BookShelf 
                            books={this.state.books} 
                            type="wantToRead" 
                            title="Want To Read"
                            onChangeBook={(e, book) => this.changeCategory(e, book)}
                        />
                        <BookShelf 
                            books={this.state.books} 
                            type="read" 
                            title="Read"
                            onChangeBook={(e, book) => this.changeCategory(e, book)}
                        />
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
