import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { cn } from "~/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    );
  };

  const pageNumbers = getPageNumbers();
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <div
      className={cn("flex items-center justify-center space-x-2", className)}
    >
      {/* 맨 앞으로 가기 버튼 */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className={cn(
          "flex items-center justify-center w-8 h-8 typo-widget-text-small text-widget-text-secondary bg-widget-fill-white border border-widget-border-gray rounded-lg",
          currentPage === 1 && "opacity-50 cursor-not-allowed",
        )}
      >
        <ChevronsLeft size={16} />
      </button>

      {/* 이전 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevPage}
        className={cn(
          "flex items-center justify-center w-8 h-8 typo-widget-text-small text-widget-text-secondary bg-widget-fill-white border border-widget-border-gray rounded-lg",
          !hasPrevPage && "opacity-50 cursor-not-allowed",
        )}
      >
        <ChevronLeft size={16} />
      </button>

      {/* 이전 페이지 생략 표시 */}
      {pageNumbers[0] > 1 && (
        <span className="flex items-center justify-center w-8 h-8 typo-widget-text-small text-widget-text-secondary rounded-lg">
          ...
        </span>
      )}

      {/* 페이지 번호 */}
      {pageNumbers.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={cn(
            "flex items-center justify-center w-8 h-8 typo-widget-text-small text-widget-text-secondary bg-widget-fill-white border border-widget-border-gray rounded-lg",
            pageNum === currentPage
              ? "text-indigo-600 bg-indigo-50 border-indigo-500"
              : "text-gray-500 bg-white border-gray-300 hover:bg-gray-50",
          )}
        >
          {pageNum}
        </button>
      ))}

      {/* 다음 페이지 생략 표시 */}
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <span className="flex items-center justify-center w-8 h-8 typo-widget-text-small text-widget-text-secondary rounded-lg">
          ...
        </span>
      )}

      {/* 다음 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className={cn(
          "flex items-center justify-center w-8 h-8 typo-widget-text-small text-widget-text-secondary bg-widget-fill-white border border-widget-border-gray rounded-lg",
          !hasNextPage && "opacity-50 cursor-not-allowed",
        )}
      >
        <ChevronRight size={16} />
      </button>

      {/* 맨 뒤로 가기 버튼 */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={cn(
          "flex items-center justify-center w-8 h-8 typo-widget-text-small text-widget-text-secondary bg-widget-fill-white border border-widget-border-gray rounded-lg",
          currentPage === totalPages && "opacity-50 cursor-not-allowed",
        )}
      >
        <ChevronsRight size={16} />
      </button>
    </div>
  );
}
