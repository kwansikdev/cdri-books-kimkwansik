import type { Route } from "./+types/home";
import { getImageTransformation } from "~/shared/func";
import { BookItem } from "~/shared/ui/book-item";
import { SearchArea } from "~/domains/home/search-area";
import Services from "~/shared/service";
import { Pagination } from "~/shared/ui/pagination";
import { useSearchParams } from "react-router";
import type { SearchBookRequestType } from "~/shared/service/search/type";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = {
    query: searchParams.get("query") || "",
    sort: searchParams.get("sort") || "latest",
    target: searchParams.get("target"),
    page: parseInt(searchParams.get("page") || "1"),
  } as SearchBookRequestType;

  const { data, isLoading } = Services.Search.hooks.useFetchSearchBook(
    searchQuery,
    {
      queryOptions: {
        enabled: searchQuery.query !== "",
      },
    },
  );

  const emptyResult =
    !isLoading &&
    (data?.data.meta.total_count === 0 || !data?.data.meta.total_count);

  // 페이지네이션 관련 계산
  const currentPage = searchQuery.page || 1;
  const totalCount = data?.data.meta.total_count || 0;
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
      <div className="pt-[104px] pb-[167px] space-y-6">
        <SearchArea />

        <div className="space-y-9">
          <div className="space-x-4">
            <span className="typo-widget-text-caption leading-4">
              도서 검색 결과
            </span>
            <span>
              총{" "}
              <b className="text-widget-fill-primary font-medium">
                {data?.data.meta.total_count ?? 0}
              </b>
              건
            </span>
          </div>

          <ul>
            {emptyResult && (
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
                    검색된 결과가 없습니다.
                  </span>
                </div>
              </li>
            )}

            {!emptyResult &&
              data?.data.documents.map((book) => (
                <li key={book.isbn}>
                  <BookItem book={book} />
                </li>
              ))}
          </ul>

          {!emptyResult && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}
