import { useBookmarkContext } from "../context/bookmark-context";
import type { SearchBookDocumentType } from "../service/search/type";

export function useBookmarks(book?: SearchBookDocumentType) {
  const { bookmarks, isBookmark, toggleBookmark } = useBookmarkContext();

  return {
    bookmarks,
    isBookmark,
    toggleBookmark,
    isFavorite: book ? isBookmark(book.isbn) : false,
  };
}
