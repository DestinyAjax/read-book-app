export interface IBook {
   id: string;
   title: string;
   imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
   };
   authors: string[];
   averageRating: number;
   categories: string[];
   infoLink: string;
   language: string;
   pageCount: number;
   publishedDate: string;
   publisher: string;
   ratingsCount: number;
   shelf: string;
   subtitle: string;
}
