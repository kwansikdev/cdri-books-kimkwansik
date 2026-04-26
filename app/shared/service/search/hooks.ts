import { useQuery } from "@tanstack/react-query";
import type { SearchBookRequestType, SearchBookResponseType } from "./type";
import query from "./query";
import { apis } from "./apis";
import type { UseQueryOptionsType } from "../types";
import type { AxiosError, AxiosResponse } from "axios";

function useFetchSearchBook(
  params: SearchBookRequestType,
  { queryOptions }: UseQueryOptionsType = {},
) {
  return useQuery<AxiosResponse<SearchBookResponseType>, AxiosError>({
    queryKey: query.search.book(params).queryKey,
    queryFn: async () => {
      return await apis.kakaoV3.searchBook(params);
    },
    ...queryOptions,
  });
}

const hooks = {
  useFetchSearchBook,
};

export default hooks;
