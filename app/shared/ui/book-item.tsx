import { ChevronDown, Heart } from "lucide-react";
import { formatPrice, getImageTransformation, getSalePrice } from "../func";
import { Button } from "~/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { BookDetail } from "./book-detail";
import { useState } from "react";
import type { SearchBookDocumentType } from "../service/search/type";

import { useBookmarks } from "../hooks/use-bookmarks";

type BookItemProps = {
  book: SearchBookDocumentType;
};

export function BookItem({ book }: BookItemProps) {
  const [open, setOpen] = useState(false);
  const toggleOpen = (newOpen: boolean) => () => setOpen(newOpen);

  const { toggleBookmark, isFavorite } = useBookmarks(book);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="flex items-center h-[100px] pl-12 pr-4 border-b border-widget-border-gray">
        <div className="relative">
          <div className="relative w-12 h-[68px] shrink-0 overflow-hidden bg-widget-color-bg-color-page0">
            <img
              src={
                getImageTransformation(book.thumbnail as string, {
                  width: 96,
                  height: 96,
                  quality: 80,
                }) || "/placeholder.svg"
              }
              alt={`${book.title} 책 표지`}
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
            />
          </div>

          <button
            className="absolute top-0 right-0"
            onClick={() => toggleBookmark(book)}
          >
            <Heart
              size={16}
              className={
                isFavorite
                  ? "fill-widget-fill-red text-widget-fill-red"
                  : "text-widget-fill-white"
              }
            />
          </button>
        </div>

        <div className="flex items-center gap-4 flex-1 ml-12 min-w-0">
          <span className="typo-widget-text-title3 text-widget-text-primary line-clamp-1">
            {book.title}
          </span>
          <span className="typo-widget-text-body2 text-widget-text-secondary break-keep">
            {book.authors.join(", ")}
          </span>
        </div>

        <div className="flex items-center ml-[22px]">
          <span>
            {formatPrice(getSalePrice(book.price, book.sale_price))}원
          </span>
        </div>

        <div className="flex items-center gap-2 ml-14">
          <Button asChild>
            <a href={book.url} target="_blank" rel="noopener noreferrer">
              구매하기
            </a>
          </Button>
          <CollapsibleTrigger asChild>
            <Button variant="secondary">
              상세보기 <ChevronDown />
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>

      <CollapsibleContent>
        <BookDetail
          book={book}
          onOpenChange={toggleOpen(false)}
          isFavorite={isFavorite}
          toggleBookmark={toggleBookmark}
        />
      </CollapsibleContent>
    </Collapsible>
  );
}
