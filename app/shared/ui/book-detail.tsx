import { Button } from "~/components/ui/button";
import { formatPrice, getImageTransformation, isDiscounted } from "../func";
import { cn } from "~/lib/utils";
import { ChevronUp, Heart } from "lucide-react";
import type { SearchBookDocumentType } from "../service/search/type";

type BookDetailProps = {
  book: SearchBookDocumentType;
  isFavorite: boolean;
  onOpenChange: () => void;
  toggleBookmark: (book: SearchBookDocumentType) => void;
};

export function BookDetail({
  book,
  isFavorite,
  onOpenChange,
  toggleBookmark,
}: BookDetailProps) {
  return (
    <div className="relative w-full pt-6 pb-10 pl-[54px] pr-4">
      <div className="flex gap-8">
        <div className="relative w-[210px] h-[280px] shrink-0 overflow-hidden bg-widget-color-bg-color-page0">
          <img
            src={
              getImageTransformation(book.thumbnail as string, {
                width: 210,
                height: 280,
                quality: 100,
              }) || "/placeholder.svg"
            }
            alt={`책 표지`}
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
          />

          <Heart
            size={24}
            className={cn(
              "absolute top-2 right-2",
              isFavorite
                ? "fill-widget-fill-red text-widget-fill-red"
                : "text-widget-fill-white",
            )}
            onClick={() => toggleBookmark(book)}
          />
        </div>

        <div className="flex-1 flex flex-col">
          <p className="flex items-center mt-5 gap-4">
            <span className="typo-widget-text-title3 text-widget-text-primary line-clamp-2">
              {book.title}
            </span>
            <span className="typo-widget-text-caption-medium text-widget-text-subtitle">
              {book.authors.join(", ")}
            </span>
          </p>

          <div className="flex gap-4 mt-4 flex-1">
            <div className="flex-1 space-y-3.5">
              <p className="typo-widget-text-body2-bold text-widget-text-primary leading-6">
                책 소개
              </p>
              <p className="whitespace-pre-wrap break-keep text-[10px] leading-4 text-widget-text-primary">
                {book.contents}
              </p>
            </div>

            <div className="basis-[240px] shrink-0 flex flex-col justify-end gap-7">
              <div className="flex flex-col items-end gap-2">
                <dl className="flex items-center gap-2">
                  <dt className="basis-10 typo-widget-text-small text-widget-text-subtitle text-end">
                    원가
                  </dt>
                  <dd
                    className={cn(
                      "typo-widget-text-title3 break-keep",
                      isDiscounted(book.price, book.sale_price) &&
                        "line-through font-light",
                    )}
                  >
                    {formatPrice(book.price)}원
                  </dd>
                </dl>
                {isDiscounted(book.price, book.sale_price) && (
                  <dl className="flex items-center gap-2">
                    <dt className="basis-10 typo-widget-text-small text-widget-text-subtitle text-end">
                      할인가
                    </dt>
                    <dd className={cn("typo-widget-text-title3 break-keep")}>
                      {formatPrice(book.sale_price)}원
                    </dd>
                  </dl>
                )}
              </div>

              <Button asChild className="w-full">
                <a href={book.url} target="_blank" rel="noopener noreferrer">
                  구매하기
                </a>
              </Button>
            </div>
          </div>
        </div>

        <Button
          variant={"secondary"}
          className="absolute top-[26px] right-4"
          onClick={onOpenChange}
        >
          상세보기 <ChevronUp />
        </Button>
      </div>
    </div>
  );
}
