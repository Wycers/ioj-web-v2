import http from '@/utils/http';

export function getPrograms(): Record<string, any> {
  return http.get('/program');
}
