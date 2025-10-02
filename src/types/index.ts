/**
 * 공통 API 응답 타입
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

/**
 * 페이지네이션 응답 타입
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/**
 * 에러 응답 타입
 */
export interface ErrorResponse {
  success: false;
  message: string;
  error?: string;
  statusCode: number;
}

/**
 * 예제 데이터 타입
 */
export interface ExampleData {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}
