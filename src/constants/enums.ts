export enum BookStatusEnum {
   WANT_TO_READ = 'wantToRead',
   CURRENTLY_READING = 'currentlyReading',
   READ = 'read',
   NONE = 'none',
}

export const BookStatuses = Object.values(BookStatusEnum);
