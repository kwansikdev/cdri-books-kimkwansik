import type { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";

export abstract class ApiBase {
  protected baseUrl: string;
  protected defaultConfig: AxiosRequestConfig;

  constructor(
    service: string,
    version: string,
    baseUrlOverride?: string,
    defaultConfig?: AxiosRequestConfig,
  ) {
    this.baseUrl = this.getBaseUrl(service, version, baseUrlOverride);
    this.defaultConfig = defaultConfig || {};
  }

  private getBaseUrl(
    service: string,
    version: string,
    baseUrlOverride?: string,
  ): string {
    let _baseUrl = `${service}/${version}`;

    if (baseUrlOverride) {
      return baseUrlOverride;
    }

    return _baseUrl;
  }

  // GET 요청 메서드
  protected get<T>(
    endpoint: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return axios.get(`${this.baseUrl}${endpoint}`, {
      ...this.defaultConfig,
      ...config,
    });
  }
}
