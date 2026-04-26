import type { AxiosRequestConfig } from "axios";
import { ApiBase } from "../base-factory";
import type { SearchBookRequestType, SearchBookResponseType } from "./type";

const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;

/** 다음(Daum) 검색 API  */
class v3 extends ApiBase {
  private endpoint: string;

  constructor(baseUrlOverride?: string, defaultConfig?: AxiosRequestConfig) {
    super("https://dapi.kakao.com", "v3", baseUrlOverride, defaultConfig);
    this.endpoint = "search";
  }

  /** 책 검색 */
  async searchBook(params: SearchBookRequestType, config?: AxiosRequestConfig) {
    return this.get<SearchBookResponseType>(`/${this.endpoint}/book`, {
      ...config,
      headers: {
        ...config?.headers,
        Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
      },
      params,
    });
  }
}

const apis = {
  kakaoV3: new v3(),
};

export { apis };
