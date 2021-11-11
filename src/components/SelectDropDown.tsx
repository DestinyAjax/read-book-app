import React from 'react';
import startCase from 'lodash/startCase';
import { BookStatusEnum, BookStatuses } from '../constants';
import { IBook } from '../models';
import '../assets/css/App.css';

interface SelectDropDownProps {
   book: IBook;
   onMoveBook: () => void;
}

export const SelectDropDown = (props: SelectDropDownProps) => {
   const { book, onMoveBook } = props;

   const defaultValue = React.useMemo(() => {
      let value;
      switch (book.shelf) {
         case BookStatusEnum.CURRENTLY_READING:
            value = BookStatusEnum.CURRENTLY_READING;
            break;
         case 'None':
            value = BookStatusEnum.NONE;
         case BookStatusEnum.READ:
            value = BookStatusEnum.READ;
         default:
            value = BookStatusEnum.WANT_TO_READ;
            break;
      }
      return value;
   }, [book.shelf]);

   return (
      <div className="book-shelf-changer">
         <select defaultValue={defaultValue} onChange={onMoveBook}>
            <option value="move" disabled>
               Move to...
            </option>
            {BookStatuses.map((status) => (
               <option value={status} key={status}>
                  {startCase(status)}
               </option>
            ))}
         </select>
      </div>
   );
};

export default SelectDropDown;
