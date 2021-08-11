import http from '@/utils/http';

export function getProblems(
  keyword: string,
  page = 1,
  pageSize = 15
): Record<string, any> {
  return http.get('/problem', {
    params: {
      keyword,
      page,
      pageSize,
    },
  });
}
