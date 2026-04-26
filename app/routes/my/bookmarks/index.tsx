import { useSearchParams } from "react-router";
import { getImageTransformation } from "~/shared/func";
import { useBookmarks } from "~/shared/hooks/use-bookmarks";
import { BookItem } from "~/shared/ui/book-item";
import { Pagination } from "~/shared/ui/pagination";

export default function Bookmarks() {
  const { bookmarks } = useBookmarks();
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = {
    page: searchParams.get("page") ?? 1,
  };
  // 페이지네이션 관련 계산
  const currentPage = parseInt(searchParams.get("page") || "1");
  const totalCount = bookmarks.length;
  const itemsPerPage = 10; // 카카오 API 기본 페이지 크기
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // 페이지 이동 핸들러
  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    setSearchParams(newParams);
  };

  return (
    <div className="max-w-[960px] w-full mx-auto">
      <div className="pt-20 pb-[167px] space-y-6">
        <h2 className="typo-widget-text-title2 text-widget-text-primary">
          내가 찜한 책
        </h2>

        <div className="space-x-4">
          <span className="typo-widget-text-caption leading-4">찜한 책</span>
          <span>
            총{" "}
            <b className="text-widget-fill-primary font-medium">
              {bookmarks.length ?? 0}
            </b>
            건
          </span>
        </div>

        <ul>
          {bookmarks.length === 0 && (
            <li>
              <div className="flex flex-col items-center mt-[120px] gap-6 mx-auto">
                <div className="relative size-20 shrink-0 overflow-hidden bg-widget-color-bg-color-page0 rounded-2xl">
                  <img
                    src={
                      getImageTransformation("/icon_book.png" as string, {
                        width: 80,
                        height: 80,
                        quality: 80,
                      }) || "/placeholder.svg"
                    }
                    alt={"empty-image"}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
                  />
                </div>
                <span className="typo-widget-text-caption text-widget-text-secondary">
                  찜한 책이 없습니다.
                </span>
              </div>
            </li>
          )}

          {bookmarks.map((book) => (
            <BookItem key={book.isbn} book={book} />
          ))}
        </ul>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
