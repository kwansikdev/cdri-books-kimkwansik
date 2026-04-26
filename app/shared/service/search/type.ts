type MetaType = {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
};

/* ------------------------------- search book ------------------------------ */
export type SearchBookRequestType = {
  query?: string;
  sort?: "accuracy" | "latest";
  page?: number;
  size?: number;
  target?: "title" | "isbn" | "publisher" | "person";
};

export type SearchBookResponseType = {
  meta: MetaType;
  documents: SearchBookDocumentType[];
};

export type SearchBookDocumentType = {
  title: string;
  contents: string;
  url: string;
  isbn: string;
  datetime: string;
  authors: string[];
  publisher: string;
  translators: string[];
  price: number;
  sale_price: number;
  thumbnail: string;
  status: string;
};
