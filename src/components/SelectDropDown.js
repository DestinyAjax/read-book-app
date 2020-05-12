import React from "react";
import PropTypes from "prop-types";
import '../assets/css/App.css';

class SelectDropDown extends React.Component {

    render() {
        const { mark } = this.props;

        let defaultValue = "wantToRead";
        if (mark === "currentlyReading") {
            defaultValue = "currentlyReading"
        }
        else if (mark === "read") {
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
    mark: PropTypes.string.isRequired,
    moveBook: PropTypes.func.isRequired
};

export default SelectDropDown;