import type { UseQueryOptions } from "@tanstack/react-query";

/* ------------------------------ QueryOptions ------------------------------ */
export type UseQueryOptionsType<T = any> = {
  queryOptions?: Omit<UseQueryOptions<any, any, T, any>, "queryKey">;
};
