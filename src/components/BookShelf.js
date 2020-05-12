import React from "react";
import '../assets/css/App.css';

const Title = ({ children }) => <h2 className="bookshelf-title">{children}</h2>

class BookShelf extends React.Component {

    static Title = Title;

    render() {
        return (
            <div className="bookshelf">
                {this.props.children}
            </div>
        );
    }
}

export default BookShelf;