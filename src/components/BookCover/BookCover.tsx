import React from 'react';
import { BookCoverStyleWrapper } from './BookCover.style';

interface BookCoverProps {
  url: string;
}

export const BookCover = (props: BookCoverProps) => (
  <BookCoverStyleWrapper backgroundUrl={props.url} />
);
