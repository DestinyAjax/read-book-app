import React from "react";
import PropTypes from "prop-types";
import '../assets/css/App.css';

const BookItem = ({ children }) => <li>{children}</li>;

class BookGrid extends React.Component {

    static propTypes = {
        show: PropTypes.bool.isRequired
    }

    static defaultProps = {
        show: false
    };

    static Item = BookItem;

    // state = { name: 'submenu' };

    render() {
        return (
            <ol className="books-grid">
                {this.props.children}
            </ol>
        )
    }
}

export default BookGrid;