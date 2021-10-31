import http from '@/utils/http';

export function createSubmission(
  problem: string,
  volume: string
): Record<string, any> {
  return http.post('/submission', {
    ProblemId: problem,
    volume,
  });
}

export function getSubmissions(page = 1, pageSize = 15): Record<string, any> {
  return http.get('/submission', {
    params: {
      page,
      pageSize,
    },
  });
}

export function getSubmission(name: string): Record<string, any> {
  return http.get(`/submission/${name}`);
}
