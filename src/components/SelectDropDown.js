import React from "react";
import PropTypes from "prop-types";
import '../assets/css/App.css';

class SelectDropDown extends React.Component {

    render() {
        const { book } = this.props;

        let defaultValue = "wantToRead";
        if (book.shelf === "currentlyReading") {
            defaultValue = "currentlyReading"
        }
        else if(book.shelf === "None") {
            defaultValue = "none";
        }
        else if (book.shelf === "read") {
            defaultValue = "read";
        }

        return (
            <div className="book-shelf-changer">
                <select defaultValue={defaultValue} onChange={this.props.moveBook}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading" >Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        );
    }
}

SelectDropDown.propTypes = {
    book: PropTypes.object.isRequired,
    moveBook: PropTypes.func.isRequired
};

export default SelectDropDown;