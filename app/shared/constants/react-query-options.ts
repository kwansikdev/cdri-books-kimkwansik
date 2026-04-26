import type { DefaultOptions } from "@tanstack/react-query";

export const defaultOptions: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
  },
  mutations: {},
};
