import { ChevronDown, Search, X } from "lucide-react";
import { Select } from "radix-ui";
import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import { cn } from "~/lib/utils";

import { useSearchParams } from "react-router";
import { getItem, setItem } from "~/lib/local-storage-utils";

const SEARCH_HISTORY_KEY = "search_history";

const getSearchHistory = (): string[] => {
  if (typeof window === "undefined") return [];
  const history = getItem<string[]>(SEARCH_HISTORY_KEY);

  return history ?? [];
};

export function SearchArea() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [target, setTarget] = useState(searchParams.get("target") || "title");
  const [detailQuery, setDetailQuery] = useState(query);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const saveSearchHistory = (query: string) => {
    if (typeof window === "undefined" || !query.trim()) return;

    const history = getSearchHistory();
    const filteredHistory = history.filter((item) => item !== query);
    const newHistory = [query, ...filteredHistory].slice(0, 8);
    setItem(SEARCH_HISTORY_KEY, newHistory);
    setSearchHistory(newHistory);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isComposing, setIsComposing] = useState(false);

  const handleSearch = (newParams: any) => {
    if (isSearching) return; // 중복 검색 방지

    setIsSearching(true);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value.toString());
      } else {
        searchParams.delete(key);
      }
    });

    setSearchParams(searchParams);

    // 검색어가 있으면 기록에 저장 및 상태 동기화
    if (newParams.query) {
      saveSearchHistory(newParams.query);
      setQuery(newParams.query);
      setDetailQuery(newParams.query);
    }

    inputRef.current?.blur();
    setIsPopoverOpen(false); // 상세 검색 팝업 닫기

    // 잠시 후 검색 상태 리셋
    setTimeout(() => setIsSearching(false), 100);
  };

  const onKeywordClick = (keyword: string) => {
    setQuery(keyword);
    handleSearch({ query: keyword });
  };

  const deleteKeyword = (keyword: string) => {
    const newHistory = searchHistory.filter((item) => item !== keyword);
    setItem(SEARCH_HISTORY_KEY, newHistory);
    setSearchHistory(newHistory);
  };

  useEffect(() => {
    setSearchHistory(getSearchHistory());
  }, []);

  useEffect(() => {
    if (!searchParams.get("query")) {
      setQuery("");
    }
  }, [searchParams]);

  useEffect(() => {
    setDetailQuery(query);
  }, [query]);

  return (
    <div className="space-y-4">
      <h2 className="typo-widget-text-title2 text-widget-text-title h-9">
        도서 검색
      </h2>

      <div className="flex items-center gap-4">
        <div
          className={cn(
            "group relative bg-widget-fill-secondary-light2 max-w-[480px] w-full rounded-3xl pl-3.5 pr-2.5 py-2.5",
            searchHistory.length !== 0 && "focus-within:rounded-b-none",
          )}
        >
          <div className="flex items-center gap-3">
            <Search size={25} className="text-widget-text-primary" />
            <Input
              ref={inputRef}
              className={cn("focus-visible:border-transparent pl-0")}
              placeholder="검색어를 입력하세요"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // 기본 동작 방지

                  // 한글 입력 중(composing)이면 잠시 기다렸다가 처리
                  if (isComposing) {
                    setTimeout(() => {
                      const currentQuery = query.trim();
                      if (currentQuery) {
                        handleSearch({ query: currentQuery, target });
                      }
                    }, 10);
                    return;
                  }

                  const currentQuery = query.trim();
                  if (currentQuery) {
                    handleSearch({ query: currentQuery, target });
                  }
                }
              }}
            />
          </div>

          {/* 검색 기록 저장 */}
          {searchHistory.length !== 0 && (
            <ol
              className={cn(
                "px-6 py-6 space-y-4",
                "hidden group-focus-within:block",
                "absolute z-50 top-full left-0 right-0 bg-widget-fill-secondary-light2 rounded-b-3xl",
              )}
            >
              {searchHistory.map((keyword, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between pl-[27px] "
                >
                  <span
                    className="typo-widget-text-caption text-widget-text-secondary cursor-pointer hover:text-widget-fill-primaryƒ"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => onKeywordClick(keyword)}
                  >
                    {keyword}
                  </span>
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => deleteKeyword(keyword)}
                  >
                    <X size={24} className="text-widget-fill-black  " />
                  </button>
                </li>
              ))}
            </ol>
          )}
        </div>

        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button variant={"outline"} size="sm" className="p-2.5">
              상세검색
            </Button>
          </PopoverTrigger>

          <PopoverContent
            sideOffset={15}
            className="bg-widget-fill-white w-[360px] py-9 px-6 rounded-lg shadow-[0px_4px_14px_6px_#97979726] gap-4"
          >
            <div className="flex items-end gap-1">
              <Select.Root
                defaultValue="title"
                value={target}
                onValueChange={setTarget}
              >
                <Select.Trigger
                  className={
                    "flex items-center justify-between w-[100px] h-9 pl-2 pr-1 border-b border-widget-border-gray cursor-pointer"
                  }
                >
                  <Select.Value className="typo-widget-text-body2-bold leading-[100%] text-widget-text-primary" />
                  <ChevronDown size={20} className="text-widget-icon-gray" />
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content
                    className={cn(
                      "w-(--radix-select-trigger-width) overflow-hidden z-100 bg-widget-fill-white shadow-[0px_0px_4px_0px_#00000040]",
                    )}
                    position="popper"
                    sideOffset={4}
                  >
                    <Select.Viewport>
                      {[
                        { value: "title", label: "제목" },
                        { value: "person", label: "저자명" },
                        { value: "publisher", label: "출판사" },
                      ].map((opt) => (
                        <Select.Item
                          key={opt.value}
                          value={opt.value}
                          className={cn(
                            "flex items-center justify-between py-1 px-2 typo-widget-text-caption-medium text-widget-text-subtitle cursor-pointer",
                            "data-highlighted:bg-widget-background-hover data-state-checked:font-medium data-state-checked:text-widget-text-primary",
                          )}
                        >
                          <Select.ItemText>{opt.label}</Select.ItemText>
                          <Select.ItemIndicator
                            className={
                              "typo-widget-text-small text-widget-text-subtitle"
                            }
                          >
                            ✓
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
              <div className="pb-px border-b border-widget-border-gray focus-within:border-widget-fill-primary typo-widget-text-caption-medium text-widget-text-primary placeholder:text-widget-text-subtitle">
                <Input
                  value={detailQuery}
                  onChange={(e) => setDetailQuery(e.target.value)}
                  placeholder="검색어 입력"
                  className={cn("rounded-none border-none")}
                />
              </div>
            </div>

            <Button
              className="w-full"
              onClick={() => {
                if (!detailQuery.trim()) {
                  return;
                }

                handleSearch({
                  query: detailQuery || query,
                  target,
                });
              }}
            >
              검색하기
            </Button>
            <PopoverClose className="text-widget-icon-gray">
              <X size={20} />
            </PopoverClose>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
