import React from "react";
import '../assets/css/App.css';

const BookItem = ({ children }) => <li>{children}</li>;

class BookGrid extends React.Component {

    static Item = BookItem;

    render() {
        return (
            <ol className="books-grid">
                {this.props.children}
            </ol>
        );
    }
}

export default BookGrid;