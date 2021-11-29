import React from 'react';
import startCase from 'lodash/startCase';
import { BookStatusEnum, BookStatuses } from '../../constants';
import { IBook } from '../../models';
import { SelectDropDownStyleWrapper } from './SelectDropDown.style';

interface SelectDropDownProps {
   book: IBook;
   onMoveBook: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectDropDown = (props: SelectDropDownProps) => {
   const { book, onMoveBook } = props;

   const defaultValue = React.useMemo(() => {
      let value;
      switch (book.shelf) {
         case BookStatusEnum.CURRENTLY_READING:
            value = BookStatusEnum.CURRENTLY_READING;
            break;
         case BookStatusEnum.WANT_TO_READ:
            value = BookStatusEnum.WANT_TO_READ;
            break;
         case BookStatusEnum.READ:
            value = BookStatusEnum.READ;
            break;
         default:
            value = BookStatusEnum.NONE;
            break;
      }
      return value;
   }, [book.shelf]);

   return (
      <SelectDropDownStyleWrapper>
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
      </SelectDropDownStyleWrapper>
   );
};
