import "@testing-library/jest-dom";
import { mockQueryString } from "./__tests__/utils/query-string";
// whatwg-fetch import 제거하고 직접 fetch mock 설정
global.fetch = jest.fn();

// 전역 설정
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
