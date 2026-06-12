export interface ApiSuccess<T> {
  data: T;
  meta?: {
    total:   number;
    page:    number;
    perPage: number;
  };
}

export interface ApiError {
  error: {
    code:    string;
    message: string;
  };
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

export function isApiError<T>(res: ApiResponse<T>): res is ApiError {
  return 'error' in res;
}
