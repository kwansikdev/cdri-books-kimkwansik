import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { getItem, setItem } from "../../lib/local-storage-utils";
import type { SearchBookDocumentType } from "../service/search/type";

const BOOKMARK_KEY = "bookmarks";

interface BookmarkContextType {
  bookmarks: SearchBookDocumentType[];
  isBookmark: (isbn: string) => boolean;
  toggleBookmark: (book: SearchBookDocumentType) => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined,
);

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<SearchBookDocumentType[]>([]);

  const getBookmarks = (): SearchBookDocumentType[] => {
    return getItem<SearchBookDocumentType[]>(BOOKMARK_KEY) || [];
  };

  const addToBookmarks = (book: SearchBookDocumentType): void => {
    const currentBookmarks = getBookmarks();
    if (!currentBookmarks.find((fav) => fav.isbn === book.isbn)) {
      const newCurrentBookmarks = [book, ...currentBookmarks];
      setItem(BOOKMARK_KEY, newCurrentBookmarks);
      setBookmarks([...newCurrentBookmarks]);
    }
  };

  const removeFromBookmarks = (isbn: string): void => {
    const currentBookmarks = getBookmarks();
    const filtered = currentBookmarks.filter((book) => book.isbn !== isbn);
    setItem(BOOKMARK_KEY, filtered);
    setBookmarks(filtered);
  };

  const isBookmark = (isbn: string): boolean => {
    return bookmarks.some((book) => book.isbn === isbn);
  };

  const toggleBookmark = (book: SearchBookDocumentType) => {
    if (isBookmark(book.isbn)) {
      removeFromBookmarks(book.isbn);
    } else {
      addToBookmarks(book);
    }
  };

  useEffect(() => {
    setBookmarks(getBookmarks());
  }, []);

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        isBookmark,
        toggleBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarkContext() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error(
      "useBookmarkContext must be used within a BookmarkProvider",
    );
  }
  return context;
}
