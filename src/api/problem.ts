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

export function getProblem(name: string): Record<string, any> {
  return http.get(`/problem/${name}`);
}

export function getPage(name: string, locale = '*'): Record<string, any> {
  return http.get(`/problem/${name}/page`, {
    params: {
      locale,
    },
  });
}
